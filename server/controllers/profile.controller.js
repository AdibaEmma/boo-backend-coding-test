const Profile = require("../models/Profile");
const { saveProfile } = require('../service/profile.service')
const { errorResponse, successResponse } = require("../utils/server-response");

const createNewProfile = async (req, res, next) => {
  try {
    const newProfile = await addProfile(req.body)
    res.status(201).send(profile);
  } catch (err) {
    res.status(400).send(err);
  }
};

const fetchProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find({}).exec();

    return successResponse(res, profiles, "Returned profiles", 200);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

const returnProfile = async (req, res, next) => {
  try {
    const foundProfile = await Profile.findOne({
      _id: req.params.profileId,
    }).exec();
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

const updateProfile = async (req, res, next) => {
    const query = { _id: req.params.profileId}
    try {
        const { acknowledged } = await Profile.updateOne(query, req.body, options = {});
        if (!acknowledged) {
          return errorResponse(res, "Update not successful", 400);
        }
         return successResponse(res, {}, "Update successful", 200);
    } catch (error) {
        return errorResponse(res, error.message);
    }
}

const deleteProfile = async (req, res, next) => {
    const query = { _id: req.params.profileId };
    try {
        const result = await Profile.findOneAndDelete(query);

        if (!result || Object.keys(result || {}).length == 0) {
          return errorResponse(res, "Could not delete profile", 422);
        }

        return successResponse(res, {}, "User account deleted", 200);
    } catch (error) {
        return errorResponse(res, error.message);
    }
}
module.exports = {
  createNewProfile,
  returnProfile,
  fetchProfiles,
  updateProfile,
  deleteProfile
};
