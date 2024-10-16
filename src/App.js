import logo from './logo.svg';
import './App.css';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { Toaster } from 'react-hot-toast';
import Login from './components/auth/login/Login';
import Account from './components/account/Account';


function App() {
  return (
    <div className="App">
      {/* <Login/> */}
      <Account/>
      <Toaster/>
    </div>
  );
}

export default App;
