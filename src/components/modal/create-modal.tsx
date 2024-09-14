import {useEffect, useState} from "react";
import {useEstoqueDataMutate} from "../../hooks/UseEstoqueDataMutate.ts";
import {EstoqueData} from "../../interface/EstoqueData.ts";

import "./create-modal.css";

interface InputProps {
    label: string,
    value: number | string,
    update(value: any): void
}

const Input = ({ label, value, update }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={e => update(e.target.value)}></input>
        </>
    )
}

interface ModalProps{
    closeModal(): void
}

export function CreateModal({ closeModal }: ModalProps){
    const [idProduct] = useState("");
    const [name, setName] = useState("");
    const [value, setValue] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const { mutate, isSuccess, isPending } = useEstoqueDataMutate();

    const submit = () => {
        const estoqueData: EstoqueData = {
            idProduct,
            name,
            value,
            quantity
        }

        mutate(estoqueData)
    }

    useEffect(() => {
        if(!isSuccess) return
        closeModal();
    }, [isSuccess])

    return(
        <div className="modal-overflow">
            <div className="modal-body">
                <h2>Insira um novo produto no estoque</h2>
                <form className="input-container">
                    <Input label="Nome do Produto" value={name} update={setName}/>
                    <Input label="Preço" value={value} update={setValue}/>
                    <Input label="Quantidade" value={quantity} update={setQuantity}/>
                </form>
                <div className="footer">
                    <button onClick={submit} className="btn-secondary">
                        {isPending ? 'postando...' : 'postar'}
                    </button>
                    <button type="button" onClick={() => closeModal()} className="btn-left">Voltar</button>
                </div>
            </div>
        </div>
    )
}