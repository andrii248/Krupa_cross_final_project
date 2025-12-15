import React from "react";
import { registerRootComponent } from "expo";
import { App } from "./src/App";
import { ThemeProvider } from "./src/context/ThemeContext";
import { Provider } from "react-redux";
import { store } from "./src/store";

const Root = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  );
};

registerRootComponent(Root);
