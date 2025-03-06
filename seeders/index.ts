import usersSeed from "./users";

const seeds: (() => Promise<void>)[] = [usersSeed];

const seedAll = async () => {
  try {
    for (const seed of seeds) {
      await seed();
    }
  } catch (err) {
    console.log("Seeder Error: ", err);
  } finally {
    process.exit(1);
  }
};

seedAll();
