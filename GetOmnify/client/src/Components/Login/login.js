import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./login.css"
import Swal from 'sweetalert2'
import axios from "axios"

function Page() {
    const redirect = useNavigate()
    const [showpass, setShowpass] = useState(true)
    const [inp, setInp] = useState({
        email: "",
        password: ""
    })
    console.log(inp);
    const changeinp = (e) => {
        setInp({ ...inp, [e.target.name]: e.target.value })
    }
    const onlogin = (e) => {
        e.preventDefault()
        const { email, password } = inp
        if (email === "") {
            Swal.fire(
                'Error !!',
                "Email is required",
                'warning',
            )
        }
        else if (password === "") {
            Swal.fire(
                'Error !!',
                "Password is required",
                'warning',
            )
        }
        else {
            axios.post("http://localhost:3001/login", inp)
                .then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        Swal.fire(
                            'Successful!',
                            'Login successfully',
                            'success',
                        )
                        localStorage.setItem("Userid", res.data)
                        redirect("/showevents")
                        window.location.reload()
                    }
                })
                .catch((err) => {
                    Swal.fire(
                        'Error !!',
                        err.response.data.message,
                        'error',
                    )
                })
        }
    }
    return (
        <div className='login-page'>
            <section>
                <div className="form_datalogin">
                    <div className="form_heading">
                        <h1 style={{ color: "white" }}>User Log In</h1>
                        <h4 style={{ color: "white" }}>Hi, we are glad you back. Please login.</h4>
                    </div>
                    <form >
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
                        <button className="btn" onClick={onlogin} >Login</button>

                        <p style={{ color: "white" }} onClick={() => {
                            redirect("/register", { state: { heading: "Register" } })
                        }}>Don't have an accout? Sign Up</p>

                    </form>
                </div>
            </section >

        </div >
    )
}

export default Page