import "dotenv/config";

import { db } from "@/db";
import { profiles, users } from "@/db/schema";
import { faker } from "@faker-js/faker";

const NUM_USERS = 100;

async function main() {
  const fakeProfiles: (typeof profiles.$inferInsert)[] = [];

  for (let i = 0; i < NUM_USERS; i++) {
    fakeProfiles.push({
      name: faker.person.fullName(),
    });
  }

  const insertedProfiles = await db
    .insert(profiles)
    .values(fakeProfiles)
    .returning();

  const fakeUsers: (typeof users.$inferInsert)[] = [];

  for (const profile of insertedProfiles) {
    const [firstName, lastName] = profile.name.split(" ");

    fakeUsers.push({
      profileId: profile.id,
      username: faker.internet.userName({ firstName, lastName }),
    });
  }

  await db.insert(users).values(fakeUsers);
}

console.log("seeding database...");
main().then(() => "seeding finished...");
