import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { useState } from 'react';
import axios from "axios";
import { Base_URL } from '../../../constanst';
import toast from 'react-hot-toast';

const Login = (props)=>{
    const[state, setState] = useState({
        email:"",
        password:""
    });
    const onChangeHandler = (e)=>{
        const {value,name} = e.target;
        setState(prevState =>({...prevState,[name]:value }))
    }
    const onSubmitHandler = ()=>{
        const {email, password } = state;
        if(!email){
            toast.error("Email is required",{
                duration: 4000,
                position: 'top-right',
            });
            return;
        }
        if(!password){
            toast.error("password is required",{
                duration: 4000,
                position: 'top-right',
            });
            return;
        }

        axios.post(`${Base_URL}login`,state)
        .then((res)=>{
            const { token, user } = res.data.data;
            localStorage.setItem("token", token);
            localStorage.setItem("email", user.email);
            props.setRoute("account")
            toast.success("You Are Logged In Successfully.",{
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
        <div className="login">
            <Input
            name='email'
            value={state.email}
            onChange={onChangeHandler}
            color="primary"
            disabled={false}
            placeholder="Email..."
            size="md"
            variant="outlined"
            sx={{
                "--Input-minHeight": "40px",
              }}
            />
            <Input
            name='password'
            value={state.password}
            onChange={onChangeHandler}
            color="primary"
            disabled={false}
            placeholder="Password..."
            size="md"
            variant="outlined"
            sx={{
                "--Input-minHeight": "40px"
              }}
            />
            <Button className='Btn3' onClick={onSubmitHandler}>Login</Button>
        </div>
    )
}

export default Login;