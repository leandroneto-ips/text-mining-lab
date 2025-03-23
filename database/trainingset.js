const mysql = require('mysql2/promise');
const DB_CONFIG = require('./config');
const corpusDB = require('../database/corpus');

const getTrainingSet = async (label) => {
    let sqlQuery = `
    select 
    t.id as id
    , c.id as id_corpus
    , c.review as text
    from trainingset t
    inner join corpus c on t.id_corpus = c.id
    where c.label = ?;
    `;
    let connection = await mysql.createConnection(DB_CONFIG);
    await connection.connect();
    const [trainingSetList, fields] = await connection.query(sqlQuery, [label]);
    await connection.end();
    return trainingSetList;
};

const createTrainingSet = async (classLimit) => {
    
    let happyCorpus = await corpusDB.getCorpus('happy', classLimit);
    let notHappyCorpus = await corpusDB.getCorpus('not happy', classLimit);

    notHappyCorpus.forEach((element) => {
        happyCorpus.push(element);
    });
    let allCorpus = happyCorpus;
    
    let sqlQuery = `
    insert into trainingset(id_corpus) 
    values (?);
    `;

    let connection = await mysql.createConnection(DB_CONFIG);
    await connection.connect();

    allCorpus.forEach(async (corpus) => {
        await connection.query(sqlQuery, [corpus.id]);
    });
    
    await connection.end();

};

const removeAllTrainingSet = async () => {
    let sqlQuery = `
    delete from trainingset where id > 0;
    `
    let connection = await mysql.createConnection(DB_CONFIG);
    await connection.connect();
    await connection.query(sqlQuery);
    await connection.end();
    await resetTrainingSetId();
};

const resetTrainingSetId = async () => {
    let sqlQuery = `
    alter table trainingset auto_increment = 1;
    `
    let connection = await mysql.createConnection(DB_CONFIG);
    await connection.connect();
    await connection.query(sqlQuery);
    await connection.end();
};

module.exports = {
    getTrainingSet,
    createTrainingSet,
    removeAllTrainingSet,
    resetTrainingSetId
};