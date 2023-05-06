import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Trainings_URL } from '../constants.js';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import dayjs from 'dayjs'; //for date formatting purposes

// *** TRAININGS LIST PAGE ***
export default function Trainings() {

    // Trainings state
    const [trainings, setTrainings] = useState([]);

    // AG-Grid columns defined
    const [columnDefs] = useState([
        {field: 'date', valueFormatter: (params) => dayjs(params.value).format('DD.MM.YYYY - HH:MM'), sortable: true, filter: true, flex: 1.2},
        {field: 'duration', sortable: true, filter: true, flex: 1},
        {field: 'activity', sortable: true, filter: true, flex: 1},
        {field:'customer.firstname', headerName: 'Firstname', sortable:true, filter: true, flex: 1},
        {field:'customer.lastname', headerName: 'Lastname', sortable:true, filter: true, flex: 1},
    ]);

    // Fetching trainings data & error handling
    const getTrainings = () => {
        fetch(Trainings_URL)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                // error alert
                alert('Something went wrong in GET request')
            }
        })
        .then(data => {
            setTrainings(data)
        })
        .catch(err => console.error(err))
    }

    useEffect(() => {
        getTrainings();
    }, [])


    return(
        <>
            <div>
                <h1>Trainings list</h1>
                <div className='ag-theme-material' style={{width: '90%', height: 600, margin: 'auto'}}>
                    <AgGridReact 
                        rowData={trainings}
                        columnDefs={columnDefs}
                        animateRows= {true}
                        pagination={true}
                        paginationPageSize={10}
                        headerClass="center-align"
                        cellStyle={{ textAlign: "left" }}
                    />
                </div>
            </div>
        </>
    )
}