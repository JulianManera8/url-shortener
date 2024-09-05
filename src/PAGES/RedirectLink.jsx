/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/use-fetch'
import { getLongUrl } from '../database/apiUrls'
import { storeClicks } from '../database/apiClicks'
import { useEffect } from 'react'
import { BarLoader } from 'react-spinners'

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
        Redirecting...
      </>
    );
  }

  return null;
}