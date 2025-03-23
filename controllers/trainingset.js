const trainingSetDB = require('../database/trainingSet');

const removeAllTrainingSet = async () => {
    let feedbackMessage = 'Starting clear table trainingset...';
    await trainingSetDB.removeAllTrainingSet();
    feedbackMessage = feedbackMessage + '<br>';
    feedbackMessage = feedbackMessage + 'Finished clear tabel trainingset.';

    return feedbackMessage;
};

const createTrainingSet = async (classLimit) => {

    let feedbackMessage = await removeAllTrainingSet();

    feedbackMessage = feedbackMessage + '<br>' + `Starting insert ${classLimit} records...`

    await trainingSetDB.createTrainingSet(classLimit);

    feedbackMessage = feedbackMessage + '<br>';
    feedbackMessage = feedbackMessage + `Finished insert into trainingset table.`;

    return feedbackMessage;
};

const getTrainingSet = async (label) => {
    let labelTrainingSet = await trainingSetDB.getTrainingSet(label);
    return labelTrainingSet;
};



module.exports = {
    getTrainingSet,
    createTrainingSet
};