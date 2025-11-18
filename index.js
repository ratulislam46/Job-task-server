const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 3000

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ibgq1ve.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const usersDataCollection = client.db('studen-hub').collection("userData");

        app.post('/users-data', async (req, res) => {
            const data = req.body;
            // console.log(data);
            const result = await usersDataCollection.insertOne(data);
            res.send(result)
        })

        app.get('/all-users-data', async (req, res) => {
            try {
                const users = await usersDataCollection.find().toArray();
                res.send(users);
            } catch (error) {
                console.error(error);
                res.send({ message: "Internal Server Error" });
            }
        });

        app.get('/', (req, res) => {
            res.send('6 senses server side is running.');
        });

        app.listen(port, () => {
            console.log(`Server is listening on port ${port}!`);
        });
    }
    finally {
    }
}
run().catch(console.dir);