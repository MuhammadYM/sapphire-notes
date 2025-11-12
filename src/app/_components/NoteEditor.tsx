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
    <div className="card bg-base-100 shadow-lg border border-base-300">
      <div className="card-body p-6">
        <h2 className="card-title mb-4">
          <input
            type="text"
            placeholder="Note title"
            className="input input-bordered input-lg w-full font-bold"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </h2>
        <div className="mb-4">
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
            className="border border-base-300 rounded-lg overflow-hidden"
          />
        </div>
        <div className="card-actions justify-end pt-4 border-t border-base-300">
          <button
            onClick={() => {
              onSave({
                title,
                content: code,
              });
              setCode("");
              setTitle("");
            }}
            className="btn btn-primary"
            disabled={title.trim().length === 0 || code.trim().length === 0}
          >
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;
