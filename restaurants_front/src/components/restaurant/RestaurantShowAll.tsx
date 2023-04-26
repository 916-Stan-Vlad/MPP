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
} from "@mui/material";
import { Link } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
export const RestaurantShowAll= () => {
  // const [restaurants, setRestaurants] = useState([]);
  //
  // useEffect(() => {
	// 	fetch('http://127.0.0.1:8000/restaurants/' )
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			console.log(data);
	// 			setRestaurants(data);
	// 		});
	// }, []);
  //
  // if (restaurants.length === 0) {
	// 	return <div>No restaurants</div>;
	// }
	const [loading, setLoading] = useState(false);
	const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

	useEffect(() => {
		setLoading(true);
		fetch(`${BACKEND_API_URL}/restaurants/`)
			.then((response) => response.json())
			.then((data) => {
				setRestaurants(data);
				setLoading(false);
			});
	}, []);


  return (
    // <div className="App">
    //     <h1>
    //         Restaurant list
    //     </h1>
    //     <table>
    //         <tr>
    //             <th>#</th>
    //             <th>Restaurant name</th>
    //             <th>Description</th>
    //             <th>Menu review</th>
    //             <th>Review</th>
    //             <th>Owner</th>
    //         </tr>
    //         {restaurants.map((restaurant:Restaurant, index)=>(
    //             <tr key={index}>
    //                 <td>{index}</td>
    //                 <td>{restaurant.restaurant_name}</td>
    //                 <td>{restaurant.description}</td>
    //                 <td>{restaurant.menu_review}</td>
    //                 <td>{restaurant.review}</td>
    //                 <td>{restaurant.owner?.owner_name}</td>
    //             </tr>
    //         ))
    //         }
    //     </table>
    // </div>
      <Container>
			<h1>All restaurants</h1>

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

