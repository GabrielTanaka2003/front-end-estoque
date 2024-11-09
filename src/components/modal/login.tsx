import {useState} from "react";

import "./login.css";

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
                    Fechar
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
            <input value={value} onChange={e => update(e.target.value)}></input>
        </>
    )
}

interface ModalProps{
    closeModal(): void
}

export function Login({ closeModal }: ModalProps){
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    }

    const verify = (e: React.FormEvent) => {
        e.preventDefault();
       if(user == "admin" && password == "admin") {
           closeModal()
           localStorage.setItem("contador", "1")
       }else{
           setShowPopup(true);
       }
    }

    return(
        <div className="modal-overflow" style={{ position: 'fixed',
                                                inset: '0',
                                                backgroundColor: 'rgba(173, 216, 230, 1)',
                                                overflow: 'hidden',
                                                height: '100vh',
                                                width: '100vw',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                zIndex: '999'
                                            }}>
            <div className="modal-body" style={{ backgroundColor: 'white',
                                                padding: '24px',
                                                height: '40%',
                                                width: '60%',
                                                borderRadius: '24px',
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between'
                                            }}>
                <h2>Log-in</h2>
                <form className="input-container" >
                    <Input label="Usuário" value={user} update={setUser} />
                    <Input label="Senha" value={password} update={setPassword} />
                    <button onClick={verify} className="btn-secondary">Logar</button>
                    {showPopup && <Popup content="Usuário ou senha incorreta!" onClosePopup={togglePopup}/>}
                </form>
            </div>
        </div>
    )
}