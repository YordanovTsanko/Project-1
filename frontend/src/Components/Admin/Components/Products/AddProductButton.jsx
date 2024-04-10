import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React from "react";
import AddProductForm from "./AddProductForm";
import axios from "axios";

const AddProductButton = () => {
  const [open, setOpen] = React.useState(false);
  const [productInfo, setProductInfo] = React.useState({
    name: "",
    img: "",
    price: "",
    stock: "",
    category: "",
    description: "",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="error"
        href="#outlined-buttons"
        onClick={handleClickOpen}
      >
        Add Product
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: async (event) => {
            event.preventDefault();
            const config = {
              headers: {
                "Content-Type": "application/json",
              },
            };
            try {
              const { data } = await axios.post(
                "/api/v1/admin/product/new",
                productInfo,
                config
              );
              console.log(data)
              handleClose();
            } catch (error) {
              console.log(error);
            }
          },
        }}
      >
        <DialogTitle>Add New Product</DialogTitle>
        <AddProductForm
          productInfo={productInfo}
          setProductInfo={setProductInfo}
        />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddProductButton;
