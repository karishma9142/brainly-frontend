import { Button } from "../buttom";
import { Input } from "../input";
import rocket from "../../assets/rocket.png";
import { useNavigate } from "react-router-dom";
import { useRef } from "preact/hooks";
import axios from "axios";
import { BACKEND_URL } from "../../config";

export function Signin() {

    const navigate = useNavigate();
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();

    async function signin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
                username,
                password
            })
            const jwt = response.data.token;
            localStorage.setItem("token" , jwt);
            navigate("/dashboard");
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
        <img className="fixed -ml-10 h-64 -rotate-45" src={rocket} alt="" />
        <div className="h-3/5 w-3/5 bg-white opacity-100 flex border border-white rounded-md shadow-2xl shadow-[#6e3e6e]">
            <div className="ml-14 mt-16  h-full w-3/6">
                <h1 className="font-bold text-[#544a88] text-3xl  ml-3">Sign in</h1>
                <div className="h-56 w-72 p-3 flex flex-col gap-5 mt-10">
                    {/* <Input placeholder="name" onchange={() => { }} /> */}
                    <Input refernce={usernameRef} placeholder="Username" />
                    <Input refernce={passwordRef} placeholder="Password" />
                    <Button size="md" varient="secondary" text="Submit" onclick={signin} />
                </div>
            </div>
            <div className="h-full w-4/6 rounded-l-xl rounded-md  flex flex-col bg-[#A899EF] opacity-100 items-center justify-center">
                <h1 className="font-bold text-white text-3xl mb-1">Hello , Welcome</h1>
                <h1 className="font-bold text-white text-3xl mb-2">To Brainly</h1>
                <h4 className=" text-white text-base mt-2 mb-2">Don't have an account</h4>
                <div className="w-52 flex items-center justify-center">
                    <Button size="md" varient="secondary" text="Sign up" onclick={() => { navigate("/signup") }} />
                </div>
            </div>
        </div>
    </div>
}