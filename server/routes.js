const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });


import * as express from 'express';
import db from './db';

app.use(express.json());


const router = express.Router();

router.get('/api/hello', (req, res, next) => {
    res.json('World');
});


router.get('/api/chirps/:id', async (req, res) => {
    try {
        res.json(await db.Chirps.one(req.params.id));

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/chirps', async (req, res) => {
    try {
        res.json(await db.Chirps.all());
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});


// // Create
router.post('/chirp-submit', urlencodedParser, async (req, res) => {

    try {
        await db.Chirps.add(req.body.name, req.body.content, 3);
          res.send('thanks for chirping');
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// // Delete
router.delete('/api/chirps/:id', async (req, res) => {
    try {
        res.json(await db.Chirps.remove(req.params.id));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// // Update
router.put('/api/chirps/:id', async (req, res) => {
    try {
        res.json(await db.Chirps.update(req.body.name, req.body.content, 3, req.params.id));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;