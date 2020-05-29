import React from 'react';
import Card from "@material-ui/core/Card";
import {makeStyles} from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import './components.css';
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";

const CardMedia = React.lazy(() => import('@material-ui/core/CardMedia'));

const useStyles = makeStyles({
    root: {
        height: 450,
        borderRadius: 10,
        minWidth: 290,
        backgroundColor: '#fffff1'
    },
    backside: {
        margin: 20,
        padding: 5
    },
    regular: {
        color: 'white',
        backgroundColor: '#F947A2',
        marginTop: 18,
        textDecorationLine: "line-through",
        textDecorationColor: "black",
        textDecorationThickness: "solid",
        width: 200
    },
    offer: {
        color: 'black',
        backgroundColor: '#7FFF80',
        marginTop: 12,
        width: 200
    }
});

//Back side of product item
const CardBack = (props) => {
    const classes = useStyles();
    const {info} = props;
    return (<div className="card-side side-back">
            <div className='container-fluid'>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography className={classes.backside}>
                            {info.description_text}
                        </Typography>
                        <Divider/>
                        {info.stock.available ?
                            <Typography variant="h5" color="textSecondary" component="h4">
                                Available In Stock
                            </Typography> :
                            <Typography variant="h5" color="textSecondary" component="h4">
                                Out Of Stock
                            </Typography>}
                        <Divider/>
                        <Typography className={classes.backside}>
                            Created at: {new Date(info.created_at).toDateString()}
                        </Typography>
                        <Divider/>
                        <Chip
                            label={"Regular Price: " + info.price.regular_price.value + " " + info.price.regular_price.currency}
                            className={classes.regular}/>
                        <Chip
                            label={"Offer Price  : " + info.price.offer_price.value + " " + info.price.offer_price.currency}
                            className={classes.offer}/>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
};

//Front side of product item
const CardFront = (props) => {
    const {info} = props;
    const classes = useStyles();
    return (
        <div className="card-side side-front">
            <div>
                <Card className={classes.root}>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="280"
                        image={info.media.standard[0].url}
                        title="Item"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2">
                            {info.name.substring(0, 65)}
                        </Typography>
                        <Typography variant="h5" color="textSecondary" component="h4" align={"center"}
                                    style={{marginBottom: 0}}>
                            {info.brand.name.toUpperCase().substring(0, 25)}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

//Details of product item
const ProductDetails = (props) => {
    return (
        <div className='card-container'>
            <div className='card-body'>
                <CardBack info={props.info}/>
                <CardFront info={props.info}/>
            </div>
        </div>
    )
};

export default ProductDetails;
