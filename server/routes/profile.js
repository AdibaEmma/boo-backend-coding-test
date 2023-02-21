import { Router } from "express";
const router = Router();

import {
  createNewProfile,
  returnProfileById,
  fetchProfiles,
  updateProfileById,
  deleteProfileById,
} from "../controllers/profileController.js";
import { profileValidationRules, validateProfile } from '../middlewares/validators/profile.validator.js'

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

export const profileRoutes = () => {

  router.post('/', profileValidationRules(), validateProfile, createNewProfile)

  router.get('/', fetchProfiles)

  router.get("/:profileId", returnProfileById);

  router.patch('/:profileId', updateProfileById)

  router.delete('/profileId', deleteProfileById)

  return router;
}

