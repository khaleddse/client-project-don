import Routes from "./Routes";
import { withRouter } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core";

import { ThemeProvider } from "@material-ui/styles";
import DonAppContext from "./contexte/donContexte";

const baseTheme = createMuiTheme();

const App = () => {
  return (
    <DonAppContext>
      <ThemeProvider theme={baseTheme}>
        <Routes />
      </ThemeProvider>
    </DonAppContext>
  );
};

export default withRouter(App);
