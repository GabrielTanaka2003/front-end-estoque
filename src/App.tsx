import './App.css'
import { Card } from "./components/cards/card.tsx";
import {useEstoqueData} from "./hooks/UseEstoqueData.ts";
import {useState} from "react";
import {CreateModal} from "./components/modal/create-modal.tsx";
import {Login} from "./components/modal/login.tsx";

function App() {
    const { data } = useEstoqueData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const closeLogin = () => {
        setIsLogin(false)
    }

    const handleOpenModalCreate = () => {
        setIsModalOpen(prev => !prev)
    }

    return (
        <div className="container">
            {localStorage.getItem("isLogin") != "loged" && isLogin && <Login closeModal={closeLogin}/>}
            <h1>ESTOQUE</h1>
            <div className="card-grid">
                {data?.map(estoqueData =>
                    <Card
                        id={estoqueData.idProduct}
                        value={estoqueData.value}
                        name={estoqueData.name}
                        quantity={estoqueData.quantity}
                    />
                )}
            </div>
            {isModalOpen && <CreateModal closeModal={handleOpenModalCreate}/>}
            <button onClick={handleOpenModalCreate}>Inserir novo produto</button>
        </div>
    )
}

export default App