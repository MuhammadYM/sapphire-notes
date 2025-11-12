import { useState, useEffect } from "react";

// Types for local storage data
export interface LocalNote {
  id: string;
  title: string;
  content: string;
  topicId: string;
  createdAt: string;
  updatedAt: string;
}

export interface LocalTopic {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

// Generate unique IDs for local storage items
const generateId = () => `local_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

// Custom hook for managing topics in localStorage
export const useLocalTopics = () => {
  const [topics, setTopics] = useState<LocalTopic[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("sapphire_local_topics");
    if (stored) {
      try {
        setTopics(JSON.parse(stored));
      } catch (error) {
        console.error("Error parsing stored topics:", error);
        setTopics([]);
      }
    }
  }, []);

  const saveTopics = (newTopics: LocalTopic[]) => {
    setTopics(newTopics);
    localStorage.setItem("sapphire_local_topics", JSON.stringify(newTopics));
  };

  const createTopic = (title: string) => {
    const newTopic: LocalTopic = {
      id: generateId(),
      title,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedTopics = [...topics, newTopic];
    saveTopics(updatedTopics);
    return newTopic;
  };

  const deleteTopic = (id: string) => {
    const updatedTopics = topics.filter(topic => topic.id !== id);
    saveTopics(updatedTopics);
    // Also delete all notes for this topic
    const storedNotes = localStorage.getItem("sapphire_local_notes");
    if (storedNotes) {
      try {
        const notes: LocalNote[] = JSON.parse(storedNotes);
        const filteredNotes = notes.filter(note => note.topicId !== id);
        localStorage.setItem("sapphire_local_notes", JSON.stringify(filteredNotes));
      } catch (error) {
        console.error("Error filtering notes:", error);
      }
    }
  };

  return {
    topics,
    createTopic,
    deleteTopic,
    refetch: () => {
      const stored = localStorage.getItem("sapphire_local_topics");
      if (stored) {
        try {
          setTopics(JSON.parse(stored));
        } catch (error) {
          console.error("Error parsing stored topics:", error);
        }
      }
    }
  };
};

// Custom hook for managing notes in localStorage
export const useLocalNotes = (topicId: string | null) => {
  const [notes, setNotes] = useState<LocalNote[]>([]);

  useEffect(() => {
    if (!topicId) {
      setNotes([]);
      return;
    }

    const stored = localStorage.getItem("sapphire_local_notes");
    if (stored) {
      try {
        const allNotes: LocalNote[] = JSON.parse(stored);
        const topicNotes = allNotes.filter(note => note.topicId === topicId);
        setNotes(topicNotes);
      } catch (error) {
        console.error("Error parsing stored notes:", error);
        setNotes([]);
      }
    }
  }, [topicId]);

  const saveNotes = (allNotes: LocalNote[]) => {
    localStorage.setItem("sapphire_local_notes", JSON.stringify(allNotes));
    if (topicId) {
      const topicNotes = allNotes.filter(note => note.topicId === topicId);
      setNotes(topicNotes);
    }
  };

  const createNote = (title: string, content: string) => {
    if (!topicId) return;

    const newNote: LocalNote = {
      id: generateId(),
      title,
      content,
      topicId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const stored = localStorage.getItem("sapphire_local_notes");
    let allNotes: LocalNote[] = [];
    if (stored) {
      try {
        allNotes = JSON.parse(stored);
      } catch (error) {
        console.error("Error parsing stored notes:", error);
      }
    }

    const updatedNotes = [...allNotes, newNote];
    saveNotes(updatedNotes);
    return newNote;
  };

  const deleteNote = (id: string) => {
    const stored = localStorage.getItem("sapphire_local_notes");
    if (stored) {
      try {
        const allNotes: LocalNote[] = JSON.parse(stored);
        const updatedNotes = allNotes.filter(note => note.id !== id);
        saveNotes(updatedNotes);
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    }
  };

  return {
    notes,
    createNote,
    deleteNote,
    refetch: () => {
      if (!topicId) return;
      const stored = localStorage.getItem("sapphire_local_notes");
      if (stored) {
        try {
          const allNotes: LocalNote[] = JSON.parse(stored);
          const topicNotes = allNotes.filter(note => note.topicId === topicId);
          setNotes(topicNotes);
        } catch (error) {
          console.error("Error parsing stored notes:", error);
        }
      }
    }
  };
}; 