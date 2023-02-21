import { Profile } from "../models/Profile.js";
import { addProfile } from "../services/profiles/addProfile.js";
import { findProfiles } from "../services/profiles/findProfiles.js";
import { getProfile } from "../services/profiles/getProfile.js";
import { updateProfile } from "../services/profiles/updateProfile.js";
import { errorResponse, successResponse } from "../utils/server-response.js";

export const createNewProfile = async (req, res, next) => {
  try {
    const newProfile = await addProfile(req.body);
    if (!newProfile) {
      return errorResponse(res, "Could not create profile", 400);
    }

    return successResponse(res, { newProfile }, "New profile added", 201);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const fetchProfiles = async (req, res, next) => {
  try {
    const profiles = await findProfiles();

    return successResponse(res, { profiles }, "Returned profiles", 200);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const returnProfileById = async (req, res, next) => {
  try {
    const foundProfile = await getProfile({ _id: req.params.profileId });
    if (!foundProfile) {
      return errorResponse(res, "Profile not found", 404);
    }

    return res.render("profile_template", {
      profile: foundProfile,
    });
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const updateProfileById = async (req, res, next) => {
  const query = { _id: req.params.profileId };
  try {
    const acknowledged = await updateProfile(query, req.body);

    if (!acknowledged) {
      return errorResponse(res, "Update not successful", 400);
    }
    return successResponse(res, {}, "Update successful", 200);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const deleteProfileById = async (req, res, next) => {
  const query = { _id: req.params.profileId };
  try {
    const result = await deleteProfile(query);

    if (!result || Object.keys(result || {}).length == 0) {
      return errorResponse(res, "Could not delete profile", 422);
    }

    return successResponse(res, {}, "User account deleted", 200);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
