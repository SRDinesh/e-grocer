const {ObjectId} = require("mongodb");
const connection = require("../utils/connection");
const db = process.env.MONGO_DB;
const bcrypt = require('bcrypt');

async function getUser(req, res) {
    try {
        let client = await connection.createConnection();
        let dbo = client.db(db);
        let collection = dbo.collection('user');
        let result = await collection.findOne({_id: new ObjectId(req.query.id)});
        connection.closeConnection(client);
        if(result){
            delete result.password;
        }        
        res.status(200).json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}

async function createUser(req, res) {
    let data = req.body;
    try {
        let client = await connection.createConnection();
        let dbo = client.db(db);
        let collection = dbo.collection('user');
        await collection.insertOne({
            user_name: data.user_name,
            email: data.email,
            password: bcrypt.hashSync(data.password, 10),
            mobile_number: data.mobile_number,
            created_date: new Date()
        });
        connection.closeConnection(client);
        res.status(200).json({ success: true, message: "Created successfully" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}
 
module.exports = {
    getUser: getUser,
    createUser: createUser
}