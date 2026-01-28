import { Button } from "../buttom";
import { PlusIcon } from "../../icons/plusIcon";
import { ShareIcon } from "../../icons/shareIcon";
import { Card } from "../../components/card";
import { Popup } from "../../components/popup";
import { useState } from "preact/hooks";
import { Sidebar } from "../../components/sidebar";
import { useContent } from "../hooks/useContent";
import { BACKEND_URL } from "../../config";
import axios from "axios";
// import { BrainIcon } from "./icons/brainIcon";
export function Dashboard() {
  const [open, setOpen] = useState(false);
  const contents = useContent();

  return <div >
    <Sidebar />
   
    <div className="p-4 pl-76 bg-background h-screen">
    <div>{`${localStorage.getItem("link")}`}</div>
      <div className="flex justify-end gap-2">
        <Button onclick={async () => {
          try {
            const response = await axios.post(
              `${BACKEND_URL}/api/v1/brain/share`,
              {}, // body
              {
                headers: {
                  token: localStorage.getItem("token")
                }
              }
            );
          
            const shareLink = `http://localhost:3000/api/v1/brain/${response.data.link}`;
            localStorage.setItem("link" , shareLink);
            await navigator.clipboard.writeText(shareLink);
            alert("Link copied to clipboard");
          
          } catch (error: any) {
            console.log(error.response?.data || error.message);
          }
          

        }} startIcon={<ShareIcon size="md" />} varient="secondary" size="md" text="Share Brain" ></Button>
        <Button startIcon={<PlusIcon size="md" />} varient="primary" size="md" text="Add Content" onclick={() => { setOpen(true) }}></Button>
      </div>
      <div className="flex gap-3 flex-wrap">
        {contents.map(({ type, link, title }) => <Card
          type={type}
          link={link}
          title={title}
        />)}
      </div>
      <Popup open={open} onclose={() => {
        setOpen(false)
      }} />
    </div>
  </div>
}
