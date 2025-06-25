import * as model from '../model/profileModel.js' // adjust path

export const saveProfileToDB = (req, res) => {
  const profile = res.locals.profileData;

  model.insertProfileData(profile, (err, results) => {
    if (err) {
      console.error("Insert failed:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.status(201).json({ message: "Profile saved successfully!" });
  });
};