// imports

var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
const sharp = require('sharp');
const path = require('path');
const cors = require('cors');


var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = require('./apiRouter').router;
var server = express();



//instantiation
server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Body Parser configuration
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

//Configure routes
server.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bonjour sur notre super server</h1>');

});



server.post('/upload_image', upload.single('img'), async(req, res) => {
    try {
        if (req.file) {
            // Utilise la librairie sharp pour redimensionner en 200x100, et renvoi la miniature dans un autre fichier dans le dossier de destination choisi dans le diskStorage
            await sharp(req.file.path, { failOnError: false })
                .resize({ width: 200, height: 100 })
                .toFile(
                    path.resolve(req.file.destination + '/thumbnail', req.file.filename),
                )
                // Vous pouvez utiliser ces variables pour faire des insertions en base de données ou autre
            let filename = req.file.filename
            let alt_text = req.body.alt_text
        }
        res.send('Upload fini')
    } catch (e) {
        res.status(400).send(e)
    }
})

server.use(cors());
server.use(sharp());

server.use('/api/', apiRouter);

server.use('/uploads', express.static('uploads'));
// Launch server
server.listen(3000, function() {
    console.log('Server en écoute :)');
});