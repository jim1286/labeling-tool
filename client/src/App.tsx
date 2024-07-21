import { theme as CustomTheme } from "@/theme";
import { Outlet } from "react-router-dom";
import { AppContainer } from "./styles";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import isValidProp from "@emotion/is-prop-valid";

const App = () => {
  return (
    <StyleSheetManager shouldForwardProp={isValidProp}>
      <ThemeProvider theme={CustomTheme.dark}>
        <AppContainer>
          <Outlet />
        </AppContainer>
      </ThemeProvider>
    </StyleSheetManager>
  );
};

export default App;
