import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import { Grid, Stack, Button, Typography, Card, CardActionArea, CardMedia, CardContent, CardActions } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const useStyles = makeStyles((theme) =>
    createStyles({
        typograpy:{
            fontWeight: 600
        }

    }),
);


const Cards = props => {

    const {
        product,
        brand,
        category,
        model,
        sub_category,
        composition,
        uom,
    } = props

    const classes = useStyles();
    return (
        <Card className={classes.card} style={{backgroundColor: "#F5F5F5"}}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {product}
                    </Typography>
                    <Grid container spacing={0}>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Typography className={classes.typograpy} variant="caption" gutterBottom component="div">
                                Brand
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Typography variant="caption" gutterBottom component="div">
                                {brand}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Typography variant="caption" gutterBottom component="div">
                                Category
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Typography variant="caption" gutterBottom component="div">
                                {category}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Typography variant="caption" gutterBottom component="div">
                                Model
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Typography variant="caption" gutterBottom component="div">
                                {model}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Typography variant="caption" gutterBottom component="div">
                                Sub Category
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Typography variant="caption" gutterBottom component="div">
                                {sub_category}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Typography variant="caption" gutterBottom component="div">
                                Composition
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Typography variant="caption" gutterBottom component="div">
                                {composition}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Typography variant="caption" gutterBottom component="div">
                                UOM
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Typography variant="caption" gutterBottom component="div">
                                {category}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default Cards;