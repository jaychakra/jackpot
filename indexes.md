# Bootstrapping
mongoimport ./DataSet/people.json
mongoimport ./DataSet/restaurants.json



# Explain Plan
* Is your query using the index you expect
* Is your query using an index to provide sort
* Is your query using an index to provide the projection
* How selective is your index
* Which part of the plan is most selective

## Levels
* queryPlanner (Default)
* executionStats
* allPlanExecution

## Base Keywords to explain
* winningPlan
* rejectedPlans
* nReturned
* totalKeysExamined
* totalDocsExamined
* ExecutionStages
    * COLLSCAN
    * IXSCAN
* works


### Example
```
use test
db.people.find({}).explain()
db.people.find({}).explain("queryPlanner")
db.people.find({}).explain("executionStats")
db.people.find({}).explain("allPlansExecution")
```

People Object
```
{
	"_id" : ObjectId("57d7a121fa937f710a7d4879"),
	"last_name" : "Tucker",
	"quote" : "Enim rerum perspiciatis pariatur ipsam sed.",
	"job" : "Scientist, forensic",
	"ssn" : "333-53-2162",
	"address" : {
		"city" : "Lake Meaganton",
		"state" : "Idaho",
		"street" : "9307 Christopher Street Suite 319",
		"zip" : "10914-3394"
	},
	"first_name" : "Kristine",
	"company_id" : ObjectId("57d7a121fa937f710a7d486d"),
	"employer" : "Terry and Sons",
	"birthday" : ISODate("2011-05-15T20:25:42Z"),
	"email" : "usalazar@yahoo.com"
}
```

# Skip and Limit Recommendation

Find a document using only limit
```
db.people.find({birthday: {$gte: IsoDate("2010-05-15")}}).limit(1).explain(2)
```

Use Skip + Limit
```
db.people.find({birthday: {$gte: ISODate("2016-01-15")}}).limit(1).skip(10).explain(2)
```

Create Index And see the impact
```
db.people.createIndex({birthday:1})

db.people.find({birthday: {$gte: ISODate("2016-01-15")}}).limit(1).skip(10).explain(2)

db.people.dropIndex({birthday:1})
```
Still, there needs to be index traversal. This could be eliminated by using sort column

# Compound Indexes & ESR Rule
* Compound Index can be used to satisfy multiple queries
* Order of keys in indexes are important
* Selectivity, most selectivity at the earliest point in the B-Tree
    * Ex: Query like {a:1, status: true}, you have to choose just one index, which one will you choose
* ESR 
    * ESR can't be fool proof, it could be a general recommendation but it is always advisable to test it through the explain plan before proceeding
* Index Statistics
    * indexStats() command
* Covered Queries
    * It will not show a fetch stage

* Selectivity + ESR


## Case of redundant indexes
### show by using hint

# Indexes usage with OR
## Impact due tro predicate

# Predicate Searches with regex

Simple RegEx
```
db.people.find({"last_name":/u/}, {_id:0, last_name:1}).explain(2)
```

Create an Index on name then see the response again
```
db.people.createIndex({"last_name": 1})
```

What if this is a prefixed query
```
db.people.find({"last_name":/^T/}, {_id:0, last_name:1}).explain(2)
```

What if it is case insensitive
```
db.people.find({"last_name":/^u/i}, {_id:0, last_name:1}).explain(2)
```

Text Indexes
* Works a bit differently
* One per collection
* Concept of Tokenisation using suffix stemming
* Doesn't support Regex

```
db.people.createIndex(
   {
     first_name: "text",
     last_name: "text",
     quote: "text",
     job: "text"
   }
 )
```

Ex:
```
db.people.find( { $text: { $search: "Tucker" } }, {_id:0, last_name:1} ).explain(2)


```


## Atlas ngram

## Array Indexes








