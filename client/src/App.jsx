import {BrowserRouter, Routes, Route} from "react-router-dom";
import SignUp from "./pages/Signup";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Header from "./Components/Header";
import PrivateRoute from './Components/PrivateRoute';
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listings from "./pages/Listings";
import Search from "./pages/Search";

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/search" element={<Search/>}/>
      <Route path="/listing/:listingId" element={<Listings/>}/>
      <Route element={<PrivateRoute/>}>
        <Route path="/profile/:id" element={<Profile/>}/>
        <Route path="/create-listing" element={<CreateListing/>}/>
        <Route path="/update-listing/:listingId" element={<UpdateListing/>}/>
      </Route>
      <Route path="/sign-up" element={<SignUp/>}/>
      <Route path="/sign-in" element={<SignIn/>}/>
    </Routes>
    </BrowserRouter>
  )
}
