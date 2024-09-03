import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Copy, Delete, Download } from "lucide-react";

/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
export default function LinkList({url, fetchUrls}) {
    return (
        <div className="flex flex-col md:flex-row gap-5 p-4 border bg-gray-900 rounded-lg">
            <img src={url?.qr}  alt="qr code" className="h-32 object-contain self-start"/>
            <Link to={`/link/${url?.id}`} className="flex flex-col flex-1 space-y-2"> 
                <span className="w-max text-xl first-letter:uppercase font-extrabold underline hover:text-blue-300 cursor-pointer"> {url?.title} </span>
                <span className=""> <b className="mr-2 text-blue-300"> New URL: </b>  <span className="hover:underline"> https://trimmr.vercel/{url?.custom_url ? url?.custom_url : url?.short_url } </span> </span>
                <span className="text-xs flex-1"> <b className="mr-2 text-blue-300">Original URL: </b> <span className="hover:underline"> {url?.original_url}</span>  </span>
                <span className="text-xs"> <b className="mr-2 text-blue-300">URL created: </b> <span className="hover:underline"> {new Date(url?.created_at).toLocaleString()} </span>  </span>
            </Link>

            <div className="flex gap-2">
                <Button variant="ghost" onClick={
                    () => { navigator.clipboard.writeText(`https://trimmr.vercel/${url?.custom_url ? url?.custom_url : url?.short_url }`)}
                }>
                    <Copy />
                </Button>
                <Button variant="ghost">
                    <Download />
                </Button>
                <Button variant="ghost">
                    <Delete />
                </Button>
            </div>
        </div>
    )
}