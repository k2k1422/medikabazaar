import React, { useEffect, useState } from "react";
import { Grid, Stack, Button, Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const useStyles = makeStyles((theme) =>
    createStyles({
        div:{
            width: "100%"
        },
        textFeild: {
            width: "100%"
        },
    }),
);


const AddProduct = props => {

    const {
        open,
        setOpen

    } = props

    const [state,setState] = useState({
        "product_name":"",
        "brand_name":"",
        "model":"",
        "category_name":"",
        "sub_category":"",
        "composition":"",
        "uom":""
    })

    useEffect(() => {
        if(open){
            setState({
                "product_name":"",
                "brand_name":"",
                "model":"",
                "category_name":"",
                "sub_category":"",
                "composition":"",
                "uom":""
            })
        }
    },[open])

    const handleClose = e => {
        setOpen(false)
    }

    const handleChange = name => event => {
        setState({
            ...state,
            [name]: event.target.value
        })
    }

    const handleSave = e=> {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(state);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("/api/product/createProduct/", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

        setOpen(false)
    }

    console.log(state)

    const classes = useStyles();
    return (
       <div>
           <Dialog open={open} onClose={handleClose} maxWidth="sm">
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
        <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <TextField
                    autoFocus
                    margin="dense"
                    className={classes.textFeild}
                    label="Product"
                    variant="outlined"
                    // value={state.product_name}
                    onChange={handleChange("product_name")}
                />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <TextField
                    autoFocus
                    margin="dense"
                    className={classes.textFeild}
                    label="Brand"
                    variant="outlined"
                    // value={state.brand_name}
                    onChange={handleChange("brand_name")}
                />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <TextField
                    autoFocus
                    margin="dense"
                    className={classes.textFeild}
                    label="Model"
                    variant="outlined"
                    // value={state.model}
                    onChange={handleChange("model")}
                />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <TextField
                    autoFocus
                    margin="dense"
                    className={classes.textFeild}
                    label="Category"
                    variant="outlined"
                    // value={state.category_name}
                    onChange={handleChange("category_name")}
                />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <TextField
                    autoFocus
                    margin="dense"
                    className={classes.textFeild}
                    label="Sub Category"
                    variant="outlined"
                    // value={state.sub_category}
                    onChange={handleChange("sub_category")}
                />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <TextField
                    autoFocus
                    margin="dense"
                    className={classes.textFeild}
                    label="Composition"
                    variant="outlined"
                    // value={state.composition}
                    onChange={handleChange("composition")}
                />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <TextField
                    autoFocus
                    margin="dense"
                    className={classes.textFeild}
                    label="UOM"
                    variant="outlined"
                    // value={state.uom}
                    onChange={handleChange("uom")}
                />
          </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
       </div>
    )
}

export default AddProduct;