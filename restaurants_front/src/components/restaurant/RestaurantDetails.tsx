import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Restaurant} from "../../models/Restaurant";

export const RestaurantDetails = () => {
	const { restaurantId } = useParams();
	const [restaurant, setRestaurant] = useState<Restaurant>();

	useEffect(() => {
		const fetchCourse = async () => {
			// TODO: use axios instead of fetch
			// TODO: handle errors
			// TODO: handle loading state
			const response = await fetch(`${BACKEND_API_URL}/restaurants/${restaurantId}`);
			const restaurant = await response.json();
			setRestaurant(restaurant);
		};
		fetchCourse();
	}, [restaurantId]);

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/restaurant`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h1>Restaurant Details</h1>
					<p>Course Name: {restaurant?.restaurant_name}</p>
					<p>Course Description: {restaurant?.description}</p>
                    <p>Course Description: {restaurant?.menu_review}</p>
                    <p>Course Description: {restaurant?.review}</p>
					<p>Course Teacher Name: {restaurant?.owner?.owner_name}</p>
				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/courses/${restaurantId}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/courses/${restaurantId}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};