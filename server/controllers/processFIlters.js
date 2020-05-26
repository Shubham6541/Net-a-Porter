//key name and their respective data items
const query_parameters = {
    'discount': 'price.offer_price.value',
    'brand': 'brand.name',
    'stock_available': 'stock.available',
    'created_at': 'created_at'
};
//operator name and their regex equations
const handle_operator = (operator, value) => {
    const query_operators = {
        'greater_than': {$gt: value},
        'smaller_than': {$lt: value},
        'equals': {$eq: value},
        'contains': {$regex: value},
        'between': {$gte: new Date(value[0]), $lte: new Date(value[1])}
    };
    return query_operators[operator];
};

//forming the query from the incoming filters, which will further be used to get the data from the database
module.exports = processFilters = async (filters) => {
    const query = {};
    await filters.forEach((filter) => {
        const {key, operator, value} = filter;
        if (query_parameters[key] && operator && value) {
            query[query_parameters[key]] = handle_operator(operator, value);
        }
    });
    return query;
};

