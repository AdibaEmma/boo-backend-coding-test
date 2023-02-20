const Profile = require("../models/Profile");

const saveProfile = async (input) => {
    return await Profile.create(input);
}


module.exports = {
    saveProfile
}