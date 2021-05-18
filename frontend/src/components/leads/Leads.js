import React, {useState, useEffect, Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getLeads, deleteLead} from "../../actions/leads";
import {Table, TableBody, TableCell, TableHead,makeStyles, TableRow, Button} from "@material-ui/core";
import Alert from "../layouts/Alert";

const useStyle = makeStyles(() => ({
    oddRow: {
        backgroundColor: "#dadde0"
    },
    evenRow: {
        backgroundColor: "white"
    },
    head: {
        fontWeight: "bold",
        fontSize: "200px"
    }
}))

const Leads = () => {
    const [leadsData, setLeadsData] = useState([])
    const dispatch = useDispatch()
    const leads = useSelector((state) => state.leads.leads)
    const rowStyle = useStyle()

    useEffect(() => {
        dispatch(getLeads())
    }, [])

    useEffect(() => {
        setLeadsData(leads)
    }, [leads])

    const deleteLeadButton = (id) => {
        dispatch(deleteLead(id))
    }

    return (
        <Fragment>
            <Alert/>
            <h1>Leads</h1>
            <Table>
                <TableHead>
                    <TableRow className={rowStyle.head}>
                        <TableCell>ID&nbsp;</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Message</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {leadsData.map((row, index) => (
                        <TableRow key={row.id} className = {index%2 ? rowStyle.oddRow : rowStyle.evenRow}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.message}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="secondary" onClick={() => deleteLeadButton(row.id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Fragment>
    )
}

export default Leads