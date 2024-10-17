const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
const http = require('http');
const mysql = require('mysql2/promise');
let conn = null;

const port = 8000;

const app = express();
const server = http.createServer(app);
app.use(express.json());

app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5174/',
    })
);

const initMySQL = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'my',
    });
};

server.listen(port, async () => {
    await initMySQL();
    console.log(`Server is running on port ${port}`);
});
