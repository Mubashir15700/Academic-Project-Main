import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FormControl, FormGroup, InputLabel, Input, styled, Button } from '@mui/material';
import { addEvent } from "../services/api";

const Container = styled(FormGroup)`
    width: 50%;
    margin: 7% auto 0 auto;
    & > div {
        margin-top: 8px;
    }
`

const defaultValue = {
    date: '',
    time: '',
    duration: '',
    eventname: '',
    location: '',
    reqstaffs: '',
}

const AddEvent = () => {

    const [event, setEvent] = useState(defaultValue);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value });
    }

    const addNewEvent = async () => {
        let response = await addEvent(event);
        if (response) {
            response.data.status === "success" ? navigate("/") : alert(response.data.message);
        }
    }

    return (
        <Container>
            <FormControl>
                <InputLabel>Date</InputLabel><br /><br />
                <Input type="date" onChange={(e) => handleChange(e)} name="date" />
            </FormControl>
            <FormControl>
                <InputLabel>Time</InputLabel><br /><br />
                <Input type="time" onChange={(e) => handleChange(e)} name="time" />
            </FormControl>
            <FormControl>
                <InputLabel>Duration(hrs)</InputLabel><br /><br />
                <Input type="number" onChange={(e) => handleChange(e)} name="duration" />
            </FormControl>
            <FormControl>
                <InputLabel>Event Name</InputLabel>
                <Input onChange={(e) => handleChange(e)} name="eventname" />
            </FormControl>
            <FormControl>
                <InputLabel>Location</InputLabel>
                <Input onChange={(e) => handleChange(e)} name="location" />
            </FormControl>
            <FormControl>
                <InputLabel>Required Staffs</InputLabel>
                <Input type="number" onChange={(e) => handleChange(e)} name="reqstaffs" />
            </FormControl>
            <FormControl>
                <Button variant='contained' onClick={() => addNewEvent()}>Add Event</Button>
            </FormControl>
        </Container>
    );
}

export default AddEvent;