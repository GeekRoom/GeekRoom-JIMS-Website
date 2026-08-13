const express = require('express');
const cors = require('cors');
const multer = require('multer');
const eventRoutes = require('./routes/events.routes');
const teamHeadRoutes = require('./routes/teamheads.routes');
const achievementRoutes = require('./routes/acheivements.routes');
const contactRoutes = require('./routes/contact.routes');

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/events', eventRoutes);
app.use('/api/team-heads', teamHeadRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/contact', contactRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Cannot ${req.method} ${req.originalUrl}`
    });
});

app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        return res.status(400).json({
            success: false,
            message: `${error.message}: ${error.field}. Use image for cover image and image_gallery for event gallery.`
        });
    }

    return res.status(500).json({
        success: false,
        message: error.message
    });
});

module.exports = app;
