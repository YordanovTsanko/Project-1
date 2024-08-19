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

const pages = ["Products", "Users", "Orders"];

function AdminNav() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: "none" }}>
      <Container maxWidth="xl" sx={{ mt: {xs:0,  md:3 }}}>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: 'black' }} />
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
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ color: 'black', display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu} sx={{ color: 'black' }}>
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
            variant="h6"
            noWrap
            component="a"
            href="/admin/dashboard"
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-start",
              fontFamily: "monospace",
              fontWeight: 1000,
              fontSize: "1.3rem",
              letterSpacing: "0.2rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            ADMIN DASHBOARD
          </Typography>

          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu} sx={{ color: 'black' }}>
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
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/admin/dashboard"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: "1.3rem",
              letterSpacing: "0.2rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            ADMIN DASHBOARD
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AdminNav;
