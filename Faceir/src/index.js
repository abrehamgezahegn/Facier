import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import AppRouter from "./Routers/AppRouter";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "tachyons";

ReactDOM.render(<AppRouter />, document.getElementById("root"));
registerServiceWorker();
