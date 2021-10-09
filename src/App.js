import './App.css';
import { useEffect, useState } from 'react';
import adminLogin from './Components/Services/Login';
import Swal from 'sweetalert2';

function App(props) {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    useEffect(() => {
        if (localStorage.getItem("admin")) {
            props.history.push("/");
        }
    }, [])
    const moveToHome = async () => {
        try {
            const data = await adminLogin.login({ phone: phone, password: password });
            localStorage.setItem("admin", JSON.stringify({ phone: data.phone, token: data.token }))
            props.history.push("/");
        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: error.response.data,
            })
        }
    }
    return (
        <div className="Container">
            <div className="squareStart">
                <h1 className="titleStart">מסך התחברות</h1>
                <div className="texts">
                    <div className="textAndTitle">
                        <div className="phoneText">
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div>
                            :מספר פלאפון
                        </div>
                    </div>
                    <div className="textAndTitle">
                        <div className="passText" >
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div>
                            :סיסמא
                        </div>
                    </div>
                </div>
                <div className="containerButton">
                    <input className="startButton" type="button" value="התחבר" onClick={moveToHome} />
                </div>
            </div>
        </div>
    );
}

export default App;
