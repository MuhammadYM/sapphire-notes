import { useState } from "react";

import ReactMarkdown from "react-markdown";

import { type RouterOutputs } from "src/trpc/shared";

type Note = RouterOutputs["note"]["getAll"][0];

export const NoteCard = ({
  note,
  onDelete,
}: {
  note: Note;
  onDelete: () => void;
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <div className="card mt-5 border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body m-0 p-3">
        <div
          className={`collapse-arror ${
            isExpanded ? "collapse-open" : ""
          }collapse`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="collapse-title text-xl font-bold">{note.title}</div>
        </div>
      </div>
    </div>
  );
};
