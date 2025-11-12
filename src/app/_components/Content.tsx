"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import { useState } from "react";
import { type RouterOutputs } from "src/trpc/shared";
import { NoteEditor } from "./NoteEditor";
import { NoteCard, type NoteCardProps } from "./NoteCard";
import { useLocalTopics, useLocalNotes, type LocalTopic, type LocalNote } from "~/hooks/useLocalStorage";

type ServerTopic = RouterOutputs["topic"]["getAll"][0];
type ServerNote = RouterOutputs["note"]["getAll"][0];

// Unified types that work with both server and local data
type UnifiedTopic = ServerTopic | LocalTopic;
type UnifiedNote = ServerNote | LocalNote;

export const Content: React.FC = () => {
  const { data: session } = useSession();
  const [selectedTopic, setSelectedTopic] = useState<UnifiedTopic | null>(null);

  // Authenticated user data
  const { data: serverTopics, refetch: refetchServerTopics } = api.topic.getAll.useQuery(
    undefined,
    {
      enabled: session?.user !== undefined,
      onSuccess: (data) => {
        setSelectedTopic(selectedTopic ?? data[0] ?? null);
      },
    },
  );

  const createServerTopic = api.topic.create.useMutation({
    onSuccess: () => {
      void refetchServerTopics();
    },
  });

  const { data: serverNotes, refetch: refetchServerNotes } = api.note.getAll.useQuery(
    {
      topicId: selectedTopic?.id ?? "",
    },
    {
      enabled: session?.user !== undefined && selectedTopic !== null,
    },
  );

  const createServerNote = api.note.create.useMutation({
    onSuccess: () => {
      void refetchServerNotes();
    },
  });

  const deleteServerNote = api.note.delete.useMutation({
    onSuccess: () => {
      void refetchServerNotes();
    },
  });

  // Local storage data for unauthenticated users
  const { topics: localTopics, createTopic: createLocalTopic, deleteTopic: deleteLocalTopic, refetch: refetchLocalTopics } = useLocalTopics();
  const { notes: localNotes, createNote: createLocalNote, deleteNote: deleteLocalNote, refetch: refetchLocalNotes } = useLocalNotes(selectedTopic?.id || null);

  // Use server data if authenticated, local data if not
  const topics: UnifiedTopic[] = session?.user ? (serverTopics ?? []) : localTopics;
  const notes: NoteCardProps[] = session?.user ? (serverNotes ?? []) : localNotes;

  // Ensure we have a default topic for unauthenticated users
  React.useEffect(() => {
    if (!session?.user && localTopics.length === 0) {
      const defaultTopic = createLocalTopic("My Notes");
      setSelectedTopic(defaultTopic);
    } else if (!session?.user && localTopics.length > 0 && !selectedTopic) {
      setSelectedTopic(localTopics[0]!);
    }
  }, [session?.user, localTopics, selectedTopic, createLocalTopic]);

  const handleCreateTopic = (title: string) => {
    if (session?.user) {
      createServerTopic.mutate({ title });
    } else {
      const newTopic = createLocalTopic(title);
      setSelectedTopic(newTopic);
    }
  };

  const handleCreateNote = (title: string, content: string) => {
    if (session?.user && selectedTopic) {
      createServerNote.mutate({
        title,
        content,
        topicId: selectedTopic.id,
      });
    } else if (!session?.user && selectedTopic) {
      createLocalNote(title, content);
      refetchLocalNotes();
    }
  };

  const handleDeleteNote = (id: string) => {
    if (session?.user) {
      deleteServerNote.mutate({ id });
    } else {
      deleteLocalNote(id);
      refetchLocalNotes();
    }
  };

  return (
    <div className="mx-5 mt-5 grid grid-cols-4 gap-2">
      <div className="px-2">
        {!session?.user && (
          <div className="mb-4 rounded-lg bg-yellow-100 p-3 text-sm text-yellow-800">
            <p className="font-semibold">Guest Mode</p>
            <p>Your notes are saved locally. Sign in to sync across devices.</p>
          </div>
        )}
        <ul className="menu w-56 rounded-box bg-base-100 p-2">
          {topics?.map((topic) => (
            <li key={topic.id}>
              <a
                href="#"
                onClick={(evt) => {
                  evt.preventDefault();
                  setSelectedTopic(topic);
                }}
                className={selectedTopic?.id === topic.id ? "active" : ""}
              >
                {topic.title}
              </a>
            </li>
          ))}
        </ul>
        <div className="divider"></div>
        <input
          type="text"
          placeholder="New Topic"
          className="input input-bordered input-sm w-full"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCreateTopic(e.currentTarget.value);
              e.currentTarget.value = "";
            }
          }}
        />
      </div>
      <div className="col-span-3">
        <div>
          {notes?.map((note) => (
            <div key={note.id} className="mt-5">
              <NoteCard
                note={note}
                onDelete={() => handleDeleteNote(note.id)}
              />
            </div>
          ))}
        </div>
        {selectedTopic && (
          <NoteEditor
            onSave={({ title, content }) => {
              handleCreateNote(title, content);
            }}
          />
        )}
        {!selectedTopic && !session?.user && localTopics.length === 0 && (
          <div className="mt-5 text-center text-gray-500">
            <p>Create your first topic to start taking notes!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Content;
