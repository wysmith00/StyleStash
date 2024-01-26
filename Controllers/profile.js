import mongoose from "mongoose";
import Profile from '../Models/profile.js'

const getProfile = async (req, res) => {
    try {
        const profiles = await Profile.findById(req.params.id);
        res.status(200).json(profiles);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const updateProfile = async (req, res) => {
    const { id: _id } = req.params;
    const profile = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).send('No profile with that id');

    const updatedProfile = await Profile.findByIdAndUpdate(_id, { ...profile, _id }, { new: true });

    res.json(updatedProfile);
};

export {
    updateProfile,
    getProfile,
};