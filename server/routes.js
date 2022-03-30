// const express = require("express");
const path = require("path");
const fs = require("fs");
const { info } = require("console");
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
 
// const express = require("express");
// const router = express.Router();
// const chirpsStore = require("../chirpstore.js");
// no more chirpstore! install mysql from npm and configure the routes to use that instead of chirpstore.
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



// // REST API
// router.get("/:id?", (req, res) => {
//     const id = req.params.id;

//     if (id) {
//         // const chirp = chirpsStore.GetChirp(id);
//         res.json(chirp);
//     } else {
//         const chirps = chirpsStore.GetChirps();
//         res.json(chirps);
//     }
// });

// // Create
router.post('/api/chirps', urlencodedParser, async (req, res) => {
  
  try {
   
      res.json(await db.Chirps.add(req.body.name, req.body.content, 3));
      
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
    res.json(await db.Chirps.update(4, 'hezooo', 3, req.params.id));
} catch (e) {
    console.log(e);
    res.sendStatus(500);
}
});

// module.exports = router;

export default router;