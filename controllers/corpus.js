
const corpusDB = require('../database/corpus');

const removeAllDocuments = async () => {
    let feedbackMessage = 'Starting clear table corpus...';
    await corpusDB.removeAllCorpus();
    feedbackMessage = feedbackMessage + '<br>';
    feedbackMessage = feedbackMessage + 'Finished clear tabel corpus.';

    return feedbackMessage;
};

async function importDocuments(docsNumber) {

    let feedbackMessage = await removeAllDocuments();

    let positiveReviews = await corpusDB.getPositiveReviewsOriginalSet(docsNumber);
    let negativeReviews = await corpusDB.getNegativeReviewsOriginalSet(docsNumber);

    negativeReviews.forEach((element) => {
        positiveReviews.push(element);
    });
    let allReviews = positiveReviews;

    feedbackMessage = feedbackMessage + '<br>' + `Starting insert ${allReviews.length} records...`

    await corpusDB.insertCorpus(allReviews);
    
    feedbackMessage = feedbackMessage + '<br>';
    feedbackMessage = feedbackMessage + `Finished insert into corpus table.`;
    // console.log(feedbackMessage);

    return feedbackMessage;
}

async function getCorpus(label) {
    let corpusList = await corpusDB.getCorpus(label);
    // console.log(corpusList);
    return corpusList;
}

const getCorpusById = async (id) => {
    let corpus = await corpusDB.getCorpusById(id);
    // console.log(corpus);
    return corpus;
}

// importDocuments(2);
// getCorpus('not happy');

module.exports = {
    importDocuments,
    getCorpus,
    getCorpusById
}