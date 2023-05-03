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
  return (
    <div className="App">
      <BrowserRouter>
        <NavLink
          to="/"
          style={({ isActive, isPending }) => {
            return {
              fontWeight: isActive ? "bold" : "",
              color: isPending ? "red" : "black",
            };
          }}
        >
          Customers
        </NavLink>{' '}

        <NavLink
        to="/trainings"
        style={({ isActive, isPending }) => {
          return {
            fontWeight: isActive ? "bold" : "",
            color: isPending ? "red" : "black",
          };
        }}
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
