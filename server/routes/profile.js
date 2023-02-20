'use strict';

const express = require('express');
const router = express.Router();

const { createNewProfile, 
  returnProfile, 
  fetchProfiles,
  updateProfile,
  deleteProfile
 } = require('../controllers/profile.controller');
const { profileValidationRules, validateProfile } = require('../middlewares/validators/profile.validator')

const profiles = [
  {
    "id": 1,
    "name": "A Martinez",
    "description": "Adolph Larrue Martinez III.",
    "mbti": "ISFJ",
    "enneagram": "9w3",
    "variant": "sp/so",
    "tritype": 725,
    "socionics": "SEE",
    "sloan": "RCOEN",
    "psyche": "FEVL",
    "image": "https://soulverse.boo.world/images/1.png",
  }
];

module.exports = function() {

  router.post('/', profileValidationRules(), validateProfile, createNewProfile)

  router.get('/', fetchProfiles)

  router.get('/:profileId', returnProfile);

  router.patch('/:profileId', updateProfile)

  router.delete('/profileId', deleteProfile)

  return router;
}

