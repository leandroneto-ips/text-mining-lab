const express = require('express');
const corpusDB = require('../controllers/corpus'); 

let router = express.Router();

/**
 * GET Home Page
 */

router.get('/home', (req, res, next) => {
    console.log('routing to /home');
    res.render('home');
});

/* POST Import Documents */
router.get('/importDocuments', async function (req, res, next) {
    const feedbackMessage = await corpusDB.importDocuments(200);
    res.render('import', { feedbackMessage });
});

/* GET Corpus */
router.get('/corpus/:label', async function (req, res, next) {
    
    try {
        const label = req.params.label;
        const labelCorpusList = await corpusDB.getCorpus(label);
        res.render('corpus', { 
            label: label.replace(/\b\w/gm, (char) => char.toUpperCase()),
            corpusList: labelCorpusList 
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
    
});

/**
 * Get Document
 */
router.get('/document/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const document = await corpusDB.getCorpusById(id);
        res.render('document', { document })

    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }

})

module.exports = router;