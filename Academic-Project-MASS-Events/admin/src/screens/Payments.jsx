import { useState, useEffect } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, styled } from "@mui/material";
import { BsCheckSquareFill, BsSquare } from "react-icons/bs";
import { getEventAttendance } from "../services/api.js";
import { useParams } from 'react-router';
import { payStaff } from "../services/api.js";

const Container = styled(Table)`
    width: 95%;
    margin: 5% auto 0 auto;
    background-color: #e5e5e5;
`

const THead = styled(TableRow)`
    background: #000000;
    & > th {
        color: #fff;
    }
`

const Payments = () => {

    const [event, setEvent] = useState([]);
    const [staffs, setStaffs] = useState([]);

    let total = 0;
    let totalPaid = 0;

    const params = useParams()

    useEffect(() => {
        getThisEvent();
    }, []);

    const getThisEvent = async () => {
        let response = await getEventAttendance(params.id);
        if (response) {
            setEvent(response.data.event);
            setStaffs(response.data.attendedStaffs);
        }
    }

    const payThisStaff = async (eventName, staff) => {
        let response = await payStaff(eventName, staff);
        if (response) {
            response.data.status === "success" ? 
            alert("Marked Payment successfully") : 
            alert("failed to mark payments");
        }
        getThisEvent();
    }

    return (
        <Container>
            <TableHead>
                <THead>
                    <TableCell>Date and Time(24hrs)</TableCell>
                    <TableCell>Event Name</TableCell>
                    <TableCell>User Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                </THead>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell style={{ fontWeight: 'bold' }}>
                        <p>{event.date}</p>
                        <p>{event.time}</p>
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>
                        {event.eventname}
                    </TableCell>
                </TableRow>
                {staffs && staffs.map((staff) => {
                    total += staff.wage;
                    if(event.payments.some((staffs) => staffs === staff._id)) {
                        totalPaid += staff.wage;
                    }
                    return (
                        <TableRow key={staff._id} style={{ backgroundColor: '#e5e5e5' }}>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell>{staff.username}</TableCell>
                            <TableCell>{staff.category}</TableCell>
                            <TableCell>{staff.phone}</TableCell>
                            <TableCell>{staff.wage}</TableCell>
                            <TableCell>
                                {event.payments.some((staffs) => staffs === staff._id) ?
                                    <BsCheckSquareFill style={{ color: '#4682b4', fontSize: 22 }} />
                                    :
                                    <BsSquare 
                                        style={{ color: '#4682b4', fontSize: 22 }} 
                                        onClick={() => payThisStaff(event._id, staff._id)} 
                                    />
                                }
                            </TableCell>
                        </TableRow>
                    );})
                }
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    {event.length !== 0 &&
                    <TableCell style={{ fontWeight: 'bold' }}>
                        <p>Staffs booked: {event.bookings.length}</p>
                        <p>Staffs attended: {event.attendance.length}</p>
                        <p>Staffs paid: {event.payments.length}</p>
                    </TableCell>}
                    <TableCell style={{ fontWeight: 'bold' }}>
                        <p>Total amount: {total}</p>
                        <p>Total amount paid: {totalPaid}</p>
                        <p>Balance: {total - totalPaid}</p>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Container>
    );
}

export default Payments;