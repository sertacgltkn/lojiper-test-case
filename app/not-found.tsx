import { Typography, Button, Container } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import Notfound from "../app/Notfound.png";

const NotFound = () => {
  return (
    <Container maxWidth="sm">
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Link href="/" passHref>
          <Button variant="contained" color="primary">
            Anasayfa'ya Dön
          </Button>
        </Link>
      </div>
      <div style={{ textAlign: "center" }}>
        <Image src={Notfound} alt="404" width={600} height={400} />
      </div>
      <Typography variant="h1" component="h1" align="center">
        404
      </Typography>
      <Typography variant="h3" component="h1" align="center">
        Üzgünüz, aradığınız sayfa bulunamadı.
      </Typography>
      <Typography variant="h6" align="center">
        Belki de yanlış bir yol aldınız. Lütfen ana sayfaya geri dönün.
      </Typography>
      
    </Container>
  );
};

export default NotFound;
