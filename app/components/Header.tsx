import React, { useContext } from "react";
import Link from "next/link";
import { MainContext } from "../Context/mainProvider";
import "./Header.css";
import { useRouter } from "next/navigation";
import { Button, AppBar, Toolbar, Typography, Grid } from "@mui/material";
import yelbus from "../assets/yelbus.png";
import Image from "next/image"
const Header = () => {
  const { isLogin, userName, setIsLogin, setUserName, setUserGender } =
    useContext(MainContext);
  const router = useRouter();

  const handleLogOut = () => {
    setIsLogin(false);
    setUserGender("");
    setUserName("");
    router.push("/");
  };

  

  return (
    <AppBar className="custom-header">

      <Toolbar className="custom-nav">
        {isLogin ? (
          <>
            <span className="custom-welcome-message">
              Hoşgeldin, {userName}{" "}
            </span>
            <button className="custom-logout-button" onClick={handleLogOut}>
              Çıkış Yap
            </button>
          </>
        ) : (
          <>
            <Grid container spacing={2} style={{ display: "flex", flexDirection: "row" ,justifyContent:"space-between"}}>

              <Grid item style={{margin:10}}>
                <Typography variant="h5" style={{ fontWeight: "bold", fontStyle: "italic" }}>
                  Rüya Yolu Bileti
                </Typography>
              </Grid>

              <Grid item style={{margin:2,marginLeft:100,marginTop:10}}>
                <Link className="custom-nav-link" href="/login">
                <Typography variant="h6" style={{ color:"white" }}>Giriş Yap </Typography>

                </Link>
              </Grid>

              <Grid item style={{margin:2,marginLeft:100,marginTop:10}}>
                <Link className="custom-nav-link" href="/register">
                <Typography variant="h6" style={{ color:"white" }}>Kayıt Ol</Typography>
                </Link>
              </Grid>

            </Grid>



          </>
        )}
      </Toolbar>

      <Image
        src={yelbus}
        alt="Sağ Köşe Resim"
        className="custom-corner-image"
      />
    </AppBar>

  );
};

export default Header;