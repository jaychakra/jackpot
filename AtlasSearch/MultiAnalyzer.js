const search = require('./Util');

const pipeline = [
    {
        $search: {
            "text": {
                "query": "The Count of Monte Cristo",
                "path": { "value": "title", "multi": "keywordAnalyzer" }
            }
        }
    },
    {
        $project: {
            "title": 1,
            "year": 1,
            "_id": 0
        }
    }
]

search(pipeline);
