import { useRef } from "preact/hooks";
import { CrossIcon } from "../icons/crosIcon";
import { Button } from "./buttom";
import { Input } from "./input";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Popup({ open, onclose }: { open: any, onclose: () => void }) {

    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();
    const typeRef = useRef<HTMLInputElement>();
    
    async function Addcontent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        const type = typeRef.current?.value;

        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/content`, {
                title,
                link,
                type
            }, {
                headers: {
                     token: localStorage.getItem("token")
                }

            });
            localStorage.setItem("contentId" , String(response.data._id));
            console.log(response);
            console.log(response.data);
            console.log(response.data._id);
            console.log(String(response.data._id));
            alert(response.data.msg);
            onclose();
        } catch (error: any) {
            if (error.response && error.response.data?.msg) {
                alert(error.response.data.msg);
            } else {
                alert("Somthing went wrong")
            }
        }
    }

    return <div>
        {open && <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-pu600 opacity-40 ">   
        </div>
        <div className="relative bg-white h-56 w-72 border rounded-md p-3 flex flex-col gap-3 shadow-lg ">
                <div className="flex justify-between">
                    {"Add Content"}
                    <div onClick={onclose}>
                        <CrossIcon size="md" />
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <Input refernce={titleRef} placeholder={"Title"} />
                    <Input refernce={typeRef} placeholder={"Type"} />
                    <Input refernce={linkRef} placeholder={"Link"} />
                </div>
                <div className="flex justify-center">
                    <Button size="sm" varient="primary" text="Submit" onclick={Addcontent} />
                </div>
            </div>
            </div>}
    </div>
}
