import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function DealerPortal() {
  return (
    <Container maxWidth="md" style={{ padding: "20px", marginTop: "40px" }}>
      <Typography variant="h3" align="center" gutterBottom>
        Dealer Portal
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Join our marketplace and start selling your dental and orthodontic materials to doctors around the world!
      </Typography>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/dealer/signup"
          style={{ marginRight: "10px" }}
        >
          Sign Up as Dealer
        </Button>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/dealer/login"
        >
          Dealer Login
        </Button>
      </div>
    </Container>
  );
}

export default DealerPortal;