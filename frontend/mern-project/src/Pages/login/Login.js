import React, {useState} from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../login/login.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
export default function Login(){
    const [user, setUser]= useState({
        email:"",
        pass:"",
        name:"",
        gender:"",
        age:0,
        ph:0,
        dob:"2022-03-19"
    })
    let navigate = useNavigate();
    const valueChange = event => {
        const {name, value}=event.target
        setUser({
            ...user,
            [name]:value
        })
    }
    const login=(e)=>{
        e.preventDefault();
        axios.post('https://mern-project-xyzsor.herokuapp.com/login', user)
        .then(res => {
            //console.log(res.data);
            alert(res.data.message)
            if(res.data.message==="Login Successful"){
                localStorage.setItem("email", user.email);
                localStorage.setItem("name",res.data.user.name);
                localStorage.setItem("gender",res.data.user.gender);
                localStorage.setItem("age",res.data.user.age);
                localStorage.setItem("dob",res.data.user.dob);
                localStorage.setItem("ph",res.data.user.ph);
                localStorage.setItem("id",res.data.user._id);
                navigate("/Profile");
            }
            }).catch(err => {
                alert(err);
            })


    }
    return(
        <div className="container">
                <img src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7892.jpg?w=2000" alt="LogIn" className="signupImage"/>
           
        <form className="signupForm">
                <h3 className="signuphead">LogIn</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" name="email" value={user.email} onChange={ valueChange } placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="pass" value={user.pass} onChange={ valueChange } placeholder="Enter password" />
                </div>
                <div className="loginButton">
                <button type="submit" className="btn btn-primary" onClick={ login }><a className="loginlink" href="/Profile">LogIn</a></button>
                <p className="forgot-password text-right">
                    Don't have an account? <a href="/">SignUp</a>
                </p>
                </div>
            </form>
            </div>
    );
}
