const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://root:root@realm.qo3dr.mongodb.net";

const search = async (pipeline) => {
    const client = new MongoClient(uri);

    await client.connect();
    const db = client.db("sample_mflix");
    const movies = db.collection('movies');

    const results = await movies.aggregate(pipeline)

    while(await results.hasNext()) {
        console.log(await results.next());
    }
    client.close();
}

module.exports = search;

