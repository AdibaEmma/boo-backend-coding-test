import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Comment } from "../../src/models/Comment";
import { addComment } from "../../src/services/comments/addComment";
import { findComments } from "../../src/services/comments/findComments";
import { likeComment } from "../../src/services/comments/likeComment";
import { unlikeComment } from "../../src/services/comments/unlikeComment";
import { voteEnneagram } from "../../src/services/comments/voteEnneagram";
import { voteMbti } from "../../src/services/comments/voteMbti";
import { jest } from "@jest/globals";

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
      const userId = new mongoose.Types.ObjectId();
      const text = "This is a test comment";

      const comment = await addComment(userId, text);

      expect(comment).toBeInstanceOf(Comment);
      expect(comment.userId).toEqual(userId);
      expect(comment.text).toEqual(text);
    });
  });

  describe("findComments", () => {
    it("returns an array of comments sorted by createdAt in descending order", async () => {
      const userId = new mongoose.Types.ObjectId();
      const text = "This is a test comment";

      const comment = await addComment(userId, text);

      const filterQuery = { userId };
      const sortBy = "createdAt";

      const result = await findComments(filterQuery, sortBy);

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].createdAt).toBeInstanceOf(Date);

      for (let i = 1; i < result.length; i++) {
        const prev = result[i - 1];
        const current = result[i];
        expect(prev.createdAt).toBeGreaterThanOrEqual(current.createdAt);
      }
    });
  });

  describe("likeComment", () => {
    let comment;
    const userId = new mongoose.Types.ObjectId();

    beforeEach(() => {
      // create a mock comment object with empty likes array
      comment = {
        likes: [],
        save: jest.fn(),
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should add user to comment likes if not already liked", async () => {
      const result = await likeComment(comment, userId);
      expect(result).toBe(1); // expected number of likes after adding user
      expect(comment.likes).toEqual([userId]);
      expect(comment.save).toHaveBeenCalled();
    });

    it("should not add user to comment likes if already liked", async () => {
      comment.likes.push(userId);
      const result = await likeComment(comment, userId);
      expect(result).toBe(1); // expected number of likes should not change
      expect(comment.likes).toEqual([userId]);
      expect(comment.save).not.toHaveBeenCalled();
    });
  });

  describe("unlikeComment", () => {
    test("should remove user from the list of likes", async () => {
      const comment = {
        _id: "123",
        likes: ["user1", "user2", "user3"],
        save: jest.fn().mockResolvedValue(true),
      };
      const userId = "user2";
      const expectedLikes = ["user1", "user3"];

      const result = await unlikeComment(comment, userId);

      expect(result).toBe(expectedLikes.length);
      expect(comment.likes).toEqual(expectedLikes);
      expect(comment.save).toHaveBeenCalled();
    });

    test("should not remove user if not found in list of likes", async () => {
      const comment = {
        _id: "123",
        likes: ["user1", "user2", "user3"],
        save: jest.fn().mockResolvedValue(true),
      };
      const userId = "user4";
      const expectedLikes = ["user1", "user2", "user3"];

      const result = await unlikeComment(comment, userId);

      expect(result).toBe(expectedLikes.length);
      expect(comment.likes).toEqual(expectedLikes);
      expect(comment.save).not.toHaveBeenCalled();
    });
  });

  describe("voteEnneagram", () => {
    it("should update the enneagram vote in the comment", async () => {
      const filter = { _id: new mongoose.Types.ObjectId() };
      const enneagramInput = "2w3";

      const updateOneMock = jest.fn().mockResolvedValue({ acknowledged: true });
      const Comment = { updateOne: updateOneMock };

      const result = await voteEnneagram(filter, enneagramInput);

      expect(result).toBe(true);
    });
  });

  describe("voteMbti", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should update a comment with a new MBTI vote", async () => {
      const mockFilter = { _id: new mongoose.Types.ObjectId() };
      const mockMbtiInput = "INFP";
      const mockOptions = { new: true };
      const mockUpdateResult = { acknowledged: true };

      const updateOneMock = jest.fn().mockResolvedValue(mockUpdateResult);
      const Comment = { updateOne: updateOneMock };

      const result = await voteMbti(mockFilter, mockMbtiInput, mockOptions);
      
      expect(result).toBe(mockUpdateResult.acknowledged);
    });
  });
});
