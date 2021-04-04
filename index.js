const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 80
const { MongoClient } = require('mongodb');
const DATABASE_NAME = 'test';       
const DB_URI = "mongodb://mongows:27017/${DATABASE_NAME}";
const client = new MongoClient(DB_URI);
async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        // just a test to see if it's working
        let adminDb = client.db("admin")
        await adminDb.command({ ping: 1 });
        console.log("Connected successfully to server");
        // print list of databases available to console.
        let listdb = await  adminDb.command( { listDatabases: 1 } );
        console.log(listdb)

    } catch (e) {
        console.error(e);
    }
}
main().catch(console.error);
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/submit_figure', (req, res) => {
    console.log(req.body)
    db.users.insert(req.body)
    
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

