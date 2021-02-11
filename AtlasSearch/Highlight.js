const search = require('./Util');

const pipeline = [
    {
        $search: {
            "text": {
                "query": "Helsinki",
                "path": "plot"
            },
            "highlight": {
                "path": "plot"
            }
        }
    },
    {
        $limit: 5
    },
    {
        $project: {
            plot: 1,
            title: 1,
            highlights: { "$meta": "searchHighlights" }
        }
    }
]

search(pipeline);
