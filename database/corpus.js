var mysql = require('mysql2/promise');
var DB_CONFIG = require('./config');

async function getPositiveReviewsOriginalSet(numberOfRows = 100) {
    
    let sqlQuery = `
    select id as id_hotelreviews, Positive_Review as review, Reviewer_Score as score, 'happy' as label
    from hotelreviews
    where Reviewer_Score > 7.0
    order by score desc, length(Positive_Review) desc
    limit ?;
    `;
    let connection = await mysql.createConnection(DB_CONFIG);
    await connection.connect();
    const [positiveOriginalSet, fields] = await connection.query(sqlQuery, [numberOfRows]);
    await connection.end();
    return positiveOriginalSet;
}

async function getNegativeReviewsOriginalSet(numberOfRows = 100) {
    
    let sqlQuery = `
    select id as id_hotelreviews, Negative_Review as review, Reviewer_Score as score, 'not happy' as label
    from hotelreviews
    where Reviewer_Score < 3.0
    order by score, length(Negative_Review) desc
    limit ?;
    `;
    let connection = await mysql.createConnection(DB_CONFIG);
    await connection.connect()
    const [negativeOriginalSet, fields] = await connection.query(sqlQuery, [numberOfRows]);
    await connection.end();
    return negativeOriginalSet;
}

async function getCorpus(label) {
    let sqlQuery = `
    select *
    from corpus
    where label = ?;
    `
    let connection = await mysql.createConnection(DB_CONFIG);
    await connection.connect();
    const [corpusList, fields] = await connection.query(sqlQuery, [label]);
    await connection.end();
    return corpusList
}

const getCorpusById = async (id) => {
    let = sqlQuery = `
    select *
    from corpus
    where id = ?
    `
    let connection = await mysql.createConnection(DB_CONFIG);
    await connection.connect();
    const [corpus, fields] = await connection.query(sqlQuery, [id]);
    await connection.end();
    return corpus[0];
}

async function insertCorpus(originalReviewsList) {
    let sqlQuery = `
    insert into corpus (id_hotelreviews, review, score, label)
    values (?, ?, ?, ?);
    `
    let connection = await mysql.createConnection(DB_CONFIG);
    await connection.connect();

    originalReviewsList.forEach(async (review) => {
        await connection.query(sqlQuery, [review.id_hotelreviews, review.review, review.score, review.label]);
    });
    
    await connection.end();    
}

const removeAllCorpus = async () => {
    let sqlQuery = `
    delete from corpus where id > 0;
    `
    let connection = await mysql.createConnection(DB_CONFIG);
    await connection.connect();
    await connection.query(sqlQuery);
    await connection.end();
    await resetCorpusId();
};

const resetCorpusId = async () => {
    let sqlQuery = `
    alter table corpus auto_increment = 1;
    `

    let connection = await mysql.createConnection(DB_CONFIG);
    await connection.connect();
    await connection.query(sqlQuery);
    await connection.end();
};

// getCorpus('TESTE');

// insertCorpus(1, 'teste3', 7.2, 'TESTE');

// getNegativeReviewsOriginalSet(2);

module.exports = {
    getPositiveReviewsOriginalSet,
    getNegativeReviewsOriginalSet,
    getCorpus,
    getCorpusById,
    insertCorpus,
    removeAllCorpus
}