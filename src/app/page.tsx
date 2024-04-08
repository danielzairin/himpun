import { trpc } from "@/trpc/server";

export default async function Home() {
  const userCount = await trpc.users.count();
  const profiles = await trpc.profiles.list({ max: 10 });

  return (
    <main>
      <h1>himpun.dev</h1>
      <p>There are {userCount} users in the database.</p>
      <p>Here are a few of them:</p>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.id}>
            {profile.name} from {profile.state}
          </li>
        ))}
      </ul>
    </main>
  );
}
