import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import Container from '@mui/material/Container';
import { GetTrainings_URL } from '../constants.js';

export default function Statistics() {

  const [inputData, setInputData] = useState([{}]);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  // Function to group an array of objects by a specified key
  function groupBy(arr, key) {
    return arr.reduce((groups, item) => {
      const val = item[key];
      groups[val] = groups[val] || [];
      groups[val].push(item);
      return groups;
    }, {});
  }

  // Function to sum an array of objects by a specified key
  function sumBy(arr, key) {
    return arr.reduce((sum, item) => sum + item[key], 0);
  }

  const getData = () => {
    fetch(GetTrainings_URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert('Error fetching data');
        }
      })
      .then((data) => {
        // Map the fetched data to a new array of objects containing only activity and duration
        setInputData(
          data.map((content) => ({
            activity: content.activity,
            duration: content.duration,
          }))
        );
        // Set the open state to true to trigger rendering of chart component
        setOpen(true);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getData();
  }, []);

  // Check if data has been fetched before rendering chart component
  if (open) {
    // Group fetched data by activity using the groupBy function from lodash
    const grouped = groupBy(inputData, 'activity');

    // Transform grouped data into a new array of objects containing activity and the sum of its durations
    const chartData = [];
    for (let activity in grouped) {
      chartData.push({
        activity: activity,
        duration: sumBy(grouped[activity], 'duration'),
      });
    }

    setData(chartData);
    setOpen(false);
  }

  return (
    <div>
      <h1>Activities Statistics</h1>
      <Container
        maxWidth="80%"
        maxHeight="90%"
        margin="auto"
        sx={{
            backgroundColor: 'white',
            padding: 3,
            margin: 'auto',
            width: '80%',
            height: '100%'
        }}
      >
        <ResponsiveContainer
            aspect={4/3}
            minWidth={200}
        >
            <BarChart
            width={1050}
            height={550}
            data={data}
            margin={{
                top: 10,
                right: 50,
                left: 50,
                bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="activity" />
            <YAxis label={{ value: 'Duration (minutes)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="duration" fill="#125186" />
            </BarChart>
        </ResponsiveContainer>
      </Container>
    </div>
  );
}
