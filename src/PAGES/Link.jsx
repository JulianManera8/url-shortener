/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import { UrlState } from "../context";
import useFetch from "../HOOKS/use-fetch";
import { getClicksForUrl } from "../DATABASE/apiClicks";
import { getUrl, deleteUrl } from "../DATABASE/apiUrls";
import { BarLoader } from "react-spinners";
import { useEffect } from "react";
import { LinkIcon } from "lucide-react";
import { Button } from "../COMPONENTS/ui/button";
import { Copy, Trash } from "lucide-react";
import { BeatLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/COMPONENTS/ui/card";
import LocationStats from "@/COMPONENTS/location-stats";
import DeviceStats from "@/COMPONENTS/device-stats";


export default function SingleLink() {
  const { user } = UrlState();
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    loading,
    data: url,
    error,
    fn,
  } = useFetch(getUrl, { id, user_id: user?.id });

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksForUrl, id);

  const { loading: loadingDelete, fn: fnDeleteUrl } = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!error && loading === false) fnStats();
  }, [loading, error]);

  if (error) {
    navigate("/dashboard");
  }

  return (
    <div className="mt-7 md:mt-2">
      {(loading || loadingStats) && (
        <BarLoader width={"100%"} color="#36d7b7" />
      )}
      <div className="flex flex-col gap-8 md:flex-row w-fulljustify-between md:mt-10">

        {/* DATA OF THE LINK */}
        <div className="flex flex-col items-start gap-8 rounded-lg  pl-6 pt-6">

          <span className="text-4xl font-extrabold cursor-pointer">
            <span className="text-blue-300"> Title: </span> {url?.title}
          </span>

          <a
            href={`https://urlink-short.vercel.app/${url?.short_url}`}
            target="_blank"
            className="cursor-pointer text-2xl sm:text-2xl"
          >
            <b className=" flex flex-row items-center text-blue-300 font-bold cursor-pointer">
              <LinkIcon className="size-5 mr-2" /> Short URL:{" "}
            </b>{" "}
            <span className="hover:underline cursor-pointer">    https://urlink-short.vercel.app/{ loading || loadingStats ? 'Loading....' : url?.short_url} </span>
          </a>

          {url?.custom_url ? 
            <a
            href={`https://urlink-short.vercel.app/${url?.custom_url}`}
            target="_blank"
            className="cursor-pointer text-2xl sm:text-2xl"
            >
            <b className=" flex flex-row items-center text-blue-300 font-bold">
              <LinkIcon className="size-5 mr-2" /> Custom URL:{" "}
            </b>{" "}
            <span  className="hover:underline cursor-pointer"> https://urlink-short.vercel.app/{ loading || loadingStats ? 'Loading....' : url.custom_url} </span> 
            </a> 
          : ''  
          }

          <a
            href={url?.original_url}
            target="_blank"
            className="cursor-pointer text-xl sm:text-1xl"
          >
            <b className=" flex flex-row items-center text-xl sm:text-1xl text-blue-300 font-bold">
              <LinkIcon className="size-5 mr-2" /> Original URL:
            </b>{" "}
            <span  className="hover:underline cursor-pointer">  { loading || loadingStats ? 'Loading....' : url?.original_url} </span>
          </a>

          <span className="text-lg"> <span className="text-blue-300">  Created:</span> { loading || loadingStats ? 'Loading....' : new Date(url?.created_at).toLocaleString()} </span>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://urlink-short.vercel.app/${
                    url?.custom_url ? url?.custom_url : url?.short_url
                  }`
                );
              }}
            >
              <Copy />
            </Button>

            <Button
              variant="ghost"
              onClick={() =>
                fnDeleteUrl().then(() => {
                  navigate("/dashboard");
                })
              }
              disable={loadingDelete}
            >
              {loadingDelete ? (
                <BeatLoader size={5} color="white" />
              ) : (
                <Trash />
              )}
            </Button>
          </div>

        </div>

        {/* STATS OF THE LINK */}
        <Card className="sm:w-3/5 m-0">
                <CardHeader>
                    <CardTitle className="text-4xl font-bold">Stats</CardTitle>
                </CardHeader>
                
               {stats && stats.length 

               ? (<CardContent className="flex flex-col gap-6"> 
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-4xl">Total clicks</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xl">{stats?.length}</p>
                      </CardContent>
                    </Card>

                    <CardTitle className="text-3xl font-bold">Location Data</CardTitle>
                    <LocationStats stats={stats}/>

                    <CardTitle className="text-3xl font-bold">Device Info</CardTitle>
                    <DeviceStats stats={stats}/>

                 </CardContent>) 

               : (<CardContent className="space-y-4"> 
                    {loadingStats === false ? 'No stats yet' : 'Loading stats...'} 
                 </CardContent>) }
        </Card>
      </div>
    </div>
  );
}
