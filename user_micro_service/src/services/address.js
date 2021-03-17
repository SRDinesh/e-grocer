const {ObjectId} = require("mongodb");
const connection = require("../utils/connection");
const db = process.env.MONGO_DB;

async function getAddress(req, res) {
    try {
        let client = await connection.createConnection();
        let dbo = client.db(db);
        let collection = dbo.collection('address'); 
        let query = {};
        if(req.query.user_id) query.user_id = new ObjectId(req.query.user_id);
        let result = await collection.find(query).toArray();
        connection.closeConnection(client);
        res.status(200).json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}

async function postAddress(req, res) {
    let data = req.body;
    try {
        let client = await connection.createConnection();
        let dbo = client.db(db);
        let collection = dbo.collection('address');
        await collection.insertOne({
            user_id: new ObjectId(data.user_id),
            address1: data.address1,
            address2: data.address2,
            city: data.city,
            state: data.state,
            country: data.country,
            pin_code: data.pin_code,
            land_mark: data.land_mark,
            created_date: new Date()
        });
        connection.closeConnection(client);
        res.status(200).json({ success: true, message: "Created successfully" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}

module.exports = {
    getAddress: getAddress,
    postAddress: postAddress
}