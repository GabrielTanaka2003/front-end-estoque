import { useEffect, useState } from "react";
import axios from "axios";
import { EstoqueData } from "../../interface/EstoqueData.ts";
import { useEstoqueDataAlter } from "../../hooks/UseEstoqueAlter.ts";
import "./create-modal.css";

interface PopupProps {
    content: string;
    onClosePopup: () => void;
}

const Popup = ({ content, onClosePopup }: PopupProps) => {
    return (
        <div className="popup-overlay" style={{ position: 'fixed',
                                                top: '0',
                                                left: '0',
                                                right: '0',
                                                bottom: '0',
                                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                zIndex: '5000' }}>
            <div className="popup" style={{ background: 'white',
                                            padding: '20px',
                                            borderRadius: '8px',
                                            width: '300px',
                                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
                <button className="close-btn" onClick={onClosePopup} style={{ background: 'red',
                            color: 'white',
                            border: 'none',
                            padding: '5px 10px',
                            cursor: 'pointer',
                            float: 'right',
                            position: 'initial'}}>
                    Abastecer
                </button>
                <div className="popup-content" style={{ marginBottom: '20px' }}>
                    {content}
                </div>
            </div>
        </div>
    );
};

interface InputProps {
    label: string;
    value: number | string;
    update(value: any): void;
}

const Input = ({ label, value, update }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input
                type="text"
                value={value}
                onChange={e => update(e.target.value)}
            />
        </>
    );
};

interface ModalProps {
    closeModal(): void;
    itemId: string;
}

export function AlterModal({ closeModal, itemId }: ModalProps) {
    const [idProduct] = useState(itemId);
    const [name, setName] = useState("");
    const [value, setValue] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const { mutate, isSuccess, isPending, isError } = useEstoqueDataAlter();
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/estoque/${itemId}`);
                const data = response.data as EstoqueData;
                setName(data.name);
                setValue(data.value);
                setQuantity(data.quantity);
            } catch (error) {
                console.error("Erro ao buscar dados do item:", error);
            }
        };

        if (itemId) {
            fetchData();
        }
    }, [itemId]);

    const submit = () => {
        if (quantity <= 0) {
            setShowPopup(true);
        }else{
            const updatedData: EstoqueData = { idProduct, name, value, quantity };
            mutate({ id: itemId, updatedData });
        }
    };

    useEffect(() => {
        if (isSuccess) {
            closeModal();
        }
    }, [isSuccess, closeModal]);

    return (
        <div className="modal-overflow">
            <div className="modal-body">
                <h2>Atualizar produto no estoque</h2>
                <form className="input-container" onSubmit={(e) => {
                    e.preventDefault();
                    submit();
                }}>
                    <Input label="Nome do Produto" value={name} update={setName} />
                    <Input label="Preço" value={value} update={setValue} />
                    <Input label="Quantidade" value={quantity} update={setQuantity} />
                    <div className="footer">
                        <button type="submit" className="btn-secondary">
                            {isPending ? 'Atualizando...' : 'Atualizar'}
                        </button>
                        <button type="button" onClick={() => closeModal()} className="btn-left">Voltar</button>
                    </div>
                </form>
                {isError && <p className="error">Ocorreu um erro ao atualizar o produto.</p>}
                {showPopup && <Popup content="O produto está em falta!" onClosePopup={togglePopup}/>}
            </div>
        </div>
    );
}
