# Introduction
This code sample demonstrates the working of Client side field level encryption offered by MongoDB

These are categorised into 3 parts

* Automatic Encryption
* Explicit Encryption
* Impact on reads

Please make sure that you have the latest mongo shell installed. It has been tested on `4.2.x` and `4.4.x`
 
### Automatic Encryption
The details of the code are present in the `automatic.js`. In automatic encryption, the details of the encryption are stored in schema itself. This method of encryption needs little change to existing code for implementing Client Side Field Level encryption. 

It can be executed by running the below script. Please replace the `USER`, `PASS` and `HOST` credentials with the available ones. 

```
mongo --eval "const USER = 'sampleUser'; const PASS='samplePass'; const HOST='sample.mongodb.net';" --nodb automatic.js 
``` 

### Explicit Encryption
The details of the code are present in the `explicit.js`. In explicit encryption, the details of the encryption passed with every key being saved in the DB. This method of encryption needs a lot of change to existing code for implementing Client Side Field Level encryption. 

It can be executed by running the below script. Please replace the `USER`, `PASS` and `HOST` credentials with the available ones. 

```
mongo --eval "const USER = 'sampleUser'; const PASS='samplePass'; const HOST='sample.mongodb.net';" --nodb explicit.js 
```

### Impacts on Reads
The details of the code are present in the `read.js`. In this demo it is shown that without the encryption keys, it is impossible to decrypt data at the client side. 

It can be executed by running the below script. Please replace the `USER`, `PASS` and `HOST` credentials with the available ones. 

```
mongo --eval "const USER = 'sampleUser'; const PASS='samplePass'; const HOST='sample.mongodb.net';" --nodb read.js 
```