const express = require('express');
const {
    createAchievement,
    getAllAchievements,
    getAchievementById,
    updateAchievement,
    deleteAchievement
} = require('../controllers/acheivements.controller');

const router = express.Router();

router.post('/create_achievement', createAchievement);
router.get('/getAll_achievements', getAllAchievements);
router.get('/get_achievement/:id', getAchievementById);
router.put('/update_achievement/:id', updateAchievement);
router.delete('/delete_achievement/:id', deleteAchievement);

module.exports = router;
