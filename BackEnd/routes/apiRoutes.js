const express = require('express');
const router = express.Router();

const Carbon = require('../models/carbon');

/**Get details from DB */
router.get('/carbonDetails', (req, res) => { 
    Carbon.find(function (err, carbonDetails) {
        if (err) {
            console.log(err);
        } else {
            res.send(carbonDetails);
        }
    });  
})
/** Saving to mongoDB */
router.post('/save', (req, res) => {
    Carbon.create(req.body).then(function(carbon){
        res.send(carbon);
    })
        .catch(err => {
            res.status(400).send("Unable to save to MongoDB");
    })
});

   module.exports = router;
