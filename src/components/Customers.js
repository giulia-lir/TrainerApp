import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { API_URL, Trainings_URL } from '../constants.js';
import AddCustomer from './AddCustomer.js';
import EditCustomer from './EditCustomer.js';
import AddTraining from './AddTraining.js';

// Mui Components
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

// Mui Icons
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

// AG-Grid imports
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

// CSV export functionalities
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { CsvExportModule } from '@ag-grid-community/csv-export';

// *** CUSTOMERS LIST PAGE ***
export default function Customers() {

    // Customers state
    const [customers, setCustomers] = useState([]);

    // Snackbar openening/closing and message states
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    // AG-Grid columns defined
    const [columnDefs] = useState([
        // Delete button render with icon
        {
            cellRenderer: params =>
                <Button
                    size='small'
                    color='error'
                    onClick={() => deleteCustomer(params)}
                >
                    <DeleteIcon size={1} />
                </Button>,
                width: 70
        },
        // Edit button render with external component
        {
            cellRenderer: params => 
                <EditCustomer
                    params={params.data}
                    updateCustomer={updateCustomer} 
                />,
            width: 70
        },
        {
            cellRenderer: params =>
                <AddTraining 
                    saveTraining={saveTraining} 
                    params={params.data}
                />, 
            width:70
        },
        {field: 'firstname', headerName: 'Firstname', sortable: true, filter: true},
        {field: 'lastname', headerName: 'Lastname', sortable: true, filter: true},
        {field: 'address', headerName: 'Address', minWidth: 300, sortable: true, filter: true},
        {field: 'email', headerName: 'Email', minWidth: 250, sortable: true, filter: true},
        {field: 'phone', headerName: 'Phone Number', sortable: true, filter: true}
    ]);

    // Fetching customers data & error handling
    const getCustomers = () => {
        fetch(API_URL + 'customers')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                // error alert
                alert('Something went wrong in GET request')
            }
        })
        .then(data => {
            // Data manipulation to concatenate streetaddress, postcode and city in one string
            const dataWithFullAddress = data.content.map(
                d => (
                    {...d, address: `${d.streetaddress}, ${d.postcode} ${d.city}`}
                    )
                )
            setCustomers(dataWithFullAddress)
        })
        .catch(err => console.error(err))
    }

    // Sending POST request with new customer data
    const addCustomer = (customer) => {
        fetch(API_URL + 'customers', {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(customer) //change the JS object to json type
        })
        .then(response => {
            if (response.ok) {
                setMsg('Customer added successfully')
                setOpen(true)
                getCustomers();
            }
            else
                alert('Something went wrong. Status: ' + response.statusText)
        })
        .catch(err => console.error(err))
    }

    // Sending PUT request to update customer data
    const updateCustomer = (updatedCustomer, url) => {
        fetch(url, {
            method: 'PUT',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify(updatedCustomer)
        })
        .then(response => {
            if (response.ok) {
                setMsg('Customer edited correctly')
                setOpen(true)
                getCustomers()
            }
            else
                alert('Something went wrong during editing')
        })
        .catch(err => console.error(err))
    }

    // Send DELETE request for matching customer's parameters
    const deleteCustomer = (params) => {
        if (window.confirm('Are you sure you want to delete this customer?')){
            fetch(params.data.links[0].href,{method:'DELETE'})
            .then(
                response => {
                    if (response.ok) {
                        setMsg('Customer deleted')
                        setOpen(true)
                        getCustomers();
                    } else {
                        alert('Something went wrong during deletion')
                    }
                }
            )
            .catch(err=> console.log(err))
        }
    }

    // POST request to save new training tied to customers
    const saveTraining=(training)=>{
        fetch(Trainings_URL,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(training)
        }
        )
        .then(response => getCustomers())
        .catch(err =>console.error(err))
    }

    const gridRef = useRef();

    // Export function to export Customers Ag-Grid into CSV file
    function exportCCSV() {
        // Check if the gridRef is defined and has an "api" property
        if (gridRef.current && gridRef.current.api) {
            const params = {
              suppressQuotes: true, // Avoid wrapping values in quotes
              fileName: 'customers.csv', // Set file name on download
              columnSeparator: ';'
            };
            gridRef.current.api.exportDataAsCsv(params);
          }
    }

    useEffect(() => {
        getCustomers();
    }, [])

    return(
        <>
            <div>
                <h1>Customers list</h1>
                <AddCustomer addCustomer={addCustomer} />
                <Button 
                    style={{
                        margin:10,
                        padding:10}} 
                    variant="contained" 
                    color='primary' 
                    onClick={() => exportCCSV()}>
                    <DownloadIcon /> CSV file
                </Button>
                <div className='ag-theme-material' style={{width: '90%', height: 600, margin: 'auto'}}>
                    <AgGridReact 
                        rowData={customers}
                        columnDefs={columnDefs}
                        animateRows= {true}
                        pagination={true}
                        paginationPageSize={10}
                        ref={gridRef}
                    />
                    <Snackbar 
                        open={open}
                        message={msg}
                        autoHideDuration={3000}
                        onClose={() => setOpen(false)}
                    />
                </div>
            </div>
        </>
    )
}