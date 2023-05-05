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
      color: isActive ? "red" : "black"
    };
  }

  //Return React render
  return (
    <div className="App">
      <BrowserRouter>
        <NavLink
          to="/"
          style={props => getNavLinkStyle(props.isActive)}
        >
          Customers
        </NavLink>{' '}

        <NavLink
        to="/trainings"
        style={props => getNavLinkStyle(props.isActive)}
        >
          Trainings
        </NavLink>{' '}
        
        <Routes>
          <Route exact path="/" element={<Customers />} />
          <Route path="/trainings" element={<Trainings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
