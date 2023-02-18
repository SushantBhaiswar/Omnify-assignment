import axios from 'axios'
import React, { useState } from 'react'
import "./CreateEvent.css"
import Swal from 'sweetalert2'
import { useLocation, useNavigate } from 'react-router'

function CreateEvent() {
    const { state } = useLocation()
    const redirect = useNavigate()
    const [input, setInput] = useState({
        Name: "",
        Description: "",
        StartTime: "",
        EndTime: "",
        Day: "",
    })
    const onchange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const submitEvent = (e) => {
        e.preventDefault()
        const { Name, Description, StartTime, EndTime, Day } = input
        if (Name === "") {
            Swal.fire(
                'Error !!',
                "Name is required",
                'warning',
            )
        }
        else if (Description === "") {
            Swal.fire(
                'Error !!',
                "Description is required",
                'warning',
            )
        }
        else if (StartTime === "") {
            Swal.fire(
                'Error !!',
                "StartTime is required",
                'warning',
            )
        }
        else if (EndTime === "") {
            Swal.fire(
                'Error !!',
                "EndTime is required",
                'warning',
            )
        }
        else if (Day === "") {
            Swal.fire(
                'Error !!',
                "Day is required",
                'warning',
            )
        }
        else {
            input.Userid = state.Userid
            console.log(input);
            axios.post("http://localhost:3001/createEvent", input)
                .then((res) => {
                    if (res.status === 201) {
                        Swal.fire(
                            'Successful!',
                            'Event Created successfully',
                            'success',
                        )
                        console.log(res.data);
                        redirect("/showevents",)
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
        <div className='event-page'>
            <section>
                <div className="form_dataevent">
                    <div className="form_heading">
                        <h1 style={{ color: "Red" }}>Create Event</h1>
                    </div>
                    <form >
                        <div className="form_input">
                            <label style={{ color: "white" }}>Name</label>
                            <input type="text" name="Name"
                                placeholder='Enter Event Name' value={input.Name} onChange={onchange} />
                        </div>
                        <div className="form_input">
                            <label style={{ color: "white" }}>Description</label>
                            <input type="text" name="Description"
                                placeholder='Enter Description ' value={input.Description} onChange={onchange} />
                        </div>
                        <div className="form_input">
                            <label style={{ color: "white" }}>Start Time</label>
                            <input type="time" name="StartTime" value={input.StartTime} onChange={onchange}
                            />
                        </div>
                        <div className="form_input">
                            <label style={{ color: "white" }}>End Time</label>
                            <input type="time" name="EndTime" value={input.EndTime} onChange={onchange}
                            />
                        </div>
                        <div className="form_input">
                            <label style={{ color: "white" }}>Day </label>
                            <select name="Day" value={input.Day} onChange={onchange}>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </select>
                        </div>
                        <button className="btn" onClick={submitEvent}  >CREATE</button>

                    </form>
                </div>
            </section >

        </div >
    )
}

export default CreateEvent