import "./Navigation.css";
import React, { useEffect, useState } from "react";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiOutlineMenu,
} from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { FaClipboardList, FaHome, FaPhone } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import {
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { handleClickOpen, handleClose, Transition } from "./Handlers";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, logout } from "../../Redux/Actions/authActions";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

const Navigation = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleLogOut = async () => {
    dispatch(logout());
    toast.success("Logout succeffuly", {
      autoClose: 500,
      theme: "colored",
    });
    window.location.href = "/";
  };

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  

  return (
    <>
      <nav className="nav">
        <div className="logo">
          <Link to="/">
            <span>Logo</span>
          </Link>
        </div>
        <div className="nav-wrap">
          <ul className="nav-items responsive">
            {isAuthenticated && (user?.role === "admin") && (
              <li className="nav-links">
                <NavLink to="/admin/dashboard">
                  <span className="nav-icon-span"> Admin Panel</span>
                </NavLink>
              </li>
            )}
            <li className="nav-links">
              <NavLink to="/">
                <span className="nav-icon-span"> Home</span>
              </NavLink>
            </li>
            <li className="nav-links">
              <NavLink to="/contact">
                <span className="nav-icon-span"> Contact Us</span>
              </NavLink>
            </li>
          </ul>

          <ul className="nav-items">
            <li className="nav-links">
              <Tooltip title="Cart">
                <NavLink to="/cart">
                  <span className="nav-icon-span">
                    Cart
                    <Badge badgeContent={0}>
                      {" "}
                      <AiOutlineShoppingCart className="nav-icon" />
                    </Badge>
                  </span>
                </NavLink>
              </Tooltip>
            </li>

            {isAuthenticated ? (
              <>
                <li className="nav-links responsive">
                  <Tooltip title="Profile">
                    <NavLink to="/profile">
                      <span className="nav-icon-span">
                        <CgProfile
                          style={{
                            fontSize: 29,
                            marginBottom: -6,
                            marginRight: 6,
                          }}
                        />
                        {user?.firstName + " " + user?.lastName}
                      </span>
                    </NavLink>
                  </Tooltip>
                </li>
                <li
                  className="responsive"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyItems: "center",
                  }}
                  onClick={() => handleClickOpen(setOpenAlert)}
                >
                  <Button
                    variant="contained"
                    endIcon={<FiLogOut />}
                    onClick={() => handleClickOpen(setOpenAlert)}
                  >
                    <Typography variant="button"> Logout</Typography>
                  </Button>
                </li>
              </>
            ) : (
              <li className="nav-links responsive">
                <Tooltip title="Login">
                  <NavLink to="/login">
                    <span className="nav-icon-span">
                      Login
                      <Badge badgeContent={0}>
                        {" "}
                        <CgProfile className="nav-icon" />
                      </Badge>
                    </span>
                  </NavLink>
                </Tooltip>
              </li>
            )}
          </ul>

          <IconButton
            edge="start"
            color="inherit"
            onClick={handleDrawerOpen}
            className="menuIconParent"
          >
            <AiOutlineMenu className="menuIcon" />
          </IconButton>
        </div>
      </nav>

      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
      >
        <div>
          <IconButton onClick={handleDrawerClose}>
            <AiFillCloseCircle />
          </IconButton>
          <List>
            {isAuthenticated ? (
              <>
                <ListItem button onClick={handleDrawerClose}>
                  <NavLink
                    to="/profile"
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <CgProfile style={{ fontSize: 25 }} />
                    <ListItemText
                      className="bold-and-large"
                      primary={user?.firstName + user?.lastName}
                    />
                  </NavLink>
                </ListItem>
                <ListItem button onClick={handleDrawerClose}>
                  <NavLink
                    to="/profile/orders"
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <FaClipboardList style={{ fontSize: 25 }} />
                    <ListItemText
                      className="bold-and-large"
                      primary="My orders"
                    />
                  </NavLink>
                </ListItem>
              </>
            ) : (
              <ListItem button>
                <NavLink
                  to="/login"
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <CgProfile style={{ fontSize: 25 }} />
                  <ListItemText className="bold-and-large" primary="Login" />
                </NavLink>
              </ListItem>
            )}
            <ListItem button onClick={handleDrawerClose}>
              <NavLink
                to="/"
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                <FaHome style={{ fontSize: 25 }} />
                <ListItemText className="bold-and-large" primary="Home" />
              </NavLink>
            </ListItem>
            <ListItem button onClick={handleDrawerClose}>
              <NavLink
                to="/contact"
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                <FaPhone style={{ fontSize: 25 }} />
                <ListItemText className="bold-and-large" primary="Contact Us" />
              </NavLink>
            </ListItem>
            {isAuthenticated && (user?.role === "admin") && (
              <ListItem button onClick={handleDrawerClose}>
                <NavLink
                  to="/admin/login"
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <SupervisorAccountIcon style={{ fontSize: 25 }} />
                  <ListItemText
                    className="bold-and-large"
                    primary="Admin Panel"
                  />
                </NavLink>
              </ListItem>
            )}
            {isAuthenticated && (
              <ListItem
                button
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyItems: "center",
                }}
                onClick={() => {
                  handleDrawerClose();
                  handleClickOpen(setOpenAlert);
                }}
              >
                <Button
                  variant="contained"
                  className="nav-icon-span"
                  sx={{ marginBottom: 1 }}
                  endIcon={<FiLogOut />}
                >
                  <Typography variant="button" endIcon={<FiLogOut />}>
                    Logout
                  </Typography>
                </Button>
              </ListItem>
            )}
          </List>
        </div>
      </Drawer>

      <Dialog
        open={openAlert}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => handleClose(setOpenAlert)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent
          sx={{
            width: { xs: 280, md: 350, xl: 400 },
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6"> Do You Want To Logout?</Typography>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Link to="/">
            <Button
              variant="contained"
              endIcon={<FiLogOut />}
              color="primary"
              onClick={handleLogOut}
            >
              Logout
            </Button>
          </Link>
          <Button
            variant="contained"
            color="error"
            endIcon={<AiFillCloseCircle />}
            onClick={() => handleClose(setOpenAlert)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navigation;
