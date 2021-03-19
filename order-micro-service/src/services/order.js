const { ObjectId } = require("mongodb");
const connection = require("../utils/connection");
const db = process.env.MONGO_DB;

async function orderCartItem(req, res) {
    try {
        let client = await connection.createConnection();
        let dbo = client.db(db);
        let collection = dbo.collection('cart');
        let query = {};
        if (req.query.user_id) query.user_id = new ObjectId(req.query.user_id);
        let response = await collection.find(query).toArray();
        let result = [];
        for(let item of response){
            let collection = dbo.collection('product');
            let product = await collection.findOne({_id: new ObjectId(item.product_id)});
            if(product){
                item.productDetail = product;
                result.push(item);
            }
        }
        await collection.insertMany(result);
        connection.closeConnection(client);
        res.status(200).json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}

module.exports = {
    orderCartItem: orderCartItem
}