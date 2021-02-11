const search = require('./Util');

const pipeline = [
    {
        $search: {
            "compound": {
                "must": [ {
                    "text": {
                        "query": ["Hawaii", "Alaska"],
                        "path": "plot"
                    },
                },
                {
                    "regex": {
                        "query": "([0-9]{4})",
                        "path": "plot",
                        "allowAnalyzedField": true
                    }
                } ],
                "mustNot": [ {
                    "text": {
                        "query": ["Comedy", "Romance"],
                        "path": "genres"
                    }
                },
                {
                    "text": {
                        "query": ["Beach", "Snow"],
                        "path": "title"
                    }
                } ]
            }
        }
    },
    {
        $project: {
            "title": 1,
            "plot": 1,
            "genres": 1,
            "_id": 0
        }
    }
];

search(pipeline);
