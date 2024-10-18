const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
const http = require('http');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

let conn = null;

const port = 8000;

const app = express();
const server = http.createServer(app);
app.use(express.json());

const jwtSecret = 'secret'

app.use(
    cors({
        credentials: true,
        origin: '*',
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

const users = []

app.post('/register', async (req, res) => {
    const { user_email, user_pass, user_fname, user_lname, birthday, user_phone } = req.body;
    console.log('Password:', user_pass);    
    if (!user_pass) {
        return res.status(400).json({ message: "Password is required" });
    }

    try {
        const hashPassword = await bcrypt.hash(user_pass, 10);

        const [results] = await conn.query('INSERT INTO user (user_email, user_pass, user_fname, user_lname, birthday, user_phone) VALUES (?, ?, ?, ?, ?, ?)', [user_email, hashPassword, user_fname, user_lname, birthday, user_phone]);

        users.push({ user_email, user_pass: hashPassword });

        res.status(201).json({ message: "User registered successfully!", results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error registering user" });
    }
});

app.get('/user', async (req ,res) => {
    try{
        const [rows] = await conn.query('SELECT * FROM user')
        res.json(rows)
    }catch(error){
        console.error(error)
    }
})

app.post('/login', async (req, res) => {
    const { user_email, user_pass } = req.body;

    try {
        const [rows] = await conn.query('SELECT * FROM user WHERE user_email = ?', [user_email]);

        if (rows.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        const user = rows[0];  

        const validPassword = await bcrypt.compare(user_pass, user.user_pass);
        
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ user_email: user.user_email }, jwtSecret, { expiresIn: '1h' });
        res.json({ message: 'Login Successfully!', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in' });
    }
});

app.get('/history', async (req, res) => {
    try{
        const [rows] = await conn.query('SELECT * FROM history')
        res.json(rows)
    }catch(error){
        res.status(500).json({ message: 'Failed to show history' })
    }
})

app.post('/history', async (req, res) => {
    const { name, lastname, birthday, salary, address } = req.body

    try{
        const [rows] = await conn.query('INSERT INTO history (name, lastname, birthday, salary, address) VALUES (?, ?, ?, ?, ?)', [name, lastname, birthday, salary, address])
        res.status(201).json({ message: 'Add history successfully!', rows})
    }catch(error){
        res.status(500).json({ message: 'Error to add history'})
    }
})


server.listen(port, async () => {
    await initMySQL();
    console.log(`Server is running on port ${port}`);
});
