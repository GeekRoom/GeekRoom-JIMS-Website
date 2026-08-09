const app = require('./src/app');
const connectdb = require('./src/db/db');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

connectdb();

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
})