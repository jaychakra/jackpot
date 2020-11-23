load("./config.js");

print("Attempting to insert sample document with explicit encryption...")
let res = null
try{
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
print("Result: " + res)