const MongoClient = require('mongodb').MongoClient;
const url = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;

async function createConnection() {
    try {
        let client = await MongoClient.connect(url,{ useUnifiedTopology: true});
        console.log("Connected successfully to mongo server");
        return client;
    } catch (err) {
        throw err;
    }
}

function closeConnection(client){
    client.close();
}

module.exports = {
    createConnection: createConnection,
    closeConnection: closeConnection
}