import React from "react";
import { Container, Typography, TextField, Button, Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: "20px",
        minHeight: "calc(100vh - 224px)",

        "@media (min-width: 961px)": {
          mt: 0,
          mb: 5,
        },
      }}
    >
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" paragraph>
        Have questions or feedback? Feel free to reach out to us. We'd love to
        hear from you!
      </Typography>
      <Typography variant="body2" paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit,
        justo a facilisis tristique, justo felis facilisis velit, vitae
        consectetur orci justo id nunc. Fusce efficitur, elit nec egestas
        hendrerit, quam est luctus turpis, in vestibulum nisi odio at nisl.
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField label="Your Name" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Your Email" fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Message" multiline rows={4} fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<SendIcon />}
            >
              Send Message
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ContactUs;
