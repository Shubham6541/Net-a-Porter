import React from 'react';
import Card from "@material-ui/core/Card";
import {makeStyles} from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import './components.css';
import Divider from "@material-ui/core/Divider";

const CardMedia = React.lazy(() => import('@material-ui/core/CardMedia'));

const useStyles = makeStyles({
    root: {
        height: 450,
        borderRadius: 10
    },
});

const CardBack = (props) => {
    const classes = useStyles();
    const {info} = props;
    return (<div className="card-side side-back">
            <div className='container-fluid'>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography>
                            {info.description_text}
                        </Typography>
                        <Divider/>
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
                        height="280"
                        image={info.media.standard[0].url}
                        title="Item"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2">
                            {info.name}
                        </Typography>
                        <Typography variant="h5" color="textSecondary" component="h4"
                                    style={{bottom: 0, position: "relative"}}>
                            {info.brand.name}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

const ProductDetails = (props) => {
    console.log(props.info);
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
