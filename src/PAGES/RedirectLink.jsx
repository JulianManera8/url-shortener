/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router-dom';
import useFetch from '../HOOKS/use-fetch';
import { getLongUrl } from '../DATABASE/apiUrls';
import { storeClicks } from '../DATABASE/apiClicks';
import { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';
import LoadingCard from "../COMPONENTS/loadingCard";
import LinkError from '../COMPONENTS/link-error';

export default function RedirectLink() {
  const { id } = useParams();
  const { loading, data, fn } = useFetch(getLongUrl, id);
  const { loading: loadingStats, fn: fnStats } = useFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url,
  });

  const [showError, setShowError] = useState(false);

  useEffect(() => {
    fn(); // Fetch the long URL
  }, []);

  useEffect(() => {
    if (!loading && data) {
      fnStats(); // Store clicks when the URL is successfully fetched
      setTimeout(() => {
        if (data?.original_url) {
          window.location.href = data.original_url; // Redirect to the original URL
        } else {
          setShowError(true); // Show error if there's no valid URL
        }
      }, 3000); // Delay the redirection by 3 seconds
    }
  }, [loading, data]);

  if (loading || loadingStats) {
    return (
      <>
        <BarLoader width={"100%"} color="#36d7b7" />
        <br />
      </>
    );
  }

  return (
    <>
      {showError ? (
        <div className="flex flex-col items-center justify-center p-6">
          <LinkError />
        </div>
      ) : (
        <LoadingCard msg={"We are redirecting you, please wait."} />
      )}
    </>
  );
}
