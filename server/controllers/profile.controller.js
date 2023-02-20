const createNewProfile = async (req, res, next) => {
    try {
      const profile = new Profile({...req.body });
      await profile.save();
      res.status(201).send(profile);
    } catch (err) {
      res.status(400).send(err);
    }
}