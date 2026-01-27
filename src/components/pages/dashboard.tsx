import { Button } from "../buttom";
import { PlusIcon } from "../../icons/plusIcon";
import { ShareIcon } from "../../icons/shareIcon";
import { Card } from "../../components/card";
import { Popup } from "../../components/popup";
import { useState } from "preact/hooks";
import { Sidebar } from "../../components/sidebar";
// import { BrainIcon } from "./icons/brainIcon";
export function Dashboard() {
  const [open, setOpen] = useState(false);


  return <div >
      <Sidebar />
    <div className="p-4 pl-76 bg-background h-screen">
      <div className="flex justify-end gap-2">
        <Button startIcon={<ShareIcon size="md" />} varient="secondary" size="md" text="Share Brain" onclick={() => { }}></Button>
        <Button startIcon={<PlusIcon size="md" />} varient="primary" size="md" text="Add Content" onclick={() => { setOpen(true) }}></Button>
      </div>
      <div className="flex gap-3">
        <Card type="Twitter" title="tweet" link="https://x.com/antigravity/status/2015577424163938565" />
        <Card type="youtube" title="all is hell" link="https://www.youtube.com/watch?v=GqqwbcgOHek" />
      </div>
      <Popup open={open} onclose={() => {
        setOpen(false)
      }} />
    </div>
  </div>
}
