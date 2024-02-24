"use client";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import { useState } from "react";
import { type RouterOutputs } from "src/trpc/shared";

type Topic = RouterOutputs["topic"]["getAll"][0];
export const Content: React.FC = () => {
  const { data: session } = useSession();
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const { data: topics, refetch: refetchTopics } = api.topic.getAll.useQuery(
    undefined,
    {
      enabled: session?.user !== undefined,
      onSuccess: (data) => {
        setSelectedTopic(selectedTopic ?? data[0] ?? null);
      },
    },
  );

  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {
      void refetchTopics();
    },
  });

  return (
    <div className="mx-5 mt-5 grid grid-cols-4 gap-2">
      <div className="px-2">
        <ul className="menu w-56 rounded-box bg-base-100 p-2">
          {topics?.map((topic) => (
            <li key={topic.id}>
              <a
                href="#"
                onClick={(evt) => {
                  evt.preventDefault();
                }}
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
              createTopic.mutate({
                title: e.currentTarget.value,
              });
              e.currentTarget.value = "";
            }
          }}
        />
      </div>
      <div className="col-span-3"></div>
    </div>
  );
};

export default Content;
