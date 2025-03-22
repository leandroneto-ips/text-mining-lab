var mysql = require('mysql2/promise');
var DB_CONFIG = require('./config');

const getDBMemoryUsage = async () => {
    let sqlQuery = `
	select 
    'Innodb_buffer_pool_bytes_data' AS var_name, 
    concat(round((
    select variable_value 
    from performance_schema.global_status 
    where variable_name = 'Innodb_buffer_pool_bytes_data') / 1024 / 1024, 2), ' MB') as value_in_MB;
    `;
    let connection = await mysql.createConnection(DB_CONFIG);
    await connection.connect();
    const [resultSet, fields] = await connection.query(sqlQuery);
    await connection.end();
    return resultSet;
};

module.exports = {
    getDBMemoryUsage
};