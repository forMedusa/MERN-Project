import React, { useState } from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../Profile/Profile.css';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
export default function Profile() {
    const [show, setShow] = useState(false);


    const handleShow = () => setShow(true);
    const [user, setUser] = useState({
        email: localStorage.getItem("email"),
        name: localStorage.getItem("name"),
        gender: localStorage.getItem("gender"),
        age: localStorage.getItem("age"),
        ph: localStorage.getItem("ph"),
        dob: localStorage.getItem("dob"),
        id: localStorage.getItem("id")
    })
    const idd=user.id;
    const handleClose = () => {
        user.email = localStorage.getItem("email")
        user.name = localStorage.getItem("name")
        user.gender = localStorage.getItem("gender")
        user.age = localStorage.getItem("age")
        user.ph = localStorage.getItem("ph")
        user.dob = localStorage.getItem("dob")
        setShow(false);
    }
    const handleSaveChanges = () => {
        console.log("aaya");
        axios.put("https://mern-project-xyzsor.herokuapp.com/update",user)
        .then(res => {
            // console.log(res);
        }).catch(err =>{
            // console.log("ye hai error", err)
        })
        if(user.gender==="Male" || user.gender==="male" || user.gender==="Female" || user.gender==="female"){
        localStorage.clear();
        localStorage.setItem("email", user.email);
        localStorage.setItem("name", user.name);
        localStorage.setItem("gender", user.gender);
        localStorage.setItem("age", user.age);
        localStorage.setItem("dob", user.dob);
        localStorage.setItem("ph", user.ph);
        localStorage.setItem("id",idd);
        alert("Data Updated");
        setShow(false);
        }
        else{
            alert("Invalid Details");
        }
    }
    let navigate = useNavigate();
    const logout = (e) => {
        e.preventDefault();
        localStorage.clear();
        navigate("/");
    }
   
    const valueChange = event => {
        const { name, value } = event.target
        setUser({
            ...user,
            [name]: value
        })
    }
    return (
        <>
            <div className="head"><h1>Profile</h1></div>
            <div className="Profilecontainer">

                <img src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt="profilePic" width={100} />
                <div className="Profiledata">
                    <form>
                        <div class="form-group row">
                            <label  >Name: {user.name}</label>
                            {/* <div class="col-sm-10">
                            <input type="text" readOnly class="form-control" onChange={ valueChange } id="staticEmail" value={user.name} />
                        </div> */}
                        </div>
                        <div class="form-group row">
                            <label >Email: {user.email}</label>
                            {/* <div class="col-sm-10">
                            <input type="text" class="form-control" id="staticEmail"  value={user.email} />
                        </div> */}
                        </div>
                        {/* <fieldset class="form-group">
                        <div class="row">
                            <legend class="col-form-label col-sm-2 pt-0">Gender</legend>
                            <div class="col-sm-10" style={{ paddingLeft: 20 }}>
                            <input type="text" class="form-control" id="staticEmail"  value={user.gender}  />
                        </div>
                        </div>
                    </fieldset> */}
                        <div className="form-group row">
                            <label>Gender: {user.gender}</label>
                        </div>
                        <div class="form-group row">
                            <label>Age: {user.age}</label>
                            {/* <div class="col-sm-10">
                            <input type="number" class="form-control" id="staticEmail"  value={user.age} />
                        </div> */}
                        </div>
                        <div class="form-group row">
                            <label >DOB: {user.dob}</label>
                            {/* <div class="col-sm-10">
                            <input type="date" class="form-control" id="staticEmail"  value={user.dob} />
                        </div> */}
                        </div>
                        <div class="form-group row">
                            <label >Number: {user.ph}</label>
                            {/* <div class="col-sm-10" style={{ paddingLeft: 20 }}>
                        <input type="tel" name="telphone"  pattern="[0-9]{10}"  class="form-control" value={user.ph} title="Ten digits code" />   
                        </div> */}
                        </div>
                        <div className="buttons">
                            <Button variant="primary" onClick={handleShow}>
                                Edit
                            </Button>
                            {/* <button class="btn btn-success" >Submit</button> */}
                            <button class="btn btn-danger" onClick={logout}>Logout</button>

                        </div>
                    </form>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" name="name" value={user.name} onChange={valueChange} placeholder="Enter name" />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" name="email" value={user.email} onChange={valueChange} placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                        <label>Gender</label>
                        <input type="text" className="form-control" name="gender" value={user.gender} onChange={valueChange} placeholder="Enter your gender" />
                    </div>
                    <div className="form-group">
                        <label>Age</label>
                        <input type="number" className="form-control" name="age" value={user.age} onChange={valueChange} placeholder="Enter your age" />
                    </div>
                    <div class="form-group row">
                        <label >DOB</label>
                        <div class="col-sm-10">
                            <input type="date" class="form-control" name="dob" value={user.dob} onChange={valueChange} placeholder="Enter your DOB" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Number</label>
                        <input type="number" name="ph" pattern="[0-9]{10}" class="form-control" value={user.ph} onChange={valueChange} placeholder="Enter your number" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

