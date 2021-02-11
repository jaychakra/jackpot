const search = require('./Util');

const pipeline = [
    {
        $search: {
            "text": {
                "query": "Helsinki",
                "path": "plot"
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
