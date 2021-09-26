import { HashRouter, Route, Switch } from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import Home from "./Home";
import News from "./News";

const SecondRouting = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path="/Home" component={Home} />
                <Route path="/Start/Contact" component={Contact} />
                <Route path="/News" component={News} />
                <Route path="/About" component={About} />
            </Switch>
        </HashRouter>)
}

export default SecondRouting;