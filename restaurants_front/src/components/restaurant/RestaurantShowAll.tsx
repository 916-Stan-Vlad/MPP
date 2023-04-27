import {useEffect, useState} from "react";
import {Restaurant} from "../../models/Restaurant";
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
	Tooltip,
	//TextField,
	Button,
} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";

export const RestaurantShowAll= () => {

	const [loading, setLoading] = useState(false);
	const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const navigate = useNavigate();

	useEffect(() => {
		setLoading(true);
		fetch(`${BACKEND_API_URL}/restaurants/`)
			.then((response) => response.json())
			.then((data) => {
				setRestaurants(data);
				setLoading(false);
			});
	}, []);


	let handleClick = () => {
		 navigate(`/owner`)
    }


  return (
      <Container>
			<h1>All restaurants</h1>
		  	<div>
            <Button onClick={handleClick} sx={{ mr: 3 }}  variant="contained" style={{color:"whitesmoke"}}>
                Owners
            </Button>
            </div>

			{loading && <CircularProgress />}
			{!loading && restaurants.length === 0 && <p>No restaurants found</p>}
			{!loading && (
				<IconButton component={Link} sx={{ mr: 3 }} to={`/restaurant/add`}>
					<Tooltip title="Add a new restaurant" arrow>
						<AddIcon color="primary" />
					</Tooltip>
				</IconButton>
			)}
			{!loading && restaurants.length > 0 && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>#</TableCell>
								<TableCell align="right">Name</TableCell>
								<TableCell align="right">Description</TableCell>
								<TableCell align="right">Menu review</TableCell>
								<TableCell align="right">Review</TableCell>
								<TableCell align="right">Owner name</TableCell>
								<TableCell align="center">Operations</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{restaurants.map((restaurant:Restaurant, index) => (
								<TableRow key={restaurant.id}>
									<TableCell component="th" scope="row">
										{index + 1}
									</TableCell>
									<TableCell component="th" scope="row">
										<Link to={`/restaurant/${restaurant.id}/details`} title="View restaurant details">
											{restaurant.restaurant_name}
										</Link>
									</TableCell>
									<TableCell align="right">{restaurant.description}</TableCell>
									<TableCell align="right">{restaurant.menu_review}</TableCell>
									<TableCell align="right">{restaurant.review}</TableCell>
									<TableCell align="right">{restaurant.owner?.owner_name}</TableCell>
									<TableCell align="right">
										<IconButton
											component={Link}
											sx={{ mr: 3 }}
											to={`/restaurant/${restaurant.id}/details`}>
											<Tooltip title="View restaurant details" arrow>
												<ReadMoreIcon color="primary" />
											</Tooltip>
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/restaurant/${restaurant.id}/edit`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/restaurant/${restaurant.id}/delete`}>
											<DeleteForeverIcon sx={{ color: "red" }} />
										</IconButton>
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

