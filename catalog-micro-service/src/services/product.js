const {ObjectId} = require("mongodb");
const connection = require("../utils/connection");
const db = process.env.MONGO_DB;

async function getProduct(req, res) {
    try {
        let client = await connection.createConnection();
        let dbo = client.db(db);
        let collection = dbo.collection('product'); 
        let query = {};
        if(req.query.catagory_id) query.catagory_id = new ObjectId(req.query.catagory_id);
        let result = await collection.find(query).toArray();
        connection.closeConnection(client);
        res.status(200).json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}

async function postProduct(req, res) {
    let data = req.body;
    try {
        let client = await connection.createConnection();
        let dbo = client.db(db);
        let collection = dbo.collection('product');
        await collection.insertOne({
            catagory_id: new ObjectId(data.catagory_id),
            product_name: data.product_name,
            product_price: data.product_price,
            currency_type: data.currency_type,
            product_qty: data.product_qty,
            qty_type: data.qty_type,
            product_image: data.product_image,
            created_date: new Date()
        });
        connection.closeConnection(client);
        res.status(200).json({ success: true, message: "Created successfully" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}

module.exports = {
    getProduct: getProduct,
    postProduct: postProduct
}