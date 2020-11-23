load("./config.js");
// Part 2: Schema Configurations
print("Setting server-side json schema for automatic encryption on `employees` collection...")
db.createCollection("employees")

db.runCommand({
   collMod: "employees",
   validator: {
      $jsonSchema: {
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
         }
      }
   }
})

//print("Updating FLE mode session to enable server- and client-side json schema for automatic encryption...")
clientSideFLEOptions = {
   kmsProviders: { local: MASTER_KEY },
   keyVaultNamespace: demoDB + "." + keyVaultColl
}

encryptedSession = new Mongo(CONN_STRING, clientSideFLEOptions)
db = encryptedSession.getDB( demoDB );
print("Attempting to insert sample document with automatic encryption...")
let res = null
try {
 res = db.employees.insert({
   firstName: 'Grace',
   lastName:  'Hopper -  Automatic Encryption',
   ssn: "901-01-0001",
   dob: new Date('1989-12-13'),
   address: {
      street: '123 Main Street',
      city:   'Omaha',
      state:  'Nebraska',
      zip:    '90210'
   },
   contact: {
      mobile: '202-555-1212',
      email:  'grace@example.com',
   }
  })
} catch (err) {
   res = err
}
print("Result: " + res)