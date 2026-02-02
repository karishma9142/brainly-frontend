import { BrowserRouter , Routes,Route } from "react-router-dom";
import { Signup } from "./components/pages/signup";
import { Signin } from "./components/pages/signin";
import { Dashboard } from "./components/pages/dashboard";
import {Landing} from "./components/pages/landingPage";
import { createContext } from "preact";

export function App(){
  const AppContext = createContext<any>(null);
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<Landing/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/signin" element={<Signin/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
  </Routes>
  </BrowserRouter>
}