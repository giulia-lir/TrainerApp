import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Trainings_URL, GetTrainings_URL } from '../constants.js';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import dayjs from 'dayjs'; //for date formatting purposes
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { Snackbar } from '@mui/material';

// *** TRAININGS LIST PAGE ***
export default function Trainings() {

    // Trainings state
    const [trainings, setTrainings] = useState([]);

    // Snackbar settings
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    // AG-Grid columns defined
    const [columnDefs] = useState([
        {field: 'date', valueFormatter: (params) => dayjs(params.value).format('DD.MM.YYYY'), sortable: true, filter: true, flex: 1.2},
        {field: 'duration', sortable: true, filter: true, flex: 1},
        {field: 'activity', sortable: true, filter: true, flex: 1},
        {field: 'customer.firstname', headerName: 'Firstname', sortable:true, filter: true, flex: 1},
        {field: 'customer.lastname', headerName: 'Lastname', sortable:true, filter: true, flex: 1},
        {cellRenderer: params=>
            <Button 
                color='error'
                onClick={()=> deleteTraining(params)}
            >
               <DeleteIcon size={1}/>
                </Button>,
            width:80
        }
    ]);

    // Fetching trainings data & error handling
    const getTrainings = () => {
        fetch(GetTrainings_URL)
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

    // Delete training function
    const deleteTraining = (params) => {
        if (window.confirm('Are you sure you want to delete this training?')){
            fetch(Trainings_URL + params.data.id,{method:'DELETE'})
            .then(
                response => {
                    if (response.ok) {
                        setMsg('Training removed')
                        setOpen(true)
                        getTrainings();
                    } else {
                        alert('Something went wrong during deletion')
                    }
                }
            )
            .catch(err=> console.log(err))
        }
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