/* eslint-disable react-hooks/exhaustive-deps */

import { useParams } from 'react-router-dom'
import useFetch from '../HOOKS/use-fetch'
import { getLongUrl } from '../DATABASE/apiUrls'
import { storeClicks } from '../DATABASE/apiClicks'
import { useEffect } from 'react'
import { BarLoader } from 'react-spinners'
import LoadingCard from "../COMPONENTS/loadingCard";
import LinkError from '../COMPONENTS/link-error'

export default function RedirectLink() {

    const {id} = useParams();

  const {loading, data, fn} = useFetch(getLongUrl, id);

  const {loading: loadingStats, fn: fnStats} = useFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url,
  });

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      fnStats();
    }
  }, [loading]);

  if (loading || loadingStats) {
    return (
      <>
        <BarLoader width={"100%"} color="#36d7b7" />
        <br />

        <LoadingCard msg={'We are redirecting you, please wait.'}/>
      </>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <LinkError />
      </div>
    );
  }
}

