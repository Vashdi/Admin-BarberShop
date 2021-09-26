import './App.css';
import { useState } from 'react';

function App(props) {
  const [phone, setPhone] = useState(" ");
  const [password, setPassword] = useState(" ");
  const moveToHome = () => {
    props.history.push("/Start");
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
              <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
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
