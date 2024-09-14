import "./card.css"
import {AlterModal} from "../modal/alter-modal.tsx";
import {useState} from "react";

interface CardProps {
    id: string;
    value: number,
    name: string,
    quantity: number
}

export function Card({id,value,name,quantity} : CardProps){
    console.log(id)
    console.log(value)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

    const handleOpenModal = (itemId: string) => {
        setSelectedItemId(itemId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedItemId(null);
    };


    return(
        <div className="card">
            <h2> {name} <img onClick={() => handleOpenModal(id)} src="../../../public/edit.png"/></h2>
            <p><b>Quantidade:</b> {quantity} </p>
            <p><b>Valor:</b> {value} </p>
            {isModalOpen && selectedItemId && (<AlterModal closeModal={handleCloseModal} itemId={selectedItemId}/>)}
        </div>
    )
}