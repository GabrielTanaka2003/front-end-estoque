import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, {AxiosResponse} from "axios"
import {EstoqueData} from "../interface/EstoqueData.ts";

const API_URL = "http://localhost:8080";

const postData = async (data: EstoqueData): Promise<AxiosResponse<{ success: boolean }>> => {
    const response = axios.post(API_URL + "/estoque", data);
    return response;
}

export function useEstoqueDataMutate(){
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['estoque-data'])
        }
    })

    return mutate;
}