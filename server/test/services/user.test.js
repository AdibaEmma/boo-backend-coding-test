import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { createUser } from "../../src/services/users/createUser";
import { getUser } from "../../src/services/users/getUser";

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

  describe("getUser", () => {
    it("should return the user if found", async () => {
        const user = {
          firstName: "Brandon",
          lastName: "Smith",
          email: "smithg@gmail.com",
          birthdate: "1992-03-04",
        };
      const filterQuery = { email: "smithg@gmail.com" };

      const result = await getUser(filterQuery);

      expect(result.email).toEqual(user.email);
      expect(result.firstName).toEqual(user.firstName);
    });

    it("should return null if user not found", async () => {
      const filterQuery = { email: "notfound@example.com" };

      const result = await getUser(filterQuery);

      expect(result).toBeNull();
    });
  });
});
