import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { useState } from 'react';
import axios from "axios";
import { Base_URL } from '../../constanst';
import toast from 'react-hot-toast';
import { RiCheckDoubleFill } from "react-icons/ri";


const CreateAccount = (props)=>{
    const[state, setState] = useState({
        accountName:'',
        email:"",
        password:"",
        description:""
    });
    const onChangeHandler = (e)=>{
        const {value,name} = e.target;
        setState(prevState =>({...prevState,[name]:value }))
    }
    const onSubmitHandler = ()=>{
        const {accountName, email, password, description } = state;
        if(!accountName){
            toast.error("AccountName is required",{
                duration: 4000,
                position: 'top-right',
            });
            return;
        }
        if(!email){
            toast.error("Email is required",{
                duration: 4000,
                position: 'top-right',
            });
            return;
        }
        if(!password){
            toast.error("Password is required",{
                duration: 4000,
                position: 'top-right',
            });
            return;
        }
        if(!description){
            toast.error("Description is required",{
                duration: 4000,
                position: 'top-right',
            });
            return;
        }
        const token = localStorage.getItem("token")
        axios.post(`${Base_URL}account`,state,{
            headers:{
                token
            }
        }).then((res)=>{
            const { message } = res.data;
            setState({
                accountName:'',
                email:"",
                password:"",
                description:""
            });
            props.fetchData();
            toast.success(message,{
                duration: 4000,
                position: 'top-right',
            });
        }).catch(err=>{
            const { message } = err.response.data;
            toast.error(message,{
                duration: 4000,
                position: 'top-right',
            });
        }).finally(()=>{

        });
    }
    return(
        <div className="account2">
             <Input
            name='accountName'
            value={state.accountName}
            onChange={onChangeHandler}
            color="primary"
            placeholder="AccountName"
            size="sm"
            variant="outlined"/>
            <Input
            name='email'
            value={state.email}
            onChange={onChangeHandler}
            color="primary"
            placeholder="Email"
            size="sm"
            variant="outlined"/>
            <Input
            name='password'
            value={state.password}
            onChange={onChangeHandler}
            color="primary"
            placeholder="password"
            size="sm"
            variant="outlined"/>
             <Input
            name='description'
            value={state.description}
            onChange={onChangeHandler}
            color="primary"
            placeholder="Description"
            size="sm"
            variant="outlined"/>
            <Button className='Btn2' onClick={onSubmitHandler}><RiCheckDoubleFill />Submit</Button>
        </div>
    )
}

export default CreateAccount;