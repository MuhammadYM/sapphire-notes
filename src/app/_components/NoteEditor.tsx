"use client";

import { useState } from "react";

import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";

export const NoteEditor = ({
  onSave,
}: {
  onSave: (note: { title: string; content: string }) => void;
}) => {
  const [code, setCode] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Note title"
        className="w-full bg-base-200 text-xl font-semibold placeholder:text-base-content/40 focus:outline-none px-4 py-3 rounded-lg transition-colors"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <div className="bg-base-200 rounded-lg overflow-hidden p-4">
        <CodeMirror
          value={code}
          width="100%"
          height="40vh"
          minWidth="100%"
          minHeight="40vh"
          extensions={[
            markdown({ base: markdownLanguage, codeLanguages: languages }),
          ]}
          onChange={(value) => setCode(value)}
          className="rounded overflow-hidden"
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => {
            onSave({
              title,
              content: code,
            });
            setCode("");
            setTitle("");
          }}
          className="px-4 py-2 bg-base-content text-base-100 rounded hover:opacity-80 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed text-sm font-medium"
          disabled={title.trim().length === 0 || code.trim().length === 0}
        >
          Save Note
        </button>
      </div>
    </div>
  );
};

export default NoteEditor;
