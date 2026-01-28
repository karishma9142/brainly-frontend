import { Button } from "../buttom";
import { Input } from "../input";
import rocket from "../../assets/rocket.png"
import { useRef } from "preact/hooks";
import { BACKEND_URL } from "../../config";
import axios from "axios";
// import { Signin } from "./signin";
import { useNavigate } from "react-router-dom";
// import { forwardRef } from "react";

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    // const emialRef = useRef<HTMLInputElement>();

    async function signup() {
        try {
            const username = usernameRef.current?.value || "";
            const password = passwordRef.current?.value || "";

            const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
                username,
                password
            });
            navigate("/signin");
            alert(response.data.msg);
        } catch (error: any) {
            if (error.response && error.response.data?.msg) {
                alert(error.response.data.msg);
            } else {
                alert("Something went wrong");
            }

            console.error(error);
        }
    }


    return <div className="h-screen w-screen left-0 top-0 bg-[#FBD7FB] opacity-90 fixed flex justify-center items-center">
        <img className="fixed mr-20 h-64 rotate-12" src={rocket} alt="" />
        <div className="h-3/5 w-3/5 bg-white opacity-100 flex border border-white rounded-md shadow-2xl shadow-[#6e3e6e]">
            <div className="h-full w-3/6 rounded-r-xl rounded-md  flex flex-col bg-[#A899EF] opacity-100 items-center justify-center">
                <h1 className="font-bold text-white text-3xl mb-1">Hello , Welcome</h1>
                <h1 className="font-bold text-white text-3xl mb-2">To Brainly</h1>
                <h4 className=" text-white text-base mt-2 mb-2">Alread have an account</h4>
                <div className="w-52 flex items-center justify-center" >
                    <Button size="md" varient="secondary" text="Sign in" onclick={() => { navigate("/signin") }} />
                </div>
            </div>
            <div className="ml-14 mt-10">
                <h1 className="font-bold text-[#544a88] text-3xl  ml-2">Sign up</h1>
                <div className="h-56 w-72 p-3 flex flex-col gap-5 mt-10">
                    {/* <Input  placeholder="name"  /> */}
                    <Input refernce={usernameRef} placeholder="Username" />
                    <Input refernce={passwordRef} placeholder="Password" />
                    <Button size="md" varient="secondary" text="Submit" onclick={signup} />
                </div>
            </div>
        </div>
    </div>
}