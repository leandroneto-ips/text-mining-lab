const express = require('express');
const trainingSetController = require('../controllers/trainingset');

let router = express.Router();


/**
 * POST Create Training Set
 */

router.get('/createall', async (req, res, next) => {
    try {
        let feedbackLog = await trainingSetController.createTrainingSet(100);
        res.render('trainingset_create', { feedbackLog });
        
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/list/:label', async (req, res, next) => {
    try {
        let label = req.params.label;
        let labelTrainingSet = await trainingSetController.getTrainingSet(label);

        res.render('trainingset', {
            label: label.replace(/\b\w/gm, (char) => char.toUpperCase()),
            trainingSetList: labelTrainingSet
        });

    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
