const app = require('./app');
const connectDB = require('./database/db');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    connectDB().then(()=>{
        console.log(`Server running on port ${PORT}`.bgBlue.black);
    })
});