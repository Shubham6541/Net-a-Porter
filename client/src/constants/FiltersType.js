export const filterType =
    [
        {
            formLabel: 'Regular Price Comparator',
            type: 'comparable',
            label: 'Regular price',
            key: 'regular_price',
            value: 0,
            operator: ''
        },
        {
            formLabel: 'Search by Brand Name',
            type: 'searchable',
            label: 'Brand Name',
            key: 'brand',
            value: '',
            operator: 'contains',
        },
        {
            formLabel: 'Stock Availability',
            type: 'boolean',
            label: ['In stock', 'out of stock'],
            key: 'stock_available',
            value: false,
            operator: 'equals'
        },
        {
            formLabel: 'Created Between',
            type: 'dateInRange',
            label: ['Start date', 'End Date'],
            key: 'created_at',
            value: [],
            operator: 'between',
            helperText: 'Enter date range to get items list'
        }
    ];
