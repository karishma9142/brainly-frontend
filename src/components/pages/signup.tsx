import { Button } from "../buttom";
import { Input } from "../input";
import rocket from "../../assets/rocket.png"

export function Signup() {
    return <div className="h-screen w-screen left-0 top-0 bg-[#FBD7FB] opacity-90 fixed flex justify-center items-center">
        <img className="fixed mr-20 h-64 rotate-12" src={rocket} alt="" />
        <div className="h-3/5 w-3/5 bg-white opacity-100 flex border border-white rounded-md shadow-2xl shadow-[#6e3e6e]">
            <div className="h-full w-3/6 rounded-r-xl rounded-md  flex flex-col bg-[#A899EF] opacity-100 items-center justify-center">
                <h1 className="font-bold text-white text-3xl mb-1">Hello , Welcome</h1>
                <h1 className="font-bold text-white text-3xl mb-2">To Brainly</h1>
                <h4 className=" text-white text-base mt-2 mb-2">Alread have an account</h4>
                <div className="w-52 flex items-center justify-center">
                    <Button size="md" varient="secondary" text="Sign in" onclick={() => { }} />
                </div>
            </div>
            <div className="ml-14 mt-10">
                <h1 className="font-bold text-[#544a88] text-3xl  ml-2">Sign up</h1>
                <div className="h-56 w-72 p-3 flex flex-col gap-5 mt-10">
                    <Input placeholder="name" onchange={() => { }} />
                    <Input placeholder="Email" onchange={() => { }} />
                    <Input placeholder="Password" onchange={() => { }} />
                    <Button size="md" varient="secondary" text="Submit" onclick={() => { }} />
                </div>
            </div>
        </div>
    </div>
}