import {
  Card,
  Button,
  CardActionArea,
  CardActions,
  Rating,
  CardContent,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Box } from "@mui/system";
import styles from "./ProductCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/Actions/cartActions";
import { Transition } from "../Layouts/Handlers";
import { AiFillCloseCircle, AiOutlineLogin } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";

const ProductCard = ({ prod }) => {
  const [openAlert, setOpenAlert] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleAddToCart = async (e, id) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setOpenAlert(true);
    } else {
      setOpenAlert(false);
      dispatch(addToCart(id));
    }
  };

  return (
    <>
      <Dialog
        open={openAlert}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenAlert(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent sx={{ width: { xs: 280, md: 350, xl: 400 } }}>
          <DialogContentText
            style={{ textAlign: "center" }}
            id="alert-dialog-slide-description"
          >
            Please Login To Proceed
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Link to="/login">
            {" "}
            <Button
              variant="contained"
              endIcon={<AiOutlineLogin />}
              color="primary"
            >
              Login
            </Button>
          </Link>
          <Button
            variant="contained"
            color="error"
            onClick={() => setOpenAlert(false)}
            endIcon={<AiFillCloseCircle />}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Card className={styles.main_card}>
        <CardActionArea className={styles.card_action}>
          <Box className={styles.cart_box}>
            <img
              alt={prod.name}
              src={prod.img}
              loading="lazy"
              className={styles.cart_img}
            />
          </Box>

          <Typography
            gutterBottom
            variant="h5"
            sx={{
              mt: 2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {prod.name.length > 20 ? prod.name.slice(0, 20) + "..." : prod.name}
          </Typography>

          <CardActions
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="h6" color="primary">
              £{prod.price}
            </Typography>
            <Typography>
              <Rating precision={0.5} name="read-only" value={2} readOnly />
            </Typography>
          </CardActions>
        </CardActionArea>

        <CardContent>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => handleAddToCart(e, prod._id)}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductCard;
