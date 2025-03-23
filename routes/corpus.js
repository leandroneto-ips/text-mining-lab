const express = require('express');
const corpusController = require('../controllers/corpus'); 

let router = express.Router();

/* POST Import Documents */
router.get('/importDocuments', async function (req, res, next) {
    const feedbackLog = await corpusController.importDocuments(200);
    res.render('corpus_import', { feedbackLog });
});

/* GET Corpus */
router.get('/list/:label', async function (req, res, next) {
    
    try {
        const label = req.params.label;
        const labelCorpusList = await corpusController.getCorpus(label);
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
        const document = await corpusController.getCorpusById(id);
        res.render('document', { document })

    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }

})

module.exports = router;