const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
require('dotenv').config();
const cors = require('cors');


const storage = multer.diskStorage({
destination: (req, file, cb) => {
    cb(null, 'uploads/');
},
filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
}
});

const app = express();

app.use(cors());

app.use('/static', express.static(path.join(__dirname, '/static')));


const upload = multer({ storage: storage });

// 3. Rota POST para upload de arquivo
app.post('/upload', upload.single('file'), (req, res) => {
    res.send('Arquivo enviado com sucesso!');
});

// 4. Processar dados do formulário enviado via GET
app.get('/formdata', (req, res) => {
    const data = req.query;
    res.json(data);
});

app.get('/get-json', (req, res) => {
    const data = {
        message: "Olá, este é o seu JSON!"
    };
    res.json(data);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "..", './public/index.html'));
});

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Server running at http://${process.env.HOST}:${process.env.PORT}`);
});

