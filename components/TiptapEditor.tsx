"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List, ListOrdered, Download } from "lucide-react";
import { useEffect } from "react";
import { useAppStore } from "@/store/use-app-store";
import { Button } from "@/components/ui/button";

export default function TiptapEditor({ content }: { content: string }) {
  const { editorContent, setEditorContent, filename } = useAppStore();

  const editor = useEditor({
    extensions: [StarterKit],
    content: editorContent || "",
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML());
    },
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4 border rounded-md",
      },
    },
  });

  useEffect(() => {
    if (editor && typeof content === "string") {
      const match = content.match(/^<summary>([\s\S]*)<\/summary>$/);
      editor.commands.setContent(match?.[1] || "");
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  const handleExport = async (format: "docx" | "md" | "txt") => {
    const response = await fetch("/api/export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: editor.getHTML(), // Or getText() for txt, but API handles conversion (mocked)
        format,
        filename: filename || "summary",
      }),
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename || "summary"}.${format}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  };

  return (
    <div className="border rounded-lg shadow-sm bg-white">
      <div className="flex items-center gap-2 p-2 border-b bg-gray-50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-gray-200" : ""}
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-gray-200" : ""}
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "bg-gray-200" : ""}
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "bg-gray-200" : ""}
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
        <div className="ml-auto flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport("docx")}
          >
            <Download className="w-4 h-4 mr-1" /> DOCX
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport("md")}
          >
            <Download className="w-4 h-4 mr-1" /> MD
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport("txt")}
          >
            <Download className="w-4 h-4 mr-1" /> TXT
          </Button>
        </div>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
