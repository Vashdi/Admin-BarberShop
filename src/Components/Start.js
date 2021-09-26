import Home from './Home';
import News from './News';
import './Start.css'

function Start() {
    return (
        <div className="AppContainer">
            <div className="Home" >
                <Home />
            </div>
            <div className="News" >
                <News />
            </div>
        </div>
    );
}

export default Start;
