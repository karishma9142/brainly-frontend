import { DocumentIcon } from "../icons/documentIcon";
import { ShareIcon } from "../icons/shareIcon";
import { DeleteIcon } from "../icons/deleteIcon";
import { YoutubeIcon } from "../icons/youtubeIcon";
import { TwitterIcon } from "../icons/twitterIcon";
import { BACKEND_URL } from "../config";
import axios from "axios";

interface Cardprops {
    title: string,
    link: string,
    type: "twitter" | "youtube" | "document",
    _id : string
}

async function deleteContenet(_id:string){
    const contentId = _id;
    try {
        const response = await axios.delete(`${BACKEND_URL}/api/v1/content` , {
            data: { contentId },
            headers: {
                token: localStorage.getItem("token"),
            }
            });
        alert(response.data.msg);
    } catch (error:any) {
        if (error.response && error.response.data?.msg) {
            alert(error.response.data.msg);
        } else {
            alert("Somthing went wrong")
        }
    }
}

export function Card({ title, link, type ,  _id}: Cardprops) {
    return <div >
        <div className="mt-5 ml-2 p-3 bg-white rounded-md shadow-md border border-gray-300 min-h-48 min-w-48 max-w-72 ">
            <div className="flex justify-between">
                <div className="flex pr-4">
                    {type=== "youtube" && <YoutubeIcon size="md"/>}
                    {type==="twitter" && <TwitterIcon size="md" />}
                    {type === "document" && <DocumentIcon size="md"/>}
                    {title}
                </div>
                <div className="flex pr-3">
                    <div className="pr-2">
                        <a href={link} target="_blank"></a>
                        <ShareIcon size="md" />
                    </div>
                    <div onClick={()=>deleteContenet(_id)}>
                        <DeleteIcon size="md" />
                    </div>
                </div>
            </div>
            <div>
                {type === "youtube" && <iframe className="w-full" src={link.replace("watch?v=" , "embed/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                {type === "twitter" && <blockquote class="twitter-tweet">
                    <a href={link.replace("x.com" , "twitter.com")}></a>
                </blockquote>}

            </div>
        </div>
    </div>
}