import { useEffect, useState } from "react"

export const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setdata] = useState<T | null>(null);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState<Error | null>(null)

    const fetchData = async () => {
        try {
            setloading(true);
            seterror(null);

            const resulte = await fetchFunction();

            setdata(resulte);

        } catch (err) {
            //@ts-ignore
            seterror(err instanceof error ? err : new error('an error occurred'))
        } finally {
            setloading(false)
        }

    }
    const reset = () => {
        setdata(null)
        setloading(false)
        seterror(null)
    }

    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, [])




    return { data, loading, error, refetch: fetchData,reset }
}