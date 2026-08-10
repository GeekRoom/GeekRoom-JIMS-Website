const TeamHead = require('../model/teamheads.model');
const uploadToImageKit = require('../utils/imagekit');

const createTeamHead = async (req, res) => {
    try {
        const teamHeadData = { ...req.body };

        if (req.file) {
            teamHeadData.image = await uploadToImageKit(req.file, '/team-heads');
        }

        const teamHead = await TeamHead.create(teamHeadData);

        return res.status(201).json({
            success: true,
            message: 'Team head created successfully',
            data: teamHead
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const getAllTeamHeads = async (req, res) => {
    try {
        const teamHeads = await TeamHead.find();

        return res.status(200).json({
            success: true,
            count: teamHeads.length,
            data: teamHeads
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getTeamHeadById = async (req, res) => {
    try {
        const teamHead = await TeamHead.findById(req.params.id);

        if (!teamHead) {
            return res.status(404).json({
                success: false,
                message: 'Team head not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: teamHead
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const updateTeamHead = async (req, res) => {
    try {
        const teamHeadData = { ...req.body };

        if (req.file) {
            teamHeadData.image = await uploadToImageKit(req.file, '/team-heads');
        }

        const teamHead = await TeamHead.findByIdAndUpdate(req.params.id, teamHeadData, {
            new: true,
            runValidators: true
        });

        if (!teamHead) {
            return res.status(404).json({
                success: false,
                message: 'Team head not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Team head updated successfully',
            data: teamHead
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const deleteTeamHead = async (req, res) => {
    try {
        const teamHead = await TeamHead.findByIdAndDelete(req.params.id);

        if (!teamHead) {
            return res.status(404).json({
                success: false,
                message: 'Team head not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Team head deleted successfully'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createTeamHead,
    getAllTeamHeads,
    getTeamHeadById,
    updateTeamHead,
    deleteTeamHead
};
