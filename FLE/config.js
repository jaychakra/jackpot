const demoDB = "hr";
const keyVaultColl = "__keystore"  // nothing special about this key vault collection name, but make it stand out
const ENC_DETERM = 'AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic'
const ENC_RANDOM = 'AEAD_AES_256_CBC_HMAC_SHA_512-Random'
const CONN_STRING =  `mongodb+srv://${USER}:${PASS}@${HOST}/?retryWrites=true&w=majority`

const BASE64_KEY_STRING = "uvxce3FoH5x7XaRa+J1HpyfA40BhDiPmQDb7OCCHP/r8LRw7hBO2No51/SJ8dOnrnVu8mDqyIMv22RS15cmymvG4OYHa+ZeRFUcpbAk31wQS/fULq1Uc3FOP6wpIOw4s";

const MASTER_KEY = { key: BinData( 0, BASE64_KEY_STRING ) }
let clientSideFLEOptions = {
    kmsProviders : {  local : MASTER_KEY  } ,
    keyVaultNamespace: demoDB + "." + keyVaultColl
};

let encryptedSession = new Mongo(CONN_STRING, clientSideFLEOptions);
let db = encryptedSession.getDB( demoDB )

// Uncomment to remove any data that may be prevalent in the collection
 db.getCollectionNames().forEach(function(c){db.getCollection(c).drop()});

print("Attempting to create field keys...")
const keyVault = encryptedSession.getKeyVault();
keyVault.createKey("local", "", ["fieldKey1"])
keyVault.createKey("local", "", ["fieldKey2"])

print("Attempting to retrieve field keys...")
const key1 = db.getCollection( keyVaultColl ).find({ keyAltNames: 'fieldKey1' }).toArray()[0]._id
const key2 = db.getCollection( keyVaultColl ).find({ keyAltNames: 'fieldKey2' }).toArray()[0]._id
