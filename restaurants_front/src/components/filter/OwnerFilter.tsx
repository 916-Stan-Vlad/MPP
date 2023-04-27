import {useEffect, useState} from "react";
import {BACKEND_API_URL} from "../../constants";
import {Link, useParams} from "react-router-dom";
import { Container } from "@mui/system";
import {
    CircularProgress,
    IconButton, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow,
    Tooltip,
    Paper
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Owner from "../../models/Owner";


export const OwnerFilter = ()=> {
    const [loading, setLoading] = useState(false);
    const [owners, setOwners] = useState<Owner[]>([]);
    const [order, setOrder] = useState("asc");
    const {input} = useParams();

    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/owners/filter/${input}`)
            .then((response) => response.json())
            .then((data) => {
                setOwners(data);
                setLoading(false);
            });
    }, [input]);

    const sorting = () => {
        if (order === "asc") {
            const sorted = [...owners].sort((owner1,owner2) =>
                    owner1.owner_name.toLowerCase() > owner2.owner_name.toLowerCase() ? 1 : -1
            );
            setOwners(sorted);
            setOrder("des");
        }
        if (order === "des") {
            const sorted = [...owners].sort((owner1,owner2) =>
                    owner1.owner_name.toLowerCase() < owner2.owner_name.toLowerCase() ? 1 : -1
            );
            setOwners(sorted);
            setOrder("asc");
        }
    }

  return(
        <Container>
            <h1> Owners with fortune grater than {input} </h1>
            { loading && <CircularProgress/>}
            { !loading && owners.length === 0 && <p> No owners found </p>}
            { !loading && (
                <IconButton component={Link} sx={{mr: 3}} to={`/owner`}>

                    <Tooltip title="Back" arrow>
                        <ArrowBackIcon color="primary"/>
                    </Tooltip>
                </IconButton>
            )}

            { !loading && owners.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
								<TableCell>#</TableCell>
								<TableCell  onClick={() => sorting()} align="right">Name</TableCell>
								<TableCell align="right">Age</TableCell>
								<TableCell align="right">Fortune</TableCell>
								<TableCell align="right">Birth Location</TableCell>
								<TableCell align="right">Native Language</TableCell>
								<TableCell align="center">Operations</TableCell>
							</TableRow>
                        </TableHead>

                        <TableBody>
                            { owners.map((owner, index) => (
                                <TableRow key={owner.id}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {owner.owner_name}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {owner.owner_age}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {owner.owner_fortune}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {owner.owner_birth_location}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {owner.owner_native_language}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
}