import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import BookIcon from "@mui/icons-material/Book";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children?: React.ReactNode;
}

const navLinks = [
  {
    name: "Dashboard",
    to: "/",
    Icon: DashboardIcon,
  },
  {
    name: "Students",
    to: "/students",
    Icon: PersonIcon,
  },
  {
    name: "New Admission",
    to: "/new-admission",
    Icon: PersonAddIcon,
  },
  {
    name: "Attendance",
    to: "/attendance",
    Icon: AccountCircleIcon,
  },
  {
    name: "Faculty",
    to: "/faculty",
    Icon: GroupsIcon,
  },
  {
    name: "Fees",
    to: "/fees",
    Icon: MonetizationOnIcon,
  },
  {
    name: "Class",
    to: "/class",
    Icon: BookIcon,
  },
  { name: "Result", to: "/result", Icon: AssignmentIcon },
];

export default function ResponsiveDrawer(props: Props) {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  React.useEffect(() => {
    if (mobileOpen) setMobileOpen(false);
  }, [location.pathname]);

  const routeName = React.useMemo(() => {
    if (location.pathname === "/") return "Dashboard";

    const currentPath = navLinks.find((f) => f.to.includes(location.pathname));
    return currentPath ? currentPath.name : "Dashboard";
  }, [location.pathname]);

  const navLinkStyle = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      textDecoration: isActive ? "capitalize" : "none",
      color: isActive ? "pink" : "inherit",
      backgroundColor: isActive ? "red" : "pink",
    };
  };

  const drawer = (
    <div>
      <Toolbar>
        <img src={logo} alt="logo" />
      </Toolbar>
      <Divider />
      <List>
        {navLinks.map((data, index) => (
          <NavLink key={index.toString()} to={data.to} style={navLinkStyle}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <data.Icon />
                </ListItemIcon>
                <ListItemText>{data.name}</ListItemText>
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{ textTransform: "uppercase" }}
          >
            {routeName}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: "calc(100vh - 64px)",
          paddingTop: "64px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
