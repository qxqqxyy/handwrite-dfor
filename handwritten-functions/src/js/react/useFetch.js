const useFetch = (url, payload) => {
    // response
    const [data, setData] = useState(null);
    // promise state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const resolvedCallback = useRef([]);
    const rejectedCallback = useRef([]);

    const fetchData = async () => {
        setLoading(true);
        setError(false);
        try {
            const response = await fetch(url, payload);
            // status
            if (!response.ok) {
                throw new Error('');
            }
            setData(response);

            resolvedCallback.current.forEach(cb => cb(response));
        } catch (error) {
            setError(true);
            rejectedCallback.current.forEach(cb => cb(error));
        } finally {
            setLoading(false);
        }
    }
    const then = (onFulfilled) => {
        if (typeof onFulfilled === 'function') {
            if (data !== null && !loading && !error) {
                onFulfilled(data);
            } else {
                resolvedCallback.current.push(onFulfilled);
            }
        }
        return { then, catch: myCatch };
    }
    const myCatch = (onRejected) => {
        if (typeof onRejected === 'function') {
            if (data !== null && !loading) {
                onRejected(data);
            } else {
                rejectedCallback.current.push(onRejected);
            }
        }
        return { then, catch: myCatch };
    }

    useEffect(() => {
        fetchData();
        return () => {
            resolvedCallback.current = [];
            rejectedCallback.current = [];
        }
    }, [url]);
}