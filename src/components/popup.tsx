import { CrossIcon } from "../icons/crosIcon";
import { Button } from "./buttom";
import { Input } from "./input";

export function Popup({ open , onclose } : {open : any , onclose : () => void}) {
    return <div>
        {open && <div className="h-screen w-screen left-0 top-0 bg-pu600 opacity-40 fixed flex justify-center items-center">
            <div className="bg-white h-56 w-72 border rounded-md p-3 flex flex-col gap-3">
                <div className="flex justify-between">
                    {"Add Content"}
                    <div onClick={onclose}>
                    <CrossIcon size="md" />
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <Input placeholder={"Title"} onchange={()=>{}}/>
                    <Input placeholder={"Type"} onchange={()=>{}}/>
                    <Input placeholder={"Link"} onchange={()=>{}}/>
                </div>
                <div className="flex justify-center">
                    <Button size="sm" varient="primary" text="Submit" onclick={() => {}}/>
                </div>
            </div>
        </div>}
    </div>
}

