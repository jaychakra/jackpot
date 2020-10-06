# Bootstrapping
mongoimport ~/Downloads/people.json
mongoimport ~/Downloads/restaurants.json

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
Still there needs to be index traversal. This could be eliminated by using sort column

# Compound Indexes & ESR Rule
## Case of redundant indexes
### show by using hint

# Indexes usage with OR
## Impact due tro predicate

# Predicate Searches with regex

## Atlas ngram








