import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";

const OrderSummary = ({ total, shippingCoast }) => {
  return (
    <Card sx={{ width: { xs: 450, sm: 550, md: 550, lg: 700 }, mt: 8 }}>
      <CardContent>
        <Typography
          variant="div"
          component="h1"
          sx={{
            "@media (max-width:1050px)": {
              mt: 3,
              fontSize: "2.4rem",
            },
          }}
        >
          Order Summary
        </Typography>
        <Typography variant="subtitle2">
          <hr />
        </Typography>
        <Grid sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 2,
            }}
          >
            <Typography variant="body1" component="div" color="primary">
              SubTotal
            </Typography>
            <Typography variant="h6" component="div" color="primary">
              £{total - shippingCoast}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 2,
            }}
          >
            <Typography variant="body1" component="div" color="primary">
              Shipping
            </Typography>
            <Typography variant="h6" component="div" color="primary">
              £{shippingCoast}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 2,
            }}
          >
            <Typography variant="body1" component="div" color="primary">
              Total
            </Typography>
            <Typography variant="h6" component="div" color="primary">
              £{total}
            </Typography>
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
