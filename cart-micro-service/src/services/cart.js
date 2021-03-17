const { ObjectId } = require("mongodb");
const connection = require("../utils/connection");
const db = process.env.MONGO_DB;

async function listCart(req, res) {
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
        connection.closeConnection(client);
        res.status(200).json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}

async function addCart(req, res) {
    let data = req.body;
    try {
        let client = await connection.createConnection();
        let dbo = client.db(db);
        let collection = dbo.collection('cart');
        let query = {};
        if (data.user_id) query.user_id = new ObjectId(data.user_id);
        if (data.product_id) query.product_id = new ObjectId(data.product_id);
        let checkItems = await collection.findOne(query);
        if (checkItems) {
            await collection.updateOne(
                { _id: new ObjectId(checkItems.id) },
                {
                    $set: {
                        qty: checkItems.qty + 1,
                        updated_date: new Date()
                    }
                },
                { upsert: true }
            );
            connection.closeConnection(client);
            res.status(200).json({ success: true, message: "Added to the cart successfully" });
        } else {
            await collection.insertOne({
                user_id: new ObjectId(data.user_id),
                product_id: new ObjectId(data.product_id),
                qty: data.qty,
                created_date: new Date()
            });
            connection.closeConnection(client);
            res.status(200).json({ success: true, message: "Added to the  cart successfully" });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}

async function removeQty(req, res) {
    try {
        let client = await connection.createConnection();
        let dbo = client.db(db);
        let collection = dbo.collection('cart');
        let query = {};
        if (req.query.cart_id) query._id = new ObjectId(req.query.cart_id);
        let checkItems = await collection.findOne(query);
        if (checkItems) {
            await collection.updateOne(
                { _id: new ObjectId(checkItems.id) },
                {
                    $set: {
                        qty: checkItems.qty - 1,
                        updated_date: new Date()
                    }
                },
                { upsert: true }
            );
            connection.closeConnection(client);
            res.status(200).json({ success: true, message: "Updated to the cart successfully" });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}

async function deleteItem(req, res) {
    let cart_id = req.params.cart_id;
    try {
        let client = await connection.createConnection();
        let dbo = client.db(db);
        let collection = dbo.collection('cart');
        await collection.deleteOne(
            {_id: new ObjectId(cart_id)}
        );
        connection.closeConnection(client);
        res.status(200).json({ success: true, message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}

module.exports = {
    listCart: listCart,
    addCart: addCart,
    removeQty: removeQty,
    deleteItem: deleteItem
}