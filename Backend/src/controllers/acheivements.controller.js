const Acheivement = require('../model/acheivement.model');

const createAchievement = async (req, res) => {
    try {
        const achievement = await Acheivement.create(req.body);

        return res.status(201).json({
            success: true,
            message: 'Achievement created successfully',
            data: achievement
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const getAllAchievements = async (req, res) => {
    try {
        const achievements = await Acheivement.find().sort({ month: -1 });

        return res.status(200).json({
            success: true,
            count: achievements.length,
            data: achievements
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getAchievementById = async (req, res) => {
    try {
        const achievement = await Acheivement.findById(req.params.id);

        if (!achievement) {
            return res.status(404).json({
                success: false,
                message: 'Achievement not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: achievement
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const updateAchievement = async (req, res) => {
    try {
        const achievement = await Acheivement.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!achievement) {
            return res.status(404).json({
                success: false,
                message: 'Achievement not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Achievement updated successfully',
            data: achievement
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const deleteAchievement = async (req, res) => {
    try {
        const achievement = await Acheivement.findByIdAndDelete(req.params.id);

        if (!achievement) {
            return res.status(404).json({
                success: false,
                message: 'Achievement not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Achievement deleted successfully'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createAchievement,
    getAllAchievements,
    getAchievementById,
    updateAchievement,
    deleteAchievement
};
