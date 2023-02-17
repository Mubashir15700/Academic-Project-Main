import { useState, useEffect } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, styled } from "@mui/material";
import { getEvents } from "../services/api.js";

const Container = styled(Table)`
    width: 95%;
    margin: 5% auto 0 auto;
    background-color: darkgray;
`

const THead = styled(TableRow)`
    background: #000000;
    & > th {
        color: #fff;
    }
`

const Payments = () => {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllEvents();
    }, []);

    const getAllEvents = async () => {
        let response = await getEvents();
        response && setEvents(response.data);
        setLoading(false);
    }

    return (
        <Container>
            <TableHead>
                <THead>
                    <TableCell>Date and Time</TableCell>
                    <TableCell>Event Name</TableCell>
                    <TableCell>Staff ID</TableCell>
                    <TableCell>User Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Actions</TableCell>
                </THead>
            </TableHead>

            {loading ? 
                <TableBody>
                    <TableRow>
                        <TableCell>Loading...</TableCell>
                    </TableRow>
                </TableBody>
            :
            events.length ?
                events.map((event) => {
                    return (
                        <TableBody key={event._id}>
                            <TableRow>
                                <TableCell style={{ fontWeight: 'bold' }}><p>{event.date}</p> <p>{event.time}</p></TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>{event.eventname}</TableCell>
                            </TableRow>
                            {event.payments.length ?
                                event.payments.map((attendance) => {
                                    return (
                                        <TableRow key={attendance._id} style={{ backgroundColor: '#e5e5e5' }}>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell>{attendance._id}</TableCell>
                                            <TableCell>{attendance.username}</TableCell>
                                            <TableCell>{attendance.category}</TableCell>
                                            <TableCell>{attendance.phone}</TableCell>
                                            <TableCell>{attendance.wage}</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    );
                                })
                            :
                            <TableRow style={{ backgroundColor: '#e5e5e5' }}>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell>No data found</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            }
                        </TableBody>
                    );
                }) 
            :
            <TableBody>
                <TableRow>
                    <TableCell>No data found</TableCell>
                </TableRow>
            </TableBody>
            }
        </Container>
    );
}

export default Payments;