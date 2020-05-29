import React, {useEffect, useState} from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import FormHelperText from "@material-ui/core/FormHelperText";
import './components.css';

const {useRef} = require("react");

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            timeout = null;
            func.apply(context, args);
        }, wait);
    };
}

export const ComparableFilter = (props) => {
    const {filter, addFilter} = props;
    const [filterParameters, setFilterParameters] = useState({
        key: filter.key,
        operator: '',
        value: '',
    });

    useEffect(() => {
            filterParameters.value !== 0 && filterParameters.operator !== '' && addFilter(filterParameters);
        }
        , [filterParameters]);


    function handleChange(name, value) {
        if (Number(value) < 0) {
            return alert("Regular price can not be smaller than 0");
        }
        setFilterParameters({
            ...filterParameters,
            [name]: (Number(value) ? Number(value) : value)
        });
    };
    return (
        <div className="filter">
            <FormLabel>Regular Price Comparator</FormLabel>

            <TextField id="value" name="value" type="Number" fullWidth value={filterParameters.value}
                       onChange={e => handleChange(e.target.name, e.target.value)}/>
            <FormControl fullWidth>
                <InputLabel id="operator">Operator</InputLabel>
                <Select
                    id="operator"
                    placeholder="Operator"
                    name="operator"
                    fullWidth
                    value={filterParameters.operator}
                    onChange={e => handleChange(e.target.name, e.target.value)}
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value={'equal'}>Equal</MenuItem>
                    <MenuItem value={'greater_than'}>Greater</MenuItem>
                    <MenuItem value={'smaller_than'}>Smaller</MenuItem>
                </Select>
            </FormControl>
            <FormHelperText>Enter price and operator to get items list accordingly</FormHelperText>
        </div>
    )
};

export const SearchableFilter = (props) => {
        const debounceOnChange = React.useCallback(debounce(handleChange, 500), []);
        const {filter, addFilter} = props;
        const [filterParameters, setFilterParameters] = useState({
            key: filter.key,
            operator: filter.operator,
            value: ''
        });

        useEffect(() => {
            addFilter(filterParameters)
        }, [filterParameters]);

        function handleChange(name, value) {
            setFilterParameters({
                ...filterParameters,
                [name]: value
            });
        };

        return (
            <div className="filter">
                <FormLabel htmlFor="brand" style={{marginBottom: 15}}>Search by brand name</FormLabel>
                <br/>
                <TextField
                    id="brand"
                    name="value"
                    fullWidth
                    placeholder={"Brand Names"}
                    onChange={e => debounceOnChange(e.target.name, e.target.value)}/>
                <FormHelperText>Enter brand name to get items list</FormHelperText>
            </div>
        )
    }
;

export const BooleanFilter = (props) => {
    const debounceOnChange = React.useCallback(debounce(handleChange, 500), []);
    const isFirstRun = useRef(true);
    const {filter, addFilter} = props;
    const [check, setCheck] = useState('');
    const [filterParameters, setFilterParameters] = useState({
        key: filter.key,
        operator: filter.operator,
        value: true
    });

    useEffect(() => {
            if (isFirstRun.current) {
                isFirstRun.current = false;
                return;
            }
            addFilter(filterParameters);
        }
        , [filterParameters]);

    function handleChange(name, value) {
        setFilterParameters({
            ...filterParameters,
            [name]: value === "a"
        });
        setCheck(value);
    };

    return (
        <div className="filter">
            <FormControl component="fieldset">
                <FormLabel>Stock Availability</FormLabel>
                <RadioGroup aria-label="gender" name="value" value={check} onChange={handleChange}
                            style={{display: "inline"}}>
                    <FormControlLabel value="a" onChange={e => debounceOnChange(e.target.name, e.target.value)}
                                      control={<Radio/>} label="In Stock"/>
                    <FormControlLabel value="b" onChange={e => debounceOnChange(e.target.name, e.target.value)}
                                      control={<Radio/>} label="Out of Stock"/>
                </RadioGroup>
                <FormHelperText>Choose option to know stock availability</FormHelperText>
            </FormControl>
        </div>
    )
};


export const DateInRangeFilter = (props) => {
    const {filter, addFilter} = props;
    const [filterParameters, setFilterParameters] = useState({
        key: filter.key,
        operator: filter.operator,
        value: [new Date('Aug 26 2018'), new Date('28 Aug 2019')]
    });
    const isFirstRun = useRef(true);
    console.log(isFirstRun);
    useEffect(() => {
            if (isFirstRun.current) {
                isFirstRun.current = false;
                return;
            }
            addFilter(filterParameters);
        }
        , [filterParameters]);

    const handleChange = (date, type) => {
        if (date > new Date()) {
            return alert("Future dates are not allowed")
        }
        if (type === 'end' && filterParameters.value[0] > date) {
            return alert("End date should be greater than the start date");
        }
        const updatedDates = {...filterParameters};
        const updatedDateArray = updatedDates.value;
        console.log(updatedDateArray);
        if (type === 'start') {
            updatedDateArray[0] = new Date(date.toDateString());
        } else {
            updatedDateArray[1] = new Date(date.toDateString());
        }
        updatedDateArray.length == 2 && setFilterParameters({
            ...filterParameters,
            value: updatedDateArray
        });
    };

    return (
        <div style={{padding: 20}}>
            <FormControl>
                <FormLabel>Created At</FormLabel>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container spacing={1}>
                        <Grid item xs style={{minWidth: 120}}>
                            <KeyboardDatePicker
                                margin="normal"
                                label="Start Date"
                                format="dd MMM yyyy"
                                value={filterParameters.value[0]}
                                onChange={(date) => handleChange(date, 'start')}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                        <Grid item xs style={{minWidth: 120}}>
                            <KeyboardDatePicker
                                margin="normal"
                                label="End Date"
                                format="dd MMM yyyy"
                                value={filterParameters.value[1]}
                                onChange={(date) => handleChange(date, 'end')}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </Grid>
                </MuiPickersUtilsProvider>
                <FormHelperText id="my-helper-text">Enter date range to get items list</FormHelperText>
            </FormControl>
        </div>
    );
};
