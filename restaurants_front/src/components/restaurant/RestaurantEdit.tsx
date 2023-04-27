import { Button,
    Card,
    CardContent,
    IconButton,
    TextField,
    Select,
    MenuItem,
    CircularProgress
} from "@mui/material";
import { Container } from "@mui/system";
import {useEffect, useState} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import {Restaurant} from "../../models/Restaurant";
import Owner from "../../models/Owner";

export const RestaurantEdit = () => {
    const { restaurantID } = useParams();
    const navigate = useNavigate();

    const [restaurant, setRestaurant] = useState<Restaurant>({
        id: (typeof restaurantID === "string" ? parseInt(restaurantID) : -1),
        restaurant_name:"",
        description:"",
        menu_review:"",
        review:"",
        owner_id:1,
    });

    const editRestaurant = async (event: { preventDefault: () => void}) => {
        event.preventDefault();
        try {
            await axios.patch(`${BACKEND_API_URL}/restaurants/${restaurantID}/`, restaurant, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            navigate("/restaurant");
        }catch (error){
            console.log(error);
        }

    };


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
    return(
        <Container>
            <Card>
                <CardContent>
                    {loading && <CircularProgress />}
                    <IconButton component={Link} sx={{mr: 3}} to={`/restaurant`}>
                        <ArrowBackIcon/>
                    </IconButton>{" "}
                    <form onSubmit={ editRestaurant }>
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
                        <Button type="submit">Update Event Founder</Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};