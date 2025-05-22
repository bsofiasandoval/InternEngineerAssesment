'use client'
import {useState, useCallback, useEffect} from 'react';
import axios, {AxiosError} from 'axios';
import {ApiResponse} from '../types/cruises';

export default function useAPI(url: string = '/api/cruises') {
    const [data, setData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<AxiosError | null>(null);

    const fetchData = useCallback(
        async (url: string) => {
            setLoading(true);
            try {
                const response = await axios.get<ApiResponse>(url);
                setData(response.data);
            } catch (e) {
                setError(e as AxiosError);
            } finally {
                setLoading(false);
            }
        },
        [url]
    );

    useEffect(() => {
        if (typeof window !== 'undefined') {
            fetchData(url);
        }
    }, [fetchData, url]);

    return {data, loading, error};
}