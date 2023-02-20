const Profile = require('../models/Profile')

const createNewProfile = async (req, res, next) => {
    try {
      const profile = new Profile({...req.body });
      await profile.save();
      res.status(201).send(profile);
    } catch (err) {
      res.status(400).send(err);
    }
}

const returnProfile = async (req, res, next) => {
    try {
        const foundProfile = await Profile.findOne({ _id: req.params.profileId}).exec()
        if(!foundProfile) {
            return 
        }
    } catch (error) {
        
    }
}

module.exports = {
    createNewProfile
}