
const app = require('./app');

const PORT = 4000;

function listening() {

    console.log(`Listen on : http://localhost:${PORT}`);
} 

app.listen(PORT, listening);