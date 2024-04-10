import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import AddProductButton from "./Products/AddProductButton";
const pages = ["Products", "Users", "Orders"];

function AdminNav() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [addProduct, setAddProduct] = React.useState(null);

  React.useEffect(() => {
    if (window.location.href) {
      const url = new URL(window.location.href);
      const path = url.pathname;
      setAddProduct(path);
    }
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={anchorElNav}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    noWrap
                    component="a"
                    href={`/admin/${page.toLowerCase()}`}
                    textAlign="center"
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ADMIN DASHBOARD
          </Typography>
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography
                  noWrap
                  component="a"
                  href={`/admin/${page.toLowerCase()}`}
                  textAlign="center"
                  sx={{ color: { xs: "black", md: "white" } }}
                >
                  {page}
                </Typography>
              </MenuItem>
            ))}
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/admin/dashboard"
            sx={{
              ml: addProduct !== "/admin/products" ? -30 : -10,
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: { xs: "none", md: "center" },
              fontFamily: "monospace",
              fontWeight: 1000,
              fontSize: "1.3rem",
              letterSpacing: "0.2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ADMIN DASHBOARD
          </Typography>
          {addProduct === "/admin/products" && (
            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
              <AddProductButton />
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AdminNav;
