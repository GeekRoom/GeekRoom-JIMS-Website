const express = require('express');
const multer = require('multer');
const {
    createTeamHead,
    getAllTeamHeads,
    getTeamHeadById,
    updateTeamHead,
    deleteTeamHead
} = require('../controllers/teamheads.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'), false);
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

router.post('/create_team_head', authMiddleware, upload.single('image'), createTeamHead);
router.get('/get_team_heads', getAllTeamHeads);
router.get('/get_team_head/:id', getTeamHeadById);
router.put('/update_team_head/:id', authMiddleware, upload.single('image'), updateTeamHead);
router.delete('/delete_team_head/:id', authMiddleware, deleteTeamHead);


module.exports = router;
