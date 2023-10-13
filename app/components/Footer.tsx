import React from "react";
import Link from "next/link";
import { Typography, Container, Grid } from "@mui/material";
import "./Footer.css";

const Footer = () => {
  return (
      <Grid container spacing={1}  className="custom-footer">
        
        <Typography variant="h6" >
        Copyright © 2023 LojiPer Yazılım A.Ş. Tüm Hakları Saklıdır.
        </Typography>

        <Link href="/about">
          <Typography variant="h6" style={{ color: "white" }}>Hakkımızda</Typography>
        </Link>
      </Grid>

  );
};

export default Footer;