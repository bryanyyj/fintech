import * as model from '../models/profileModel.js'

export const saveProfileToDB = (req, res) => {
  const profile = res.locals.profileData;

  if (!res.locals.profileData) {
    return res.status(400).json({ error: "No profile data found in request." });
    }

  model.insertProfileData(profile, (err, results) => {
    if (err) {
      console.error("Insert failed:", err);
      return res.status(500).json({ error: "Database error" });
    }

    return res.status(201).json({ message: "Profile saved successfully!" });
  });
};

export const updateProfileToDB = (req, res) => {
  const profile = res.locals.profileData;

  if (!res.locals.profileData) {
    return res.status(400).json({ error: "No profile data found in request." });
    }

  model.updateProfile(profile, (err, results) => {
    if (err) {
      console.error("Update failed:", err);
      return res.status(500).json({ error: "Database error" });
    }

    return res.status(200).json({ message: "Profile updated successfully!" });
  });
};

export const getProfileData = (req, res, next) => {
    const data = {
        userId: req.query.userId
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error fetching profile data:", error);
            return res.status(500).json({ error: "Internal server error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "No profile data found" });
        }

        return res.status(200).json(results);
    };

    model.getProfile(data, callback);
};