/* eslint-disable react-hooks/exhaustive-deps */
import { BarLoader } from "react-spinners";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { Button } from "@/COMPONENTS/ui/button";
import { Input } from "@/COMPONENTS/ui/input";
import { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import useFetch from "@/HOOKS/use-fetch";
import { UrlState } from "@/context";
import { getUrls } from '../DATABASE/apiUrls'
import { getClicksForUrls } from "@/DATABASE/apiClicks";
import Error from "@/COMPONENTS/error";
import LinkList from "@/COMPONENTS/link-list";

export default function Dashboard() {

  const [searchQuery, setSearchQuery] = useState('')

    const { user } = UrlState();
    const { loading, error, data: urls, fn: fnUrls } = useFetch(getUrls, user?.id)

    const {loading: loadingClicks, data: clicks, fn: fnClicks } = useFetch(getClicksForUrls, 
        urls?.map( (url) => url.id)
    )


    useEffect( () => {
        fnUrls()
    }, [])

    
    const filterUrls = urls?.filter((url) => {
        return url?.title?.toLowerCase().includes(searchQuery.toLowerCase()); 
    });
        
    useEffect( () => {
        if(urls?.length) fnClicks();
    }, [urls?.length])

  return (
    <div className="flex flex-col gap-8">

      {loading || loadingClicks && <BarLoader width={"100%"} color="#36d7b7" />}

      <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Links created</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{urls?.length}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total clicks</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{clicks?.length}</p>
        </CardContent>
      </Card>
      </div>

        <div className="flex justify-center gap-10">
            <h1 className="text-2xl font-bold"> My Links </h1>
            <Button> Create Link </Button>
        </div>

        <div className="relative">
            <Input 
                type="text" placeholder="Filter Links..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Filter className="absolute top-2 right-2 p-1"/>
        </div>

        {error && <Error errorMessage={error?.message} />}

        {(filterUrls || []).map((url, i) => {
            return <LinkList key={i} url={url} fetchUrl={fnUrls}/>
        })}

    </div>
  );
}
