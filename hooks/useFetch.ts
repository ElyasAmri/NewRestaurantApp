import {useState, useEffect} from "react";

export default function useFetch(url: RequestInfo, opts?: RequestInit, repeatRef?: number) {
  const [response, setResponse] = useState<Response>();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);


  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url, opts);
        setResponse(res);
      }
      catch (e) {
        setError(true);
      }
      finally {
        setLoading(true);
      }
    })();
  }, repeatRef ? [repeatRef] : [])
  return [response, isLoading, error];
}
