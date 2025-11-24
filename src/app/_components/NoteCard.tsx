"use client";
import { useState } from "react";

import ReactMarkdown from "react-markdown";

import { type RouterOutputs } from "src/trpc/shared";

// Flexible note type that works with both server and local notes
export interface NoteCardProps {
  id: string;
  title: string;
  content: string;
  topicId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export const NoteCard = ({
  note,
  onDelete,
}: {
  note: NoteCardProps;
  onDelete: () => void;
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <div className="card bg-base-100 shadow-lg border border-base-300 hover:shadow-xl transition-shadow">
      <div className="card-body p-5">
        <div
          className={`collapse-arrow ${
            isExpanded ? "collapse-open" : ""
          } collapse border-none bg-transparent`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="collapse-title text-xl font-bold px-0 py-2 min-h-0">
            {note.title}
          </div>
          <div className="collapse-content px-0 pb-2">
            <article className="prose prose-sm max-w-none text-base-content/80">
              <ReactMarkdown>{note.content}</ReactMarkdown>
            </article>
          </div>
        </div>
        <div className="card-actions justify-end pt-2 mt-2 border-t border-base-300">
          <button 
            className="btn btn-error btn-sm" 
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
