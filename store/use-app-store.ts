import { create } from "zustand";

interface AppState {
  chunks: string[];
  content: string;
  editorContent: string;
  uploadProgress: number;
  isUploading: boolean;
  isSummarizing: boolean;
  filename: string | null;
  fileType: "pdf" | "docx" | null;
  setChunks: (chunks: string[]) => void;
  setContent: (content: string) => void;
  setEditorContent: (content: string) => void;
  setUploadProgress: (progress: number) => void;
  setIsUploading: (isUploading: boolean) => void;
  setIsSummarizing: (isSummarizing: boolean) => void;
  setFileMetadata: (filename: string, fileType: "pdf" | "docx") => void;
  reset: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  chunks: [],
  content: "",
  editorContent: "",
  uploadProgress: 0,
  isUploading: false,
  isSummarizing: false,
  filename: null,
  fileType: null,
  setChunks: (chunks) => set({ chunks }),
  setContent: (summary) => set({ content: summary }),
  setEditorContent: (content) => set({ editorContent: content }),
  setUploadProgress: (progress) => set({ uploadProgress: progress }),
  setIsUploading: (isUploading) => set({ isUploading }),
  setIsSummarizing: (isSummarizing) => set({ isSummarizing }),
  setFileMetadata: (filename, fileType) => set({ filename, fileType }),
  reset: () =>
    set({
      chunks: [],
      content: "",  
      editorContent: "",
      uploadProgress: 0,
      isUploading: false,
      isSummarizing: false,
      filename: null,
      fileType: null,
    }),
}));
