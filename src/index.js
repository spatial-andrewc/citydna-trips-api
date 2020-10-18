import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DeckGLProvider, MapProvider } from "@citydna/maps";

ReactDOM.render(
  <React.StrictMode>
    <MapProvider>
      <DeckGLProvider>
        <App />
      </DeckGLProvider>
    </MapProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

