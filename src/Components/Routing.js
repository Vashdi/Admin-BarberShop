import { HashRouter, Route, Switch } from "react-router-dom";
import App from "../App";
import Start from "./Start";

const Routing = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path="/Login" component={App} />
                <Route path="/" component={Start} />
            </Switch>
        </HashRouter>)
}

export default Routing;