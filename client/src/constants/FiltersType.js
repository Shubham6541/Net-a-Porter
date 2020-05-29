export const filterType =
    [
        {
            type: 'comparable',
            label: 'Enter Discount',
            key: 'regular_price',
            value: 0,
            operator: ''
        },
        {
            type: 'searchable',
            label: 'Enter Brand Name',
            key: 'brand',
            value: '',
            operator: 'contains',
        },
        {
            type: 'boolean',
            label: ['Stock Availability', 'In stock', 'out of stock'],
            key: 'stock_available',
            value: false,
            operator: 'equals'
        },
        {
            type: 'dateInRange',
            label: ['Created At', 'Start date', 'End Date'],
            key: 'created_at',
            value: [],
            operator: 'between'
        }
    ];
