import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    inputBorder: "hsl(216, 65%, 80%)",
    inputBackground: "aliceblue",
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
