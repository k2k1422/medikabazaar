import React, { useState,useEffect } from "react";
import TextField from '@mui/material/TextField';
import { Grid, Stack, Button, Typography, Fab } from '@mui/material';
import AddIcon from "@mui/icons-material/Add"
import { createStyles, makeStyles } from '@mui/styles';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Cards from "./Cards";
import { padding } from "@mui/system";
import AddProduct from "./AddProduct";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.red,
        },
        textFeild: {
            width: "100%"
        },
        button: {
            width: "100%",
            height: "100%",
        },
        fab: {
            bottom: theme.spacing(1),
            position: "absolute",
            right: theme.spacing(1),
            zIndex: 2,
        },
    }),
);


const Product = (props) => {

    const classes = useStyles();

    const [value, setValue] = useState({
        product_name: "",
        category_name: "",
        brand_name: ""
    })

    const [data, setData] = useState(undefined)

    const [open,setOpen]= useState(false)

    const handleChange = name => event => {
        setValue({
            ...value,
            [name]: event.target.value
        })
    }

    const callSearch = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(value);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("/api/product/productSearch/", requestOptions)
            .then(response => response.json())
            .then(result => setData(result))
            .catch(error => console.log('error', error));
    }

    const handleClick = () => {
        callSearch()
    }

    const handleOpen = e => {
        setOpen(true)
    }

    useEffect(() => {
        if(!open){
            callSearch()
        }
    },[open])

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Typography variant="h3" gutterBottom component="div">
                        Product Indexing
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={2} xl={2}>
                    <TextField
                        onChange={handleChange("category_name")}
                        className={classes.textFeild}
                        id="category_id"
                        label="Category"
                        variant="outlined"
                        size="small" />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={2} xl={2}>
                    <TextField
                        onChange={handleChange("brand_name")}
                        className={classes.textFeild}
                        id="brand_id"
                        label="Brand"
                        variant="outlined"
                        size="small" />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={2} xl={2}>
                    <TextField
                        onChange={handleChange("product_name")}
                        className={classes.textFeild}
                        id="product_id"
                        label="Product"
                        variant="outlined"
                        size="small" />
                </Grid>
                <Grid item xs={6} sm={6} md={3} lg={1} xl={1}>
                    <Button className={classes.button} variant="outlined" startIcon={<FilterAltIcon />} onClick={handleClick}>
                        Search
                    </Button>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <Typography variant="subtitle2" gutterBottom component="div">
                    {
                        data !== undefined ?
                            "Results found "+data.hits.total.value + ", Max score "+data.hits.max_score
                            : ""
                    }
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={9} lg={5} xl={5}>
                </Grid>
                {/* <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                    <Cards
                        product="iPhone"
                        brand="Apple"
                        category="phone"
                        model="iPhone 12 mini"
                        sub_category="phone"
                        composition="unkonwn"
                        uom="flops per secord"
                    />
                </Grid> */}
            </Grid>
            <div style={{ overflow: 'scroll', height:"430px", overflowY: "auto", overflowX: "auto", width: "100%", paddingTop: "10px" }}>
                <Grid container spacing={1}>
                    {
                        data !== undefined ?
                            data.hits.hits.map(obj =>
                                <Grid item xs={12} sm={6} md={6} lg={2} xl={2}>
                                    <Cards
                                        product={obj._source.product_name}
                                        brand={obj._source.brand_name}
                                        category={obj._source.category_name}
                                        model={obj._source.model}
                                        sub_category={obj._source.sub_category}
                                        composition={obj._source.composition}
                                        uom={obj._source.uom}
                                    />
                                </Grid>)
                            : <></>
                    }

                </Grid>
            </div>
            <div className={classes.fab}>
                <Fab
                    id="save"
                    name="saveVariant"
                    onClick={handleOpen}
                    
                    size="medium"
                    color="primary"
                >
                    <AddIcon />
                </Fab>
            </div>
            <AddProduct 
                open={open}
                setOpen={setOpen}
            />

        </div>
    )
}

export default Product;