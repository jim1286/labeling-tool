import { theme as CustomTheme } from "@/theme";
import { Outlet } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import { AppContainer } from "./styles";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import isValidProp from "@emotion/is-prop-valid";

const App = () => {
  const colorMode = CustomTheme.dark;

  return (
    <StyleSheetManager shouldForwardProp={isValidProp}>
      <ThemeProvider theme={colorMode}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#3877FD",
              fontFamily: "Noto Sans",
            },
            algorithm: theme.darkAlgorithm,
          }}
        >
          <AppContainer>
            <Outlet />
          </AppContainer>
        </ConfigProvider>
      </ThemeProvider>
    </StyleSheetManager>
  );
};

export default App;
