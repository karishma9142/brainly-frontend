import { DocumentIcon } from "../icons/documentIcon";
import { ShareIcon } from "../icons/shareIcon";
import { DeleteIcon } from "../icons/deleteIcon";

interface Cardprops {
    title: string,
    link: string,
    type: "Twitter" | "youtube"
}

export function Card({ title, link, type }: Cardprops) {
    return <div >
        <div className="mt-5 ml-2 p-3 bg-white rounded-md shadow-md border border-gray-300 min-h-48 min-w-48 max-w-72 ">
            <div className="flex justify-between">
                <div className="flex pr-4">
                    <DocumentIcon size="md" />
                    {title}
                </div>
                <div className="flex pr-3">
                    <div>
                        <a href={link} target="_blank"></a>
                        <ShareIcon size="md" />
                    </div>
                    <div>
                        <DeleteIcon size="md" />
                    </div>
                </div>
            </div>
            <div>
                {type === "youtube" && <iframe className="w-full" src={link.replace("watch?v=" , "embed/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                {type === "Twitter" && <blockquote class="twitter-tweet">
                    <a href={link.replace("x.com" , "twitter.com")}></a>
                </blockquote>}

            </div>
        </div>
    </div>
}