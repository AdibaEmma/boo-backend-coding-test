import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { addProfile } from "../../src/services/profiles/addProfile"
import { getProfile } from "../../src/services/profiles/getProfile"
import { Profile } from "../../src/models/Profile";

const mongoServer = await MongoMemoryServer.create();

describe("Profile Service", () => {
  beforeAll(async function () {
    await mongoose.connect(mongoServer.getUri(), { dbName: "profiles" });
  });

  afterAll(async function () {
    await mongoose.disconnect();
  });

    describe("addProfile", () => {
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
    })

    describe("getProfile", () => {
      it("should return a profile with the specified query", async () => {
        // Create a test profile
        const testProfile = new Profile({
          name: "John Doe",
          age: 30,
          description: "Test bio",
        });
        await testProfile.save();

        const query = { name: "John Doe" };
        const profile = await getProfile(query);

        expect(profile.name).toEqual(testProfile.name);
        expect(profile.age).toEqual(testProfile.age);
        expect(profile.description).toEqual(testProfile.description);
      });

      it("should return null if no profile matches the query", async () => {
        const query = { name: "Nonexistent Person" };
        const profile = await getProfile(query);

        // Expect the returned profile to be null
        expect(profile).toBeNull();
      });
    });

  });
