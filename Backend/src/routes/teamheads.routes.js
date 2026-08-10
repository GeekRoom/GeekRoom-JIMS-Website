const express = require('express');
const upload = require('../middleware/upload.middleware');
const {
    createTeamHead,
    getAllTeamHeads,
    getTeamHeadById,
    updateTeamHead,
    deleteTeamHead
} = require('../controllers/teamheads.controller');

const router = express.Router();

router.post('/create_team_head', upload.single('image'), createTeamHead);
router.get('/get_team_heads', getAllTeamHeads);
router.get('/get_team_head/:id', getTeamHeadById);
router.put('/update_team_head/:id', upload.single('image'), updateTeamHead);
router.delete('/delete_team_head/:id', deleteTeamHead);


module.exports = router;
