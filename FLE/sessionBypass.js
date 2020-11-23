load("./config.js");

const employeesSchema = {
   "hr.emp": {
      "bsonType": "object",
      "properties": {
         "ssn": {
            "encrypt": {
               "bsonType": "string",
               "algorithm": ENC_DETERM,
               "keyId": [ key1 ]
            }
         },
         "dob": {
            "encrypt": {
               "bsonType": "date",
               "algorithm": ENC_RANDOM,
               "keyId": [ key1 ]
            }
         },
         "contact": {
            "bsonType": "object",
            "properties": {
               "email": {
                  "encrypt": {
                     "bsonType": "string",
                     "algorithm": ENC_DETERM,
                     "keyId": [ key2 ]
                  }
               },
               "mobile": {
                  "encrypt": {
                     "bsonType": "string",
                     "algorithm": ENC_DETERM,
                     "keyId": [ key2 ]
                  }
               }
            },
         },
      }
   }
}

print("\nEnabling session bypass on automatic encrypt/decrypt... \n")
clientSideFLEOptions = {
   "kmsProviders": { "local": MASTER_KEY },
   bypassAutoEncryption: true,
   schemaMap: employeesSchema,
   keyVaultNamespace: demoDB + "." + keyVaultColl
}
encryptedSession = new Mongo(CONN_STRING, clientSideFLEOptions)
db = encryptedSession.getDB( demoDB );
print("Attempting to insert sample document with explicit encryption...")
try{
  let res = null
  res = db.employees.insert({
   firstName: 'Alan',
   lastName:  'Turing',
   ssn: db.getMongo().encrypt( key1 , "901-01-0002" , ENC_DETERM ),
   dob: db.getMongo().encrypt( key1 , new Date('1912-06-23'), ENC_RANDOM ),
   address: {
      street: '123 Oak Lane',
      city:   'Cleveland',
      state:  'Ohio',
      zip:    '90210'
   },
   contact: {
      mobile: db.getMongo().encrypt( key2 , '202-555-1234', ENC_DETERM ),
      email:  db.getMongo().encrypt( key2 , 'alan@example.net', ENC_DETERM ),
   }
 })
} catch (err) {
   res = err
}