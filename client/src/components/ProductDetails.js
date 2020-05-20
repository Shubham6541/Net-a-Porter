import React from 'react';
import Card from "@material-ui/core/Card";
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import './components.css';
const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        minWidth:300,
        height: 450,
        borderRadius:8
    },
});

const CardBack = () => {
    const classes = useStyles()
    return (<div className="card-side side-back">
        <div className='container-fluid'>
            <Card className={classes.root}>
                <CardContent>
                    <Typography>
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                </CardContent>
            </Card>
        </div>
        </div>
    )
};


const CardFront = (props) => {
    const {info} = props;
    const classes = useStyles();
    return (

                <div className="card-side side-front">
                    <div className='container-fluid'>
            <Card className={classes.root}>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="300"
                    image={info.url}
                    title="Item"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {info.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                </CardContent>
            </Card>
                </div>
                </div>

    );
};

const ProductDetails = (props) =>{
    return(
        <Grid item xs>
        <div className='card-container'>
            <div className='card-body'>
                <CardFront info={props.info}/>
                <CardBack />
            </div>
        </div>
        </Grid>
    )
};

export default ProductDetails;