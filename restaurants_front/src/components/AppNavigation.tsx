import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";///import {useLocation} from "react-router-dom";
import RestaurantSharpIcon from '@mui/icons-material/RestaurantSharp';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
export const AppNavigation = () =>{
    const location = useLocation();
	const path = location.pathname;


    return(
            <Box sx={{ flexGrow: 10 }}>
                <AppBar position="static"  sx={{ marginBottom: "10px" }}>
                    <Toolbar>
                        <IconButton
                            component={Link}
                            to="/"
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="school"
                            sx={{ mr: 2 }}>
                            <HomeSharpIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ mr: 5 }}>
                            EatIT
                        </Typography>
                        <Button
                            variant={path.startsWith("/restaurant") ? "outlined" : "text"}
                            to="/restaurant"
                            component={Link}
                            color="inherit"
                            sx={{ mr: 5 }}
                            startIcon={<RestaurantSharpIcon />}>
                            Restaurants
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
    );
};