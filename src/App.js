import './App.css';
//React imports
import React,{useState,useEffect} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink
  } from 'react-router-dom';  //React Router
import Customers from './components/Customers';
import Trainings from './components/Trainings';
import Calendar from './components/Calendar';
import Statistics from './components/Statistics';

// MUI icons
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import BarChartIcon from '@mui/icons-material/BarChart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

function App() {

  //NavLink styling function
  function getNavLinkStyle(isActive) {
    return {
      fontWeight: isActive ? "bold" : "",
      color: 'white',
      textDecoration: "none",
      padding: "0.5rem",
      paddingTop: '120px',
      margin: "0 0.5rem",
      fontSize: "1rem",
      transition: "all 0.2s",
      borderBottom: isActive ? "2px solid #ff6347" : ""
    };
  }

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Small screen-size ternary rendering with condition in NavLink
  // If the screen-size is lower than 800px the NavLink text is changed to corresponding icon
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 800) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  //Return React render
  return (
    <div className="App">
      <div className="appContainerStyle">
        <BrowserRouter>
        <div className="navBarContainerStyle">
            <NavLink
              to="/"
              className="sticky-nav"
              style={props => getNavLinkStyle(props.isActive)}
            >
              {isSmallScreen ? <PeopleOutlineIcon fontSize='medium' style={{color: "white"}} /> : 'Customers'}
            </NavLink>{' '}
            <NavLink
            to="/trainings"
            className="sticky-nav"
            style={props => getNavLinkStyle(props.isActive)}
            >
              {isSmallScreen ? <FitnessCenterIcon fontSize='medium' style={{color: "#white"}} /> : 'Trainings'}
            </NavLink>{' '}
            <NavLink
            to="/calendar"
            className="sticky-nav"
            style={props => getNavLinkStyle(props.isActive)}
            >
              {isSmallScreen ? <CalendarMonthIcon fontSize='medium' style={{color: "#white"}} /> : 'Calendar'}
            </NavLink>{' '}
            <NavLink
            to="/statistics"
            className="sticky-nav"
            style={props => getNavLinkStyle(props.isActive)}
            >
              {isSmallScreen ? <BarChartIcon fontSize='medium' style={{color: "#white"}} /> : 'Statistics'}
            </NavLink>{' '}
        </div>
          
        <div className="contentContainerStyle">
          <Routes>
            <Route exact path="/" element={<Customers />} />
            <Route path="/trainings" element={<Trainings />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </div>
        </BrowserRouter>
        </div>
    </div>
  );
}

export default App;
