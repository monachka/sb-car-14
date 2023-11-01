import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
//import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function AddCar(props) {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: "",
        model: "",
        color: "",
        year: "",
        fuel: "",
        price: "",
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = event => {
        setCar({ ...car, [event.target.name]: event.target.value })
    };

    const handleSave = () => {
        props.addCar(car);
        handleClose();
    }

    return (
        <div>
            <Button variant="contained" size="large" onClick={handleClickOpen}><AddIcon/></Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Car</DialogTitle>
                <DialogContent>
                <Stack spacing={2} mt={1}>
                    <TextField
                        placeholder="Brand"
                        name="brand"
                        autoFocus
                        variant="standard"
                        value={car.brand}
                        onChange={handleChange}
                    />
                    <br/>
                    <TextField
                        placeholder="Model"
                        name="model"
                        autoFocus
                        variant="standard"
                        value={car.model}
                        onChange={handleChange}
                    />
                    <br/>
                    <TextField
                        placeholder="Color"
                        name="color"
                        autoFocus
                        variant="standard"
                        value={car.color}
                        onChange={handleChange}
                    />
                    <br/>
                    <TextField
                        placeholder="Year"
                        name="year"
                        autoFocus
                        variant="standard"
                        value={car.year}
                        onChange={handleChange}
                    />
                    <br/>
                    <TextField
                        placeholder="Price"
                        name="price"
                        autoFocus
                        variant="standard"
                        value={car.price}
                        onChange={handleChange}
                    />
                    <br/>
                </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default AddCar;
