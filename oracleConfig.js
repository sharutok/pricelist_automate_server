const oracledb = require("oracledb");
exports.NORMAL_ORACLE_MASTER_PROD = async (query) => {
    let connection;
    try {
        connection = await oracledb.getConnection({
            user: process.env.PROD_ADOR_USER,
            password: process.env.PROD_ADOR_PASSWORD,
            connectString: process.env.PROD_ADOR_CONNECTION_STRING,
        });
        const result = await connection.execute(query, [], {
            outFormat: oracledb.OUT_FORMAT_OBJECT,
        });
        return result;
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
};

exports.NORMAL_ORACLE_MASTER_DEV = async (query) => {
    let connection;
    try {
        connection = await oracledb.getConnection({
            user: process.env.DEV_ADOR_USER,
            password: process.env.DEV_ADOR_PASSWORD,
            connectString: process.env.DEV_ADOR_CONNECTION_STRING,
        });
        const result = await connection.execute(query, [], {
            outFormat: oracledb.OUT_FORMAT_OBJECT,
        });
        return result;
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
};