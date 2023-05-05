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
        {field: 'firstname', sortable: true, filter: true},
        {field: 'lastname', sortable: true, filter: true},
        {field: 'streetaddress', sortable: true, filter: true},
        {field: 'postcode', sortable: true, filter: true},
        {field: 'city', sortable: true, filter: true},
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', sortable: true, filter: true}
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
           setCustomers(data.content)
        })
        .catch(err => console.error(err))
    }

    console.log(customers)

    useEffect(() => {
        getCustomers();
    }, [])

    return(
        <>
            <div>
                <h1>This is the customers list page</h1>
                <div className='ag-theme-material' style={{width: '90%', height: 600, margin: 'auto'}}>
                    <AgGridReact 
                        rowData={customers}
                        columnDefs={columnDefs}
                        pagination={true}
                        paginationPageSize={10}
                    />
                </div>
            </div>
        </>
    )
}