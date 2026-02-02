import axios from "axios";
import { useEffect, useState } from "preact/hooks";
import { BACKEND_URL } from "../../config";

type Content = {
    _id: string;
    type: "twitter" | "youtube" | "document";
    link: string;
    title: string;
  };
  
export function useContent(){
    const [contents, setContents] = useState<Content[]>([]);


    function refresh(){
            axios.get(`${BACKEND_URL}/api/v1/content` , {
                headers : {
                    token: localStorage.getItem("token")
                }
            })
            .then((response) => {
                setContents(response.data.content)
            })
    }

    useEffect(()=> {
        refresh();
        let interval = setInterval(() => {
            refresh();
        },10* 1000)

        return () => {
            clearInterval(interval)
        }
    },[])
    
    return contents ;
}