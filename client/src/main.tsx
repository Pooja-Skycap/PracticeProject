import { createRoot, Provider } from "./utils/commonImports.ts";
import App from "./App.tsx";
import "./index.css";
import store from "./store/configureStore.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
