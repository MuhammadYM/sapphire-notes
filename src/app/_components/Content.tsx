"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import { useState } from "react";
import { type RouterOutputs } from "src/trpc/shared";
import { NoteEditor } from "./NoteEditor";
import { NoteCard, type NoteCardProps } from "./NoteCard";
import { useLocalTopics, useLocalNotes, type LocalTopic } from "~/hooks/useLocalStorage";

type ServerTopic = RouterOutputs["topic"]["getAll"][0];

// Unified types that work with both server and local data
type UnifiedTopic = ServerTopic | LocalTopic;

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
  const { topics: localTopics, createTopic: createLocalTopic } = useLocalTopics();
  const { notes: localNotes, createNote: createLocalNote, deleteNote: deleteLocalNote, refetch: refetchLocalNotes } = useLocalNotes(selectedTopic?.id ?? null);

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
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Sidebar */}
      <div className="lg:col-span-3">
        <div className="sticky top-6">
          {!session?.user && (
            <div className="mb-4 rounded-lg bg-base-200 border border-base-300 p-4 text-sm">
              <p className="font-semibold text-base-content">Guest Mode</p>
              <p className="text-base-content/70 mt-1">Your notes are saved locally. Sign in to sync across devices.</p>
            </div>
          )}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body p-4">
              <h2 className="card-title text-lg mb-3">Topics</h2>
              <ul className="menu menu-vertical w-full p-0 gap-1">
                {topics?.map((topic) => (
                  <li key={topic.id}>
                    <a
                      href="#"
                      onClick={(evt) => {
                        evt.preventDefault();
                        setSelectedTopic(topic);
                      }}
                      className={`rounded-lg ${
                        selectedTopic?.id === topic.id 
                          ? "bg-primary text-primary-content font-semibold" 
                          : "hover:bg-base-200"
                      }`}
                    >
                      {topic.title}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="divider my-3"></div>
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
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-9">
        {!selectedTopic && !session?.user && localTopics.length === 0 ? (
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body items-center text-center py-16">
              <p className="text-lg text-base-content/70">Create your first topic to start taking notes!</p>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {notes?.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onDelete={() => handleDeleteNote(note.id)}
                />
              ))}
              {notes?.length === 0 && selectedTopic && (
                <div className="card bg-base-100 shadow-lg">
                  <div className="card-body items-center text-center py-12">
                    <p className="text-base-content/70">No notes yet. Create your first note below!</p>
                  </div>
                </div>
              )}
            </div>
            {selectedTopic && (
              <NoteEditor
                onSave={({ title, content }) => {
                  handleCreateNote(title, content);
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Content;
