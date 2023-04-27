import {useEffect, useState} from "react";
import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	CircularProgress,
	Container,
	IconButton,
	TextField,
    Tooltip,
	Button,
} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Owner from "../../models/Owner";

export const OwnerShowAll= () => {

	const [loading, setLoading] = useState(false);
	const [owners, setOwners] = useState<Owner[]>([]);
    let[input, setInput] = useState<number | undefined>()
    const navigate = useNavigate();

	useEffect(() => {
		setLoading(true);
		fetch(`${BACKEND_API_URL}/owners/`)
			.then((response) => response.json())
			.then((data) => {
				setOwners(data);
				setLoading(false);
			});
	}, []);


	let handleClick = () => {
        if (input !== undefined){
            navigate(`/owner-filter/${input}/`)
        }else {
            alert("Invalid owner fortune!")
        }
    }


  return (
      <Container>
			<h1>All owners</h1>
		  	<div style={{ display: "flex", alignItems: "center", marginLeft: "700px", marginBottom: "-30px" }}>
            <TextField
                label="Owner fortune..."
                onChange={(event) => {
						setInput( parseInt(event.target.value))}}
                InputProps={{ style: { color: "whitesmoke" } }}
                InputLabelProps={{style: {color: 'darkgrey'}}}
                style={{ marginRight: "16px", color:'whitesmoke' }}
            />
            <Button onClick={handleClick} sx={{ mr: 3 }}  variant="contained" style={{color:"whitesmoke"}}>
                Filter
            </Button>
            </div>


			{loading && <CircularProgress />}
			{!loading && owners.length === 0 && <p>No owners found</p>}
             { !loading && (
                <IconButton component={Link} sx={{mr: 3}} to={`/restaurant`}>

                    <Tooltip title="Back" arrow>
                        <ArrowBackIcon color="primary"/>
                    </Tooltip>
                </IconButton>
            )}
			{!loading && owners.length > 0 && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="right">Name</TableCell>
								<TableCell align="right">Age</TableCell>
								<TableCell align="right">Fortune</TableCell>
								<TableCell align="right">Birth Location</TableCell>
								<TableCell align="right">Native Language</TableCell>
								<TableCell align="center">Operations</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{owners.map((owner:Owner, index) => (
								<TableRow key={owner.id}>
									<TableCell component="th" scope="row">
										{index + 1}
									</TableCell>
                                    <TableCell align="right">{owner.owner_name}</TableCell>
									<TableCell align="right">{owner.owner_age}</TableCell>
									<TableCell align="right">{owner.owner_fortune}</TableCell>
									<TableCell align="right">{owner.owner_birth_location}</TableCell>
									<TableCell align="right">{owner.owner_native_language}</TableCell>
									<TableCell align="right">
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</Container>
	);
};

