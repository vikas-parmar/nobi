'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, File as FileIcon, X } from 'lucide-react';
import { useAppStore } from '@/store/use-app-store';

export default function Dropzone() {
  const { setFileMetadata, setUploadProgress, setIsUploading, setChunks } = useAppStore();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(10);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setChunks(data.chunks);
      setFileMetadata(data.filename, data.fileType);
      setUploadProgress(100);
    } catch (error) {
      console.error(error);
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  }, [setFileMetadata, setUploadProgress, setIsUploading, setChunks]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
  });

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'
        }`}
      >
        <input {...getInputProps()} />
        <UploadCloud className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        {acceptedFiles.length > 0 ? (
          <div className="flex items-center justify-center gap-2">
            <FileIcon className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">{acceptedFiles[0].name}</span>
          </div>
        ) : (
          <div>
            <p className="text-lg font-medium text-gray-700">
              Drag & drop your file here, or click to select
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Supports PDF and DOCX (max 10MB)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
