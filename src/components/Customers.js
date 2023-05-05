import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { API_URL } from '../constants.js';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

// *** CUSTOMERS LIST PAGE ***
export default function Customers() {

    // Customers state
    const [customers, setCustomers] = useState([]);

    // AG-Grid columns defined
    const [columnDefs] = useState([
        {field: 'firstname', headerName: 'Firstname', sortable: true, filter: true},
        {field: 'lastname', headerName: 'Lastname', sortable: true, filter: true},
        {field: 'address', headerName: 'Address', minWidth: 300, sortable: true, filter: true},
        {field: 'email', headerName: 'Email', sortable: true, filter: true},
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

    useEffect(() => {
        getCustomers();
    }, [])

    return(
        <>
            <div>
                <h1>Customers list</h1>
                <div className='ag-theme-material' style={{width: '90%', height: 600, margin: 'auto'}}>
                    <AgGridReact 
                        rowData={customers}
                        columnDefs={columnDefs}
                        animateRows= {true}
                        pagination={true}
                        paginationPageSize={10}
                    />
                </div>
            </div>
        </>
    )
}