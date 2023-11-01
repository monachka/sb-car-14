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

function AddOwner(props) {
    const [open, setOpen] = useState(false);
    const [owner, setOwner] = useState({
        firstname: "",
        lastname: "",
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = event => {
        setOwner({ ...owner, [event.target.name]: event.target.value })
    };

    const handleSave = () => {
        props.addOwner(owner);
        handleClose();
    }

    return (
        <div>
            <Button variant="contained" size="large" onClick={handleClickOpen}><AddIcon/></Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Owner</DialogTitle>
                <DialogContent>
                <Stack spacing={2} mt={1}>
                    <TextField
                        placeholder="Firstname"
                        name="firstname"
                        autoFocus
                        variant="standard"
                        value={owner.firstname}
                        onChange={handleChange}
                    />
                    <br/>
                    <TextField
                        placeholder="Lastname"
                        name="lastname"
                        autoFocus
                        variant="standard"
                        value={owner.lastname}
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
export default AddOwner;
