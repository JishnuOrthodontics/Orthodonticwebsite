import React from "react";
import { Typography, Button } from "@mui/material";

function SupportDesk() {
  return (
    <div>
      <Typography variant="body1">
        For immediate support, call us at:
      </Typography>
      <Typography variant="h6">+91 7907504639</Typography>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "10px" }}
        href="mailto:dr.jishnu.ortho@gmail.com"
      >
        Email Support
      </Button>
    </div>
  );
}

export default SupportDesk;