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
                // Format each cruise's itinerary to contain only city names
                const formattedData = {
                    ...response.data,
                    results: Array.isArray(response.data.results)
                        ? response.data.results.map(cruise => ({
                            ...cruise,
                            name: cruise.name
                                .toLowerCase()
                                .split(' ')
                                .map((word: string) => word[0].toUpperCase() + word.slice(1))
                                .join(' '),
                            itinerary: Array.isArray(cruise.itinerary)
                                ? cruise.itinerary.map(stop => stop.split(',')[0].trim())
                                : cruise.itinerary
                        }))
                        : response.data.results
                };
                setData(formattedData);
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