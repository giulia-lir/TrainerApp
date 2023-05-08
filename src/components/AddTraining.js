import React, { useState } from 'react';
// MUI components
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// MUI Date picker elements
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// MUI Icons
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

export default function AddTraining(props) {

    // State variables for opening/closing dialog, selected customer, and new training
    const [open, setOpen] = useState(false);

    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: ''
    });

    const [training, setTraining] = useState({
        date: '',
        duration: '0',
        activity: '',
        customer: ''
    });

    // Open dialog and set selected customer's firstname and lastname
    const handleClickOpen = () => {
    setOpen(true);

        // Get selected customer's firstname and lastname in form 
        setCustomer({
            firstname: props.params.firstname,
            lastname: props.params.lastname,
        });

        // Link customer to new training
        setTraining({
            ...training,
            customer: props.params.links[0].href,
        });
    };

    // Close the dialog
    const handleClose = () => {
    setOpen(false);
    };

    // Handles changes to the input fields in the form
    const handleInputChange = (event) => {
    setTraining({
        ...training,
        [event.target.name]: event.target.value,
    });
    };

    // Changes the date of the new training
    const ChangeDate = (date) => {
        setTraining({ ...training, date: date });
    };

    // Adds the new training to the database through a call to the parent component's "saveTraining" function
    const addTraining = () => {
        props.saveTraining(training);
        handleClose();
    };

    return (
    <div>
        <Button color="primary" onClick={handleClickOpen}>
            <PlaylistAddIcon />
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New Training</DialogTitle>
            <DialogContent>
                <TextField
                    InputProps={{
                        disabled: true,
                    }}
                    margin="dense"
                    value={customer.firstname + ' ' + customer.lastname}
                    label="Customer Name"
                    fullWidth
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                        label="Date"
                        name="date"
                        value={training.date}
                        onChange={(date) => ChangeDate(date)}
                        />
                    </DemoContainer>
                </LocalizationProvider>

                <TextField
                    type="number"
                    margin="dense"
                    name="duration"
                    value={training.duration}
                    onChange={(e) => handleInputChange(e)}
                    label="Duration"
                    inputProps={{ min: "1" }} // Minimum duration 1 minute. ***ISSUE*** -/+ symbols can still be submitted manually
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="activity"
                    value={training.activity}
                    onChange={(e) => handleInputChange(e)}
                    label="Activity"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={addTraining}>Save</Button>
            </DialogActions>
        </Dialog>
    </div>
    );
}
