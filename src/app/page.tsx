import ProfileList from "@/components/ProfileList";
import { trpc } from "@/trpc/server";

export default async function Home() {
  const userCount = await trpc.users.count();

  return (
    <main>
      <h1>himpun.dev</h1>
      <p>There are {userCount} users in the database.</p>
      <p>Here are a few of them:</p>
      <ProfileList />
    </main>
  );
}
