/* eslint-disable react-hooks/exhaustive-deps */
import { BarLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/COMPONENTS/ui/input";
import { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import useFetch from "@/HOOKS/use-fetch";
import { UrlState } from "@/context";
import { getUrls } from "../DATABASE/apiUrls";
import { getClicksForUrls } from "@/DATABASE/apiClicks";
import Error from "@/COMPONENTS/error";
import LinkList from "@/COMPONENTS/link-list";
import CreateLink from "../COMPONENTS/create-link";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = UrlState();

  const { loading, error, data: urls, fn: fnUrls } = useFetch(getUrls, user.id);

  const { loading: loadingClicks, data: clicks, fn: fnClicks, } = useFetch(
    getClicksForUrls,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnUrls();
  }, []);

  const filterUrls = urls?.filter((url) => {
    return url.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  return (
    <div className="flex flex-col gap-8 mt-5">
      {(loading || loadingClicks) && (<BarLoader width={"100%"} color="#36d7b7" />)}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Links created</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">{urls?.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Total clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">{clicks?.length > 0 ? clicks?.length : 0}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center items-center gap-10">
        <h1 className="text-4xl font-bold"> My Links </h1>
        <CreateLink />
      </div>

      <div className="relative">
        <Input
          type="text"
          placeholder="Filter Links..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          id='filter'
          className="w-full pl-5 text-xl h-14"
        />
        <Filter className="absolute top-2 right-2 p-1 size-6" />
      </div>

      {error && <Error errorMessage={error?.message} />}

      {urls?.length > 1 ? (filterUrls || []).map((url, i) => (
        <LinkList key={i} url={url} fetchUrls={fnUrls} />
      )) : (<span className="text-xl m-auto"> You have not created any link yet, try one!</span>)}

      {/* {(filterUrls || []).map((url, i) => (
        <LinkList key={i} url={url} fetchUrls={fnUrls} />
      ))} */}
    </div>
  );
}
