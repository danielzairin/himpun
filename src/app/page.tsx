import ProfileList from "@/components/ProfileList";

export default async function Home() {
  return (
    <main className="container py-10 h-screen">
      <ProfileList className="h-full" />
    </main>
  );
}
