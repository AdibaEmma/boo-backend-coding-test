import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { createUser } from "../../src/services/users/createUser";

const mongoServer = await MongoMemoryServer.create();

describe("User Service", () => {
  beforeAll(async function () {
    await mongoose.connect(mongoServer.getUri(), { dbName: "users" });
  });

  afterAll(async function () {
    await mongoose.disconnect();
  });

  describe("createUser", () => {
    it("should create a new user in the database", async () => {
      const userDetails = {
        firstName: "Brandon",
        lastName: "Smith",
        email: "smithg@gmail.com",
        birthdate: "1992-03-04",
      };

      const newUser = await createUser(userDetails);

      expect(newUser).toBeDefined();
      expect(newUser.firstName).toBe(userDetails.firstName);
      expect(newUser.lastName).toBe(userDetails.lastName);
      expect(newUser.email).toBe(userDetails.email);
      expect(newUser.birthdate).toEqual(new Date(userDetails.birthdate));
    });
  });
});
