
exports.listParamsMiddleware = function (req, res, next) {
    const sort = JSON.parse(req.query.sort);
    const sortField = sort[0];
    const sortOrder = sort[1];
    const range = JSON.parse(req.query.range);
    const rangeStart = range[0];
    const rangeEnd = range[1] + 1;
    const filters = JSON.parse(req.query.filter);
    const regexFilters = Object.keys(filters).reduce((result, key) => {
        if (key == 'creationDate') {
            let creationDate = new Date(filters[key])
            creationDate.setHours(0, 0, 0, 0);
            result[key] = {
                "$eq": creationDate
            }
        }
        else {
            result[key] = {
                "$regex": filters[key],
                "$options": "i"
            }
        }
        return result
    }, {});
    req.listParams = {
        sortField, sortOrder,
        rangeStart, rangeEnd,
        filter: regexFilters
    };
    next();
}