load("./config.js");

print("Dumping (raw) records from `employees`: using encrypted session")
let records = db.employees.find().pretty()
while (records.hasNext()) {
   printjson(records.next());
}
print("\nDisabling session bypass for automatic encrypt/decrypt...\n")
const plainSession = new Mongo(CONN_STRING)
db = plainSession.getDB( demoDB );
print("Dumping records from `employees`: using plain session")
records = db.employees.find().pretty()
while (records.hasNext()) {
   printjson(records.next());
}
