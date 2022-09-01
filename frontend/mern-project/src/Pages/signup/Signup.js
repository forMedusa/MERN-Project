import React, {useState} from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "../signup/signup.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
export default function Signup(){
    const [user, setUser]= useState({
        name:"",
        email:"",
        pass:"",
        cpass:"",
        gender:"",
        age:0,
        ph:0,
        dob:"dd/mm/yyyy"
    })
    let navigate = useNavigate();
    const valueChange = event => {
        const {name, value}=event.target
        setUser({
            ...user,
            [name]:value
        })
    }
    const signup = (e) => {
        e.preventDefault();
        const {name, email,pass,cpass,gender,age,ph,dob}= user
        if(name && email && pass &&(pass===cpass)){
            axios.post("http://localhost:3000/signup", user)
            .then(res => {
                alert(res.data.message);
                if(res.data.message=="Data Inserted in Database"){
                    localStorage.setItem("email", user.email);
                localStorage.setItem("name",res.data.user.name);
                localStorage.setItem("gender",res.data.user.gender);
                localStorage.setItem("age",res.data.user.age);
                localStorage.setItem("dob",res.data.user.dob);
                localStorage.setItem("ph",res.data.user.ph);
                    navigate("/Profile");
                }
            })
        } else{
            alert("Invalid Input");
        }
    }
    return(
        <div className="container">
            {/* {console.log("user", user)} */}
                <img src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7875.jpg?w=360" alt="Signup Image" className="signupImage"/>
           
        <form className="signupForm">
                <h3 className="signuphead">SignUp</h3>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" name="name" value={user.name} onChange={ valueChange } placeholder="Name" />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" name="email" value={user.email} onChange={ valueChange } placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="pass" value={user.pass} onChange={ valueChange } placeholder="Enter password" />
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" name="cpass" value={user.cpass} onChange={ valueChange } placeholder="Confirm password" />
                </div>
                <div className="signupButton">
                <button type="submit" className="btn btn-primary" onClick={ signup }>Register</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/Login">log in?</a>
                </p>
                </div>
            </form>
            </div>
    );
}
