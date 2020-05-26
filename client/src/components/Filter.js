import React, {useEffect, useState} from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import {filterType} from '../constants/FIltersType';

const Comparable = (props) => {
    const {handleChange} = props;
    return (
        <div style={{padding: 5}}>
            <TextField name="value" fullWidth placeholder={"Regular Price "} onChange={handleChange}/>
            <FormControl fullWidth>
                <InputLabel id="demo-controlled-open-select-label">Operator</InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    name="operator"
                    fullWidth
                    onChange={handleChange}
                ><MenuItem value="">
                    <em>None</em>
                </MenuItem>
                    <MenuItem value={'equal'}>Equal</MenuItem>
                    <MenuItem value={'greater_than'}>Greater</MenuItem>
                    <MenuItem value={'smaller_than'}>Smaller</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
};


const Searchable = (props) => {
        const {filter, addFilter} = props;
        const [filterParameters, setFilterParameters] = useState({
            key: filter.key,
            operator: filter.operator,
            value: ''
        });

        useEffect(() => {
                addFilter(filterParameters);
            }
            , [filterParameters]);

        const handleChange = (e) => {
            setFilterParameters({
                ...filterParameters,
                [e.target.name]: e.target.value
            });
        };

        return (
            <div style={{padding: 10}}>
                <TextField
                    id="brand"
                    name="value"
                    fullWidth
                    placeholder={"Brand Names"}
                    onChange={handleChange}/>
            </div>
        )
    }
;

const Checkable = (props) => {
    const {filter, addFilter} = props;
    const [filterParameters, setFilterParameters] = useState({
        key: filter.key,
        operator: filter.operator,
        value: true
    });

    useEffect(() => {
            addFilter(filterParameters);
        }
        , [filterParameters]);

    const handleChange = (e) => {
        setFilterParameters({
            ...filterParameters,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div style={{padding: 10}}>
            <FormControl component="fieldset">
                <FormLabel component="legend">Stock Availability</FormLabel>
                <RadioGroup aria-label="gender" name="value" value={filterParameters.value} onChange={handleChange}>
                    <FormControlLabel value={true} onChange={handleChange} control={<Radio checked={filterParameters===true}/>} label="In Stock"/>
                    <FormControlLabel value={false} onChange={handleChange} control={<Radio checked={filterParameters===false}/>} label="Out of Stock"/>
                </RadioGroup>
            </FormControl>
        </div>
    )
};

const DateInRange = (props) => {
    const {filter, addFilter} = props;
    const [filterParameters, setFilterParameters] = useState({
        key: filter.key,
        operator: filter.operator,
        value:    [new Date('Tue Aug 26 2014 21:11:00 GMT+0530'),new Date()]

});

    useEffect(() => {
            addFilter(filterParameters);
        }
        , [filterParameters]);

    const handleChange = (date) => {
        let updateDateArray = {...filterParameters};
        let updateDateArray1 = [...updateDateArray.value];
        updateDateArray1[1] = new Date(date.toDateString());
        setFilterParameters({
            ...filterParameters,
            value:[updateDateArray1]
        });
    };

    return (
        <div style={{padding: 20}}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container spacing={1}>
                    <Grid item xs>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Start Date"
                            format="dd MMM yyyy"
                            value={filterParameters.value[0]}
                            onChange={(date)=>handleChange(date,'start')}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                    <Grid item xs>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            name="value[1]"
                            label="End Date"
                            format="dd MMM yyyy"
                            value={filterParameters.value[1]}
                            onChange={(date)=>handleChange(date,'start')}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                </Grid>
            </MuiPickersUtilsProvider>
        </div>
    );
};

const Filter = (props) => {
    const {addFilter} = props;

    const applyFilter = (filter) => {
        console.log(filter.key);
        const handleFilter = async (addfilter1) => {

            console.log(addfilter1);
            await addFilter(addfilter1);
        };

        switch (filter.type) {
            case "comparable":
                return <Comparable filter={filter} addFilter={handleFilter}/>;
            case "searchable":
                return <Searchable filter={filter} addFilter={handleFilter}/>;
            case "boolean":
                return <Checkable filter={filter} addFilter={handleFilter}/>;
            case "dateInRange":
                return <DateInRange filter={filter} addFilter={handleFilter}/>;
        }
    };

    return (
        <div style={{marginTop: 50, padding: 20}}>
            {filterType.map((filter) => applyFilter(filter)
            )}
        </div>
    );
};

export default Filter;
