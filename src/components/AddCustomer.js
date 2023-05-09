import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

// MUI Icons
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

// *** ADD NEW CUSTOMER DIALOG ***
export default function AddCustomer( { addCustomer }) {

    const [open, setOpen] = React.useState(false);

    const [customer, setCustomer]= React.useState({
        firstname:'', 
        lastname:'', 
        streetaddress:'', 
        postcode:'', 
        city:'', 
        email:'', 
        phone:''
    })

    // Setting dialog opening and closing
    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
    setOpen(false);
    };
    
    // Saving customer, close dialog and create new empty object
    const handleSaveCustomer = () => {
        addCustomer(customer)
        setOpen(false);
        setCustomer({
            firstname:'', 
            lastname:'', 
            streetaddress:'', 
            postcode:'', 
            city:'', 
            email:'', 
            phone:''
        })
    }

    return(
        <div>
            <Button
                variant="contained"
                onClick={handleClickOpen}
                startIcon={<PersonAddAlt1Icon />}
                className="add-customer-button"
                style={{ 
                    backgroundColor: "#ABEC79",
                    color: "#000000",
                    marginBottom: '5px' 
                    }} 
                >
                Add Customer
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Customer</DialogTitle>
                <DialogContent>
                    <TextField 
                        value={customer.firstname}
                        onChange={e => setCustomer({...customer, firstname: e.target.value})}
                        margin="dense"
                        label="First Name"
                        fullWidth
                        variant="standard"
                    />
                    <TextField 
                        value={customer.lastname}
                        onChange={e => setCustomer({...customer, lastname: e.target.value})}
                        margin="dense"
                        label="Last Name"
                        fullWidth
                        variant="standard"
                    />
                    <TextField 
                        value={customer.streetaddress}
                        onChange={e => setCustomer({...customer, streetaddress: e.target.value})}
                        margin="dense"
                        label="Street Address"
                        fullWidth
                        variant="standard"
                    />
                    <TextField 
                        value={customer.postcode}
                        onChange={e => setCustomer({...customer, postcode: e.target.value})}
                        margin="dense"
                        label="Post Code"
                        fullWidth
                        variant="standard"
                    />
                    <TextField 
                        value={customer.city}
                        onChange={e => setCustomer({...customer, city: e.target.value})}
                        margin="dense"
                        label="City"
                        fullWidth
                        variant="standard"
                    />
                    <TextField 
                        value={customer.email}
                        onChange={e => setCustomer({...customer, email: e.target.value})}
                        margin="dense"
                        label="Email"
                        fullWidth
                        variant="standard"
                    />
                    <TextField 
                        value={customer.phone}
                        onChange={e => setCustomer({...customer, phone: e.target.value})}
                        margin="dense"
                        label="Phone"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSaveCustomer}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}