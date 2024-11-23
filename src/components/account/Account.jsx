import { AgGridReact } from 'ag-grid-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Base_URL } from '../../constanst';
import CreateAccount from './CreateAccount';
import EditAccount from './EditAccount';

const Account = ()=>{

    const ViewHandler = (rowData)=>{
        const {
        accountName,
        description,
        email,
        id,
        password}=rowData;
        alert(`Name: ${accountName} \nEmail: ${email} \nPassword: ${password}`)
    }
    const ViewComponent = (props)=>{
        const {data} = props;
        return(
            <div onClick={()=>ViewHandler(data)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-eye" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                </svg>
            </div>
            
        )
    }

    const[editRow,setEditRow] = useState(null);
    const editHandler = (rowData)=>{
        setEditRow(rowData);
    }

    const EditComponent = (props)=>{
        const {data} = props;
        return(
        <div onClick={()=> editHandler(data)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#76ff03" className="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                </svg>
        </div>
        )
    }

    

     // Row Data: The data to be displayed.
     const [rowData, setRowData] = useState([]);

    // Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState([
        { field: 'accountName' },
        { field:"", headerName:"View",cellRenderer:ViewComponent},
        { field:"", headerName:"Edit",cellRenderer:EditComponent},
    ]);

    useEffect(() =>{
        fetchData();
    }, []);

    const fetchData = ()=>{
        const token = localStorage.getItem("token");
        axios.get(`${Base_URL}accounts`,{
            headers:{
                token
            }
        })
        .then(function (res) {
            const {accounts} = res.data.data
            setRowData(accounts);
            // handle success
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          });
    }

    return(
        <div className="account">
             {/* left container */}
             <div className="left-container">
             <div className={"ag-theme-quartz"}style={{ width: '100%', height: '100%' }}>
                <AgGridReact 
                rowData={rowData} 
                columnDefs={colDefs}/>
                </div>
             </div>
             <div className="right-container">
                {editRow===null ? <CreateAccount fetchData={fetchData}/> :<EditAccount fetchData={fetchData} setEditRow={setEditRow} editRow={editRow} />}
             </div>
        </div>
    )
}

export default Account;