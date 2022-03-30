// const express = require("express");
// const router = express.Router();
// const chirpsStore = require("../chirpstore.js");
// no more chirpstore! install mysql from npm and configure the routes to use that instead of chirpstore.
import * as express from 'express';
import db from './db';

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
router.post('/api/chirps/', async (req, res) => {
  try {
      res.json(await db.Chirps.add(1, 'hey', 3));
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
// router.put("/:id", (req, res) => {
//     const id = req.params.id;
//     const body = req.body;

//     // chirpsStore.UpdateChirp(id, body);
//     res.sendStatus(200);
// });

// module.exports = router;

export default router;