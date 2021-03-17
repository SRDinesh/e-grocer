const connection = require("../utils/connection");
const db = process.env.MONGO_DB;
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

async function login(req, res) {
    let data = req.body;
    try {
        if(!data.password || (!data.email && !data.mobile_number)){
            return res.status(400).json({ success: false, error: "Bad request" });
        }

        let client = await connection.createConnection();
        let dbo = client.db(db);
        let collection = dbo.collection('user'); 
        let query = {};
        if(data.email) query.email = data.email;
        if(data.mobile_number) query.mobile_number = data.mobile_number;
        let result = await collection.findOne(query);
        connection.closeConnection(client);
        if(result){
            let comparePassword = bcrypt.compareSync(data.password, result.password);
            if(comparePassword){
                let getToken = jwt.sign({ email:result.email,mobile_number:result.mobile_number }, 'secret');
                delete result.password;
                result.token = getToken;
                res.status(200).json({ success: true, message: "Logged in successfully", data: result });
            }else{
                res.status(400).json({ success: false, error: "Invalid credentials" });
            }
        }else{
            res.status(400).json({ success: false, error: "Invalid credentials" });
        }        
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}

module.exports = {
    login: login
}