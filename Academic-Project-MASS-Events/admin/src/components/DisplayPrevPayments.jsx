import { TableBody, TableRow, TableCell } from "@mui/material";

export const DisplayPrevPayments = (props) => {

    let totalPaid = 0;

    return (
        <TableBody>
            <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>
                    <p>{props.event.date}</p>
                    <p>{props.event.time}</p>
                </TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>
                    {props.event.eventname}
                </TableCell>
            </TableRow>
            {props.event.payments.length ?
                props.event.payments.map((payment) => {
                    totalPaid += payment.wage;
                    return (
                        <TableRow key={payment._id} style={{ backgroundColor: '#e5e5e5' }}>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell>{payment.username}</TableCell>
                            <TableCell>{payment.category}</TableCell>
                            <TableCell>{payment.phone}</TableCell>
                            <TableCell>{payment.wage}</TableCell>
                        </TableRow>
                    );
                })
                :
                <TableRow style={{ backgroundColor: '#e5e5e5' }}>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>No data found</TableCell>
                </TableRow>
            }
            
            <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>
                    <p>Total amount paid: {totalPaid}</p>
                </TableCell>
            </TableRow>
        </TableBody>
    );
}