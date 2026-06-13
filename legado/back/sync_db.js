const sequelize = require('./config/db');
const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, 'models');
const files = fs.readdirSync(modelsDir);

// Import all models first so associations are registered
files.forEach(file => {
    if (file.endsWith('.js')) {
        console.log('Loading model:', file);
        try {
            require(path.join(modelsDir, file));
        } catch (e) {
            console.error('Failed to load model:', file, e.message);
        }
    }
});

sequelize.sync({ force: true })
    .then(() => {
        console.log('Database synced successfully!');
        process.exit(0);
    })
    .catch(err => {
        console.error('Error syncing database:', err);
        process.exit(1);
    });
