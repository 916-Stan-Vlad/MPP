import './App.css'
import {RestaurantShowAll} from "./components/restaurant/RestaurantShowAll";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as React from "react";
import {AppHome} from "./components/AppHome";
import {AppNavigation} from "./components/AppNavigation";
import {RestaurantAdd} from "./components/restaurant/RestaurantAdd";
import {RestaurantDetails} from "./components/restaurant/RestaurantDetails";
import {RestaurantDelete} from "./components/restaurant/RestaurantDelete";
function App() {

  return (
    <React.Fragment>
        <Router>
            <AppNavigation/>
            <Routes>
                <Route path="/" element={<AppHome />} />
                <Route path="/restaurant" element={<RestaurantShowAll />} />
                <Route path="/restaurant/add" element={<RestaurantAdd />} />
                <Route path="/restaurant/:restaurantId/details" element={<RestaurantDetails />} />
                <Route path="/restaurant/:restaurantId/edit" element={<RestaurantDetails />} />
                <Route path="/restaurant/:restaurantId/delete" element={<RestaurantDelete />} />
            </Routes>
        </Router>
    </React.Fragment>
  )
}

export default App
