import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./tool";
import "./style/reset.less";
import registerServiceWorker from "./registerServiceWorker";
import { AppContainer } from "react-hot-loader";

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById("root")
  );
};

render(App);

if (module.hot) {
  module.hot.accept("./App.jsx", () => {
    render(App);
  });
}

registerServiceWorker();
