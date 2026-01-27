import { BrainIcon } from "../icons/brainIcon";
import { DocumentIcon } from "../icons/documentIcon";
import { LinkIcon } from "../icons/linkIcon";
import { TagIocn } from "../icons/tagIcon";
import { TwitterIcon } from "../icons/twitterIcon";
import { YoutubeIcon } from "../icons/youtubeIcon";

export function SidebarItem() {
    return <div>
        <div className="flex gap-5 items-center p-3 ">
            <BrainIcon size="lg" />
            <div className="font-bold text-primary-text text-2xl">Brainly</div>
        </div>
        <div>
            <div className="flex gap-3 items-center ml-5 pl-2 mt-5 p-1 rounded-sm max-w-48 hover:bg-gray-200 cursor-pointer transition-all duration-300">
                <TwitterIcon size="sm" />
                <div className="text-lg text-secondary-text">Tweets</div>
            </div>
            <div className="flex gap-3 items-center ml-5 pl-2 mt-5 p-1 rounded-sm max-w-48 hover:bg-gray-200 cursor-pointer transition-all duration-300">
                <YoutubeIcon size="sm"/>
                <div className="text-lg text-secondary-text">Videos</div>
            </div>
            <div className="flex gap-3 items-center ml-5 pl-2 mt-5 p-1 rounded-sm max-w-48 hover:bg-gray-200 cursor-pointer transition-all duration-300">
                <DocumentIcon size="sm"/>
                <div className="text-lg text-secondary-text">Documents</div>
            </div>
            <div className="flex gap-3 items-center ml-5 pl-2 mt-5 p-1 rounded-sm max-w-48 hover:bg-gray-200 cursor-pointer transition-all duration-300">
                <LinkIcon size="sm"/>
                <div className="text-lg text-secondary-text">Links</div>
            </div>
            <div className="flex gap-3 items-center ml-5 pl-2 mt-5 p-1 rounded-sm max-w-48 hover:bg-gray-200 cursor-pointer transition-all duration-300">
                <TagIocn size="sm"/>
                <div className="text-lg text-secondary-text">Tags</div>
            </div>
        </div>
    </div>
}