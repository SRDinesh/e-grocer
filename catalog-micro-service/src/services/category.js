const {ObjectId} = require("mongodb");
const connection = require("../utils/connection");
const db = process.env.MONGO_DB;

async function getCategory(req, res) {
    try {
        let client = await connection.createConnection();
        let dbo = client.db(db);
        let collection = dbo.collection('category');
        let result = await collection.find({}).toArray();
        connection.closeConnection(client);
        res.status(200).json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}

async function postCategory(req, res) {
    let data = req.body;
    try {
        let client = await connection.createConnection();
        let dbo = client.db(db);
        let collection = dbo.collection('category');
        await collection.insertOne({
            category_name: data.category_name,
            created_date: new Date()
        });
        connection.closeConnection(client);
        res.status(200).json({ success: true, message: "Created successfully" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}

async function updateCategory(req, res) {
    let data = req.body;
    try {
        let client = await connection.createConnection();
        let dbo = client.db(db);
        let collection = dbo.collection('category');
        await collection.updateOne(
            {_id: new ObjectId(data.id)},
            {$set: {
                category_name: data.category_name,
                updated_date: new Date()
            }},
            { upsert: true }
        );
        connection.closeConnection(client);
        res.status(200).json({ success: true, message: "Updated successfully" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}

async function deleteCategory(req, res) {
    let id = req.params.id;
    try {
        let client = await connection.createConnection();
        let dbo = client.db(db);
        let collection = dbo.collection('category');
        await collection.deleteOne(
            {_id: new ObjectId(id)}
        );
        connection.closeConnection(client);
        res.status(200).json({ success: true, message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}

module.exports = {
    getCategory: getCategory,
    postCategory: postCategory,
    updateCategory: updateCategory,
    deleteCategory: deleteCategory
}