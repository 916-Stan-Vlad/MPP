import {Link, useNavigate} from "react-router-dom";
import {Restaurant} from "../../models/Restaurant";
import Owner from "../../models/Owner";
import axios from "axios";
import { useEffect, useState} from "react";
import { Container } from "@mui/system";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {
	Button,
	Card,
	CardActions,
	CardContent,
	IconButton,
	TextField,
	CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {BACKEND_API_URL} from "../../constants";


export const RestaurantAdd = () => {
    const navigate = useNavigate();

    const [restaurant,setRestaurant] = useState<Restaurant>({
        restaurant_name:"",
        description:"",
        menu_review:"",
        review:"",
        owner_id:1,
    });

	const [loading, setLoading] = useState(false);
   	const [owners,setOwner] = useState<Owner[]>([])

    useEffect(() => {
		setLoading(true);
		fetch(`${BACKEND_API_URL}/owners/`)
			.then((response) => response.json())
			.then((data) => {
				setOwner(data);
				setLoading(false);
			});
	}, []);
   //
   //  const lodash = require("lodash");
   //  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 500), []);

    // useEffect(() => {
	// 	return () => {
	// 		debouncedFetchSuggestions.cancel();
	// 	};
	// }, [debouncedFetchSuggestions]);


    const addRestaurant = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			await axios.post(`${BACKEND_API_URL}/restaurants/`, restaurant, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
			navigate("/restaurant");
		} catch (error) {
			console.log(error);
		}
	};



    return (
		<Container>
			<Card>
				<CardContent>
					{loading && <CircularProgress />}
					<IconButton component={Link} sx={{ mr: 3 }} to={`/restaurant`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={addRestaurant}>
						<TextField
							id="restaurant_name"
							label="Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setRestaurant({ ...restaurant, restaurant_name: event.target.value })}
						/>
						<TextField
							id="description"
							label="Description"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setRestaurant({ ...restaurant, description: event.target.value })}
						/>
						<TextField
							id="menu_review"
							label="Menu review"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setRestaurant({ ...restaurant, menu_review: event.target.value })}
						/>

						<TextField
							id="Review"
							label="Review"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setRestaurant({ ...restaurant, review: event.target.value })}
						/>

						<Select
							labelId="owners_id"
							id="owner_id"
							value={restaurant.owner_id}
							label="Owner"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={ (event) => {
								const ownerId = event.target.value as number;
								setRestaurant({ ...restaurant, owner_id: ownerId});
	   							}
							}
						>
							{owners.map((owner:Owner)=>(
								<MenuItem key={owner.id} value={owner.id}>
									{owner.owner_name}
								</MenuItem>
							))
							}
						</Select>
						<Button type="submit">Add restaurant</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
}

