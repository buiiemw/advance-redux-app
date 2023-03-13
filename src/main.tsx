import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";

import theme from "./theme";
import "./index.css";
import router from "./routes/root";

// store
import { store } from "./redux-toolkit/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
      <Toaster position="bottom-right" />
    </ThemeProvider>
    {/* </React.StrictMode>, */}
  </Provider>
);
