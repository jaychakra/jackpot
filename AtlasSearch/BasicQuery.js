const search = require('./Util');

const pipeline = [
    {
        $search: {
            "text": {
                "query": "baseball",
                "path": "plot"
            }
        }
    },
    {
        $limit: 5
    },
    {
        $project: {
            "_id": 0,
            "title": 1,
            "plot": 1
        }
    }
];

search(pipeline);
