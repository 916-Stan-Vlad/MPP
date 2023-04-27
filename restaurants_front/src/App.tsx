import './App.css'
import {RestaurantShowAll} from "./components/restaurant/RestaurantShowAll";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as React from "react";
import {AppHome} from "./components/AppHome";
import {AppNavigation} from "./components/AppNavigation";
import {RestaurantAdd} from "./components/restaurant/RestaurantAdd";
import {RestaurantDetails} from "./components/restaurant/RestaurantDetails";
import {RestaurantDelete} from "./components/restaurant/RestaurantDelete";
import {RestaurantMenuPageFilter} from "./components/filter/RestaurantMenuPageFilter";
import {OwnerShowAll} from "./components/owner/OwnerShowAll";
import {OwnerFilter} from "./components/filter/OwnerFilter";
import {RestaurantEdit} from "./components/restaurant/RestaurantEdit";
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
                <Route path="/restaurant/:restaurantId/edit" element={<RestaurantEdit />} />
                <Route path="/restaurant/:restaurantId/delete" element={<RestaurantDelete />} />

                <Route path="/restaurant-filter/:input/" element={<RestaurantMenuPageFilter />} />
                <Route path="/owner" element={<OwnerShowAll />} />
                <Route path="/owner-filter/:input/" element={<OwnerFilter />} />
            </Routes>
        </Router>
    </React.Fragment>
  )
}

export default App
