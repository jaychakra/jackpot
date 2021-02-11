const search = require('./Util');

const pipeline = [
    {
        $search: {
            "text": {
                "query": "Helsinki",
                "path": "plot",
                "score": { "boost": { "value": 3 } }
            }
        }
    },
    {
        $project: {
            plot: 1,
            title: 1,
            score: { $meta: "searchScore" }
        }
    }
]

search(pipeline);
