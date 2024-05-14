import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { ThemeProvider } from "./app/providers/ThemeProvider";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { i18nInstance } from "./i18n";
import { DefaultOptions, QueryClient, QueryClientProvider } from "react-query";
import ru_RU from "antd/lib/locale/ru_RU";
import moment from "moment";
import { ConfigProvider } from "antd";

moment.locale("ru");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const config: {
  defaultOptions: DefaultOptions;
} = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
};

const queryClient = new QueryClient(config);

root.render(
  <QueryClientProvider contextSharing client={queryClient}>
    <I18nextProvider i18n={i18nInstance}>
      <ConfigProvider locale={ru_RU}>
        <BrowserRouter>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </ConfigProvider>
    </I18nextProvider>
  </QueryClientProvider>,
);
