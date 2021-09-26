import { HashRouter, Route, Switch } from "react-router-dom";
import App from "../App";
import Start from "./Start";

const Routing = () => {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/Start" component={Start} />
            </Switch>
        </HashRouter>)
}

export default Routing;