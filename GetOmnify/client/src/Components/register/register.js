import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./register.css"
import Swal from 'sweetalert2'
import axios from "axios"

function Page() {
    const redirect = useNavigate()
    const [showpass, setShowpass] = useState(true)
    const [inp, setInp] = useState({
        email: "",
        password: "",
        firstname: "",
        lastname: ""
    })
    console.log(inp);
    const changeinp = (e) => {
        setInp({ ...inp, [e.target.name]: e.target.value })
    }
    const onlogin = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3001/register", inp)
            .then((res) => {
                console.log(res);
                if (res.status === 201) {
                    Swal.fire(
                        'Registration Successful!',
                        'User Registred successfully',
                        'success',
                    )
                    redirect("/")
                }
            })
            .catch((err) => {
                console.log(err);
                Swal.fire(
                    'Error !!',
                    err.response.data.message,
                    'error',
                )
            })
    }
    return (
        <div className='login-page'>
            <section>
                <div className="form_dataregister">
                    <div className="form_heading">
                        <h1 style={{ color: "white" }}>User Register</h1>
                        
                    </div>
                    <form >
                        <div className="form_input">
                            <label htmlFor="firstname" style={{ color: "white" }}>First Name</label>
                            <input type="text" name="firstname"
                                value={inp.firstname}
                                onChange={changeinp}
                                placeholder='Enter Your First Name' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="lastname" style={{ color: "white" }}>Last Name</label>
                            <input type="text" name="lastname"
                                value={inp.lastname}
                                onChange={changeinp}
                                placeholder='Enter Your Last Name' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="email" style={{ color: "white" }}>Email</label>
                            <input type="email" name="email" id='email'
                                value={inp.email}
                                onChange={changeinp}
                                placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password" style={{ color: "white" }}>Password</label>
                            <div className="two">
                                <input type={!showpass ? "password" : "text"}
                                    name="password"
                                    value={inp.password}
                                    onChange={changeinp}
                                    placeholder='Enter Your Password' />
                                <div className="showpass" onClick={() => {
                                    setShowpass(!showpass)
                                }}>{(!showpass) ? "Show" : "Hide"}</div>

                            </div>
                        </div>
                        <button className="btn" onClick={onlogin} >Register</button>

                        <p style={{ color: "white" }} onClick={() => {
                            redirect("/login",)
                        }}>Already have an accout? Sign In</p>

                    </form>
                </div>
            </section >
            
        </div >
    )
}

export default Page