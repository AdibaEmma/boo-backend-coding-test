import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { addProfile } from "../../src/services/profiles/addProfile"

const mongoServer = await MongoMemoryServer.create();

describe("Profile Service", () => {
  beforeAll(async function () {
    await mongoose.connect(mongoServer.getUri(), { dbName: "profiles" });
  });

    it("should add a new profile", async () => {
      const profile = {
        name: "Emmanuel Adiba",
        description: "Awesome software engineer",
        age: 22,
        mbti: "INTJ",
        enneagram: "9w3",
        variant: "sp/so",
        tritype: 800,
        socionics: "SEE",
        sloan: "RCOEN",
        psyche: "FEVL",
        image: "https://soulverse.boo.world/images/1.png",
      };

      const newProfile = await addProfile(profile);

      expect(newProfile).toMatchObject(profile);
    });
  });

  afterAll(async function () {
    await mongoose.disconnect();
});
