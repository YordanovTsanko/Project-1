import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { AiFillDelete } from "react-icons/ai";
import styles from "./CartCard.module.css";

const CartCard = ({ product, handleRemoveFromCart }) => {
  return (
    <Card className={styles.cart_card}>
      <CardActionArea className={styles.card_action}>
        <Box className={styles.img_container}>
          <Box className={styles.img_box}>
            <img
              alt={product?.name}
              loading="lazy"
              src={product?.image}
              className={styles.img}
            />
          </Box>

          <Typography variant="h6">
            {product?.name.length > 20
              ? `${product?.name.slice(0, 20)}...`
              : product?.name}
          </Typography>
        </Box>
        <CardContent className={styles.item_content}>
          <Typography variant="h6">
            £{product?.price} x {product?.quantity} = £
            {product?.quantity * product?.price}
          </Typography>
        </CardContent>

        <Tooltip title="Remove From Cart">
          <Button
            variant="contained"
            color="error"
            onClick={() => handleRemoveFromCart(product.product)}
          >
            <AiFillDelete style={{ fontSize: 15 }} />
          </Button>
        </Tooltip>
      </CardActionArea>
    </Card>
  );
};

export default CartCard;
