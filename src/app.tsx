import { BrowserRouter , Routes,Route } from "react-router-dom";
import { Signup } from "./components/pages/signup";
import { Signin } from "./components/pages/signin";
import { Dashboard } from "./components/pages/dashboard";
import {Landing} from "./components/pages/landingPage";

export function App(){
  return <BrowserRouter>
  <Routes>
    <Route path="/landing" element={<Landing/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/signin" element={<Signin/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
  </Routes>
  </BrowserRouter>
}