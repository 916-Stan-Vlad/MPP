import {useEffect, useState} from "react";
import {Restaurant} from "../../models/Restaurant";
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
export const RestaurantMenuPageFilter = ()=> {
    const [loading, setLoading] = useState(false);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [order, setOrder] = useState("asc");
    const {input} = useParams();

    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/restaurants/`)
            .then((response) => response.json())
            .then((data) => {
                setRestaurants(data);
                setLoading(false);
            });
    }, [input]);


    const sorting = () => {
        if (order === "asc") {
            const sorted = [...restaurants].sort((restaurant1,restaurant2) =>
                    restaurant1.restaurant_name.toLowerCase() > restaurant2.restaurant_name.toLowerCase() ? 1 : -1
            );
            setRestaurants(sorted);
            setOrder("des");
        }
        if (order === "des") {
            const sorted = [...restaurants].sort((restaurant1,restaurant2) =>
                    restaurant1.restaurant_name.toLowerCase() < restaurant2.restaurant_name.toLowerCase() ? 1 : -1
            );
            setRestaurants(sorted);
            setOrder("asc");
        }
    }


  return(
        <Container>

            <h1> Event Founders with rating grater than {input} </h1>
            { loading && <CircularProgress/>}
            { !loading && restaurants.length === 0 && <p> No Founders found </p>}
            { !loading && (
                <IconButton component={Link} sx={{mr: 3}} to={`/restaurant`}>

                    <Tooltip title="Back" arrow>
                        <ArrowBackIcon color="primary"/>
                    </Tooltip>
                </IconButton>
            )}

            { !loading && restaurants.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
								<TableCell>#</TableCell>
								<TableCell  onClick={() => sorting()} align="right">Name</TableCell>
								<TableCell align="right">Description</TableCell>
								<TableCell align="right">Menu review</TableCell>
								<TableCell align="right">Review</TableCell>
								<TableCell align="right">Owner name</TableCell>
								<TableCell align="center">Operations</TableCell>
							</TableRow>
                        </TableHead>

                        <TableBody>
                            { restaurants.map((restaurant, index) => (
                                <TableRow key={restaurant.id}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {restaurant.restaurant_name}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {restaurant.description}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {restaurant.menu_review}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {restaurant.review}
                                    </TableCell>
                                    <TableCell align={"right"}>
                                        <IconButton component={Link} sx={{mr: 3}} to={`/restaurant/${restaurant.id}/edit`}>
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr: 3}} to={`/restaurant/${restaurant.id}/delete`}>
                                            <DeleteForeverIcon sx={{color: "red"}}/>
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
}