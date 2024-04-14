"use client";

import dynamic from "next/dynamic";
import { State, states } from "@/db/schema";
import { trpc } from "@/trpc/client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const Map = dynamic(() => import("./Map"), { ssr: false });

export default function ProfileList({ className }: Props) {
  const [state, setState] = useState<State>("Penang");
  const profilesQuery = trpc.profiles.list.useQuery({ max: 10, state });

  return (
    <div className={cn(className)}>
      <div className="mb-2">
        <Map onStateClick={setState} />
      </div>
      <p className="mb-2">Filter by state:</p>
      <Select value={state} onValueChange={(value) => setState(value as State)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a state" />
        </SelectTrigger>
        <SelectContent>
          {states.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <ol className="flex gap-2 flex-col my-4 max-w-lg">
        {profilesQuery.data &&
          profilesQuery.data.map((profile) => (
            <li
              key={profile.id}
              className="bg-secondary block border px-4 py-2 rounded"
            >
              <p className="text-lg">
                {profile.name} from {profile.state}
              </p>
            </li>
          ))}
      </ol>
    </div>
  );
}
