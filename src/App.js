import logo from './logo.svg';
import './App.css';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { Toaster } from 'react-hot-toast';
import Login from './components/auth/login/Login';
import Account from './components/account/Account';
import { useEffect, useState } from 'react';
import Button from '@mui/joy/Button';


function App() {
  const[route,setRoute] =useState(null);
  useEffect(() =>{
    const token = localStorage.getItem("token");
    if(token){
      setRoute("account");
    }else{
      setRoute("login");
    }
  }, []);
  const Logout = ()=>{
    localStorage.removeItem("token");
    setRoute("login");
  }
  return (
      <div className="App">
        <Button className="Btn" onClick={(Logout)}>Logout</Button>
      {route === "login" && <Login setRoute={setRoute}/>}
      {route === "account" && <Account/>}
      <Toaster/>
    </div>
  );
}

export default App;
