import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Copy, Trash } from "lucide-react";
import useFetch from "@/HOOKS/use-fetch";
import { deleteUrl } from '../DATABASE/apiUrls'
import { BeatLoader } from "react-spinners";

/* eslint-disable react/prop-types */
export default function LinkList({url, fetchUrls}) {

    const {loading: loadingDelete, fn: fnDeleteUrl} = useFetch(deleteUrl, url.id)

    return (
        <div className="flex flex-col md:flex-row gap-5 p-4 border bg-gray-900 rounded-lg">
            <Link to={`/link/${url?.id}`} className="flex flex-col flex-1 space-y-2"> 
                <span className="flex text-2xl font-extrabold hover:text-blue-300 cursor-pointer"><b className="mr-2 text-blue-300"> Title: </b> <p className="first-letter:uppercase"> {url?.title} </p> </span>
                <span> <b className="mr-2 text-blue-300 text-2xl "> New URL: </b>  <span className="text-2xl hover:underline"> https://urlink-short.vercel.app/{url?.custom_url ? url?.custom_url : url?.short_url } </span> </span>
                <span className="text-xl flex-1"> <b className="mr-2 text-blue-300">Original URL: </b> <span className="hover:underline"> {url?.original_url}</span>  </span>
                <span className="text-xl"> <b className="mr-2 text-blue-300">URL created: </b> <span className="hover:underline"> {new Date(url?.created_at).toLocaleString()} </span>  </span>
            </Link>

            <div className="flex gap-2">
                <Button variant="ghost" onClick={
                    () => { navigator.clipboard.writeText(`https://urlink-short.vercel.app/${url?.custom_url ? url?.custom_url : url?.short_url }`)}
                }>
                    <Copy />
                </Button>
                <Button variant="ghost" onClick={() => fnDeleteUrl().then(() => fetchUrls())} disable={loadingDelete}>
                    {loadingDelete ? <BeatLoader size={5} color="white" /> : <Trash />}
                </Button>
            </div>
        </div>
    )
}