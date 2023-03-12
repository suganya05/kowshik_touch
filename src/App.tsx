import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  Modal,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";
import {
  Route,
  Routes,
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { LinkProps } from "@mui/material/Link";

import {
  Attendance,
  Class,
  Dashboard,
  Faculty,
  Fees,
  NewAdmission,
  PdfPage,
  Students,
} from "./pages";
import { Drawer, Snackbar, AuthModal } from "./components";
import Result from "pages/Result";
import AddResult from "pages/Result/AddResult";
import PdfChoose from "components/PdfTemplate/PdfChoose";

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (MUI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});

const theme = responsiveFontSizes(darkTheme);

export default function App() {
  const [open, setOpen] = React.useState(() => {
    const data = sessionStorage.getItem("id");
    if (!data) return false;
    if (JSON.parse(data) === true) return true;
    return false;
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!open ? (
        <AuthModal open={open} setOpen={setOpen} />
      ) : (
        <Drawer>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/fees/*" element={<Fees />} />
            <Route path="/class/*" element={<Class />} />
            <Route path="/faculty/*" element={<Faculty />} />
            <Route path="/students/*" element={<Students />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/new-admission" element={<NewAdmission />} />
            <Route path="/result/*" element={<Result />} />
            <Route path="/addresult" element={<AddResult />} />
            <Route path="/pdf" element={<PdfChoose />} />
          </Routes>
          <Snackbar />
        </Drawer>
      )}
    </ThemeProvider>
  );
}
