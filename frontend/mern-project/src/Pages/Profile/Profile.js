import React, {useState} from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../Profile/Profile.css';
import { useNavigate } from "react-router-dom";
export default function Login() {
    const [user, setUser]= useState({
        email: localStorage.getItem("email"),
        name:localStorage.getItem("name"),
        gender:localStorage.getItem("gender"),
        age:localStorage.getItem("age"),
        ph:localStorage.getItem("ph"),
        dob:localStorage.getItem("dob")
    })
    let navigate= useNavigate();
    const logout=(e)=>{
        e.preventDefault();
        localStorage.clear();
        navigate("/");
    }
    const editData=(e)=>{
        e.preventDefault();
       this.setState({
        disabled:false
       })
    }
    const valueChange = event => {
        console.log(event.target.value)
        const {name, value}=event.target.value
        setUser({
            ...user,
            [name]:value
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
                        <label htmlFor="staticEmail" class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-10">
                            <input type="text" readOnly class="form-control" onChange={ valueChange } id="staticEmail" value={user.name} />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label htmlFor="staticEmail" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="staticEmail"  value={user.email} />
                        </div>
                    </div>
                    <fieldset class="form-group">
                        <div class="row">
                            <legend class="col-form-label col-sm-2 pt-0">Gender</legend>
                            <div class="col-sm-10" style={{ paddingLeft: 20 }}>
                            <input type="text" class="form-control" id="staticEmail"  value={user.gender}  />
                        </div>
                        </div>
                    </fieldset>
                    <div class="form-group row">
                        <label htmlFor="staticEmail" class="col-sm-2 col-form-label">Age</label>
                        <div class="col-sm-10">
                            <input type="number" class="form-control" id="staticEmail"  value={user.age} />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label htmlFor="staticEmail" class="col-sm-2 col-form-label">DOB</label>
                        <div class="col-sm-10">
                            <input type="date" class="form-control" id="staticEmail"  value={user.dob} />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label htmlFor="phone" class="col-sm-2 col-form-label">Number</label>
                        <div class="col-sm-10" style={{ paddingLeft: 20 }}>
                        <input type="tel" name="telphone"  pattern="[0-9]{10}"  class="form-control" value={user.ph} title="Ten digits code" />   
                        </div>
                    </div>
                    <div className="buttons">
                        <button class="btn btn-primary" onClick={editData} >Edit</button>
                        <button class="btn btn-success" >Submit</button>
                        <button class="btn btn-danger" onClick={logout}>Logout</button>

                    </div>
                </form>
            </div>
        </div>
        </>
    );
}

