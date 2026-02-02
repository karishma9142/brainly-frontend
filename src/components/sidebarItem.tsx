import { useContext, useState } from "preact/hooks";
import { BrainIcon } from "../icons/brainIcon";
import { DocumentIcon } from "../icons/documentIcon";
import { LinkIcon } from "../icons/linkIcon";
import { TagIocn } from "../icons/tagIcon";
import { TwitterIcon } from "../icons/twitterIcon";
import { YoutubeIcon } from "../icons/youtubeIcon";
import { AppContext } from "./pages/dashboard";

export function SidebarItem() {
    const { active, setActive } = useContext(AppContext);
    return <div>
        <div className="flex gap-5 items-center p-3 ">
            <BrainIcon size="lg" />
            <div className="font-bold text-primary-text text-2xl">Brainly</div>
        </div>
        <div>
            <div
                onClick={() => setActive("twitter")}
                className={`flex gap-3 items-center ml-5 pl-2 mt-5 p-1 rounded-sm max-w-48  hover:bg-gray-200 cursor-pointer transition-all duration-300 ${active === "twitter" ? "bg-pu300" : "bg-white"}`}
            >
                <TwitterIcon size="sm" />
                <div className="text-lg text-secondary-text">Tweets</div>
            </div>

            <div onClick={() => setActive("youtube")} className={`flex gap-3 items-center ml-5 pl-2 mt-5 p-1 rounded-sm max-w-48  hover:bg-gray-200 cursor-pointer transition-all duration-300 ${active === "youtube" ? "bg-pu300" : "bg-white"}`}>
                <YoutubeIcon size="sm" />
                <div className="text-lg text-secondary-text">Videos</div>
            </div>
            <div onClick={() => setActive("document")} className={`flex gap-3 items-center ml-5 pl-2 mt-5 p-1 rounded-sm max-w-48  hover:bg-gray-200 cursor-pointer transition-all duration-300 ${active === "document" ? "bg-pu300" : "bg-white"}`}>
                <DocumentIcon size="sm" />
                <div className="text-lg text-secondary-text">Documents</div>
            </div>
            <div className="flex gap-3 items-center ml-5 pl-2 mt-5 p-1 rounded-sm max-w-48 hover:bg-gray-200 cursor-pointer transition-all duration-300">
                <LinkIcon size="sm" />
                <div className="text-lg text-secondary-text">Links</div>
            </div>
            <div className="flex gap-3 items-center ml-5 pl-2 mt-5 p-1 rounded-sm max-w-48 hover:bg-gray-200 cursor-pointer transition-all duration-300">
                <TagIocn size="sm" />
                <div className="text-lg text-secondary-text">Tags</div>
            </div>
        </div>
    </div>
}