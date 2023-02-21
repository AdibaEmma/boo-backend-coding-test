import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
const mongoServer = await MongoMemoryServer.create();

describe("Comment Service", () => {
    beforeAll(async function () {
      await mongoose.connect(mongoServer.getUri(), { dbName: "comments" });
    });

    afterAll(async function () {
      await mongoose.disconnect();
    });
  describe("addComment", () => {
    it("adds a comment to the database", async () => {
      const userId = "123";
      const text = "This is a test comment";

      const comment = await addComment(userId, text);

      expect(comment).toBeInstanceOf(Comment);
      expect(comment.userId).toEqual(userId);
      expect(comment.text).toEqual(text);
    });
  });
});
