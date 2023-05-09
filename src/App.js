import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink
  } from 'react-router-dom';  //React Router
import Customers from './components/Customers';
import Trainings from './components/Trainings';

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
              Customers
            </NavLink>{' '}
            <NavLink
            to="/trainings"
            className="sticky-nav"
            style={props => getNavLinkStyle(props.isActive)}
            >
              Trainings
            </NavLink>{' '}
        </div>
          
        <div className="contentContainerStyle">
          <Routes>
            <Route exact path="/" element={<Customers />} />
            <Route path="/trainings" element={<Trainings />} />
          </Routes>
        </div>
        </BrowserRouter>
        </div>
    </div>
  );
}

export default App;
