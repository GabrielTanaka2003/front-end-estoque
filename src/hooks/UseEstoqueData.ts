import axios from "axios";
import {AxiosPromise} from "axios";
import {EstoqueData} from "../interface/EstoqueData.ts";
import {useQuery} from "@tanstack/react-query";

const API_URL = "http://localhost:8080";

const fetchData = async (): AxiosPromise<EstoqueData[]> => {
    const response = axios.get(API_URL + "/estoque");
    return response;
}

export function useEstoqueData(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['estoque-data'],
        retry: 2
    })

    return{
        ...query,
        data: query.data?.data
    }
}