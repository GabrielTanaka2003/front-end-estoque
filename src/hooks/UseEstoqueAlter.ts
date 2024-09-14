import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { EstoqueData } from "../interface/EstoqueData.ts";

const API_URL = "http://localhost:8080";

const updateData = async (id: string, updatedData: EstoqueData): Promise<AxiosResponse<EstoqueData>> => {
    const response = await axios.put(`${API_URL}/estoque/${id}`, updatedData);
    return response;
};

export function useEstoqueDataAlter() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ id, updatedData }: { id: string; updatedData: EstoqueData }) => updateData(id, updatedData),
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['estoque-data']);
        }
    });

    return mutation;
}
