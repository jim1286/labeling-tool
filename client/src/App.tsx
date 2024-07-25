import { theme as CustomTheme } from "@/theme";
import { Outlet } from "react-router-dom";
import { AppContainer } from "./styles";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, theme } from "antd";
import isValidProp from "@emotion/is-prop-valid";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 1000 * 60 * 10,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StyleSheetManager shouldForwardProp={isValidProp}>
        <ThemeProvider theme={CustomTheme.dark}>
          <ConfigProvider
            theme={{
              algorithm: theme.darkAlgorithm,
            }}
          >
            <AppContainer>
              {import.meta.env.DEV && <ReactQueryDevtools />}
              <Outlet />
            </AppContainer>
          </ConfigProvider>
        </ThemeProvider>
      </StyleSheetManager>
    </QueryClientProvider>
  );
};

export default App;
