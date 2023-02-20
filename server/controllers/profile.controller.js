const Profile = require("../models/Profile");
const { errorResponse, successResponse } = require("../utils/server-response");

const createNewProfile = async (req, res, next) => {
  try {
    const profile = new Profile({ ...req.body });
    await profile.save();
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

module.exports = {
  createNewProfile,
  returnProfile,
  fetchProfiles,
};
