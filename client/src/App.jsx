import {BrowserRouter, Routes, Route} from "react-router-dom";
import SignUp from "./pages/Signup";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Header from "./Components/Header";

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>
      <Route path="/sign-in" element={<SignIn/>}/>
    </Routes>
    </BrowserRouter>
  )
}
