import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function EditOwner(props) {
    const [open, setOpen] = useState(false);
    const [owner, setOwner] = useState({
        firstname: "",
        lastname: "",
    });

    const handleClickOpen = () => {
        setOwner({
            firstname: props.data.row.firstname,
            lastname: props.data.row.lastname,
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = event => {
        setOwner({ ...owner, [event.target.name]: event.target.value })
    };

    const handleSave = () => {
        props.updateOwner(owner, props.data.id);
        handleClose();
    };

    return (
        <div>
            <IconButton variant="contained" size="small" onClick={handleClickOpen}><EditIcon color="primary"/></IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Owner</DialogTitle>
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
export default EditOwner;