const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://U:P@D?writeConcern=majority";

const test = async () => {
    console.log("Initializing");
    const client = new MongoClient(uri);

    await client.connect();
    const database = client.db("sample_mflix");
    const collection = database.collection("movies");

    let newChangeStream = collection.watch({ resumeAfter: {"_data":"8260218058000000012B022C0100296E5A10042EDE84BCC5A54CEAAC03A00226C5A42346645F69640064602180569CC60730BBE4FCE40004"}});
    newChangeStream.on('change', next => {
        console.log(next);
    });

}

test();

