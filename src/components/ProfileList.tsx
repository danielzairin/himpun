"use client";

import { State, states } from "@/db/schema";
import { trpc } from "@/trpc/client";
import { useState } from "react";

export default function ProfileList() {
  const [state, setState] = useState<State>("Penang");
  const profilesQuery = trpc.profiles.list.useQuery({ max: 10, state });

  return (
    <>
      <label htmlFor="state">State</label>
      <div>
        <select
          id="state"
          value={state}
          onChange={(e) => setState(e.target.value as State)}
        >
          {states.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <ol>
        {profilesQuery.data &&
          profilesQuery.data.map((profile) => (
            <li key={profile.id}>
              {profile.name} from {profile.state}
            </li>
          ))}
      </ol>
    </>
  );
}
