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

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url.short_url;
  }

  return (
    <div className="mt-8">
      {(loading || loadingStats) && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}
      <div className="flex flex-col gap-8 sm:flex-row justify-between mt-16">

        {/* DATA OF THE LINK */}
        <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5 pl-6 pt-6">
          <span className="text-4xl font-extrabold hover:underline cursor-pointer">
            Title: {url?.title}
          </span>

          <a
            href={`https://trimmr.vercel.app/${link}`}
            target="_blank"
            className="cursor-pointer text-2xl sm:text-2xl"
          >
            <b className=" flex flex-row items-center text-blue-300 font-bold hover:underline cursor-pointer">
              <LinkIcon className="p-1 size-5" /> Custom or Short URL:{" "}
            </b>{" "}
            https://trimmr.vercel.app/{ loading || loadingStats ? 'Loading....' : link}
          </a>

          <a
            href={url?.original_url}
            target="_blank"
            className="cursor-pointer text-xl sm:text-1xl"
          >
            <b className=" flex flex-row items-center text-xl sm:text-1xl text-blue-300 font-bold hover:underline cursor-pointer">
              <LinkIcon className="p-1 size-5" /> Original URL:
            </b>{" "}
            { loading || loadingStats ? 'Loading....' : url?.original_url}
          </a>

          <span className="text-lg"> Created: { loading || loadingStats ? 'Loading....' : new Date(url?.created_at).toLocaleString()} </span>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://trimmr.vercel/${
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
