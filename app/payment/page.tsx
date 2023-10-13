"use client";
import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MainContext } from "../Context/mainProvider";
import Link from "next/link";
import Image from "next/image";
import Loading from "../components/Loading";
import Header from "../components/Header";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import "../styles/Home.css";
import Card from "../assets/Card.png";
import Footer from "../components/Footer";

const PaymentPage = () => {
  const { totalPrice, setTotalPrice } = useContext(MainContext);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardHolder: "",
    expirationDate: "",
    cvv: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPaymentInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handlePaymentSubmit = (event) => {
    event.preventDefault();
    if (
      paymentInfo.cardNumber === "" ||
      paymentInfo.cardHolder === "" ||
      paymentInfo.expirationDate === "" ||
      paymentInfo.cvv === ""
    ) {
      toast.error("Tüm ödeme bilgilerini doldurmanız gerekiyor.");
      return;
    }

    setIsPaymentProcessing(true);

    setTimeout(() => {
      setIsPaymentProcessing(false);
      setIsPaymentSuccessful(true);
      toast.success("Ödeme başarılı oldu!...");
    }, 1800);
  };

  return (
    <>
      <Container maxWidth="sm" className="main" style={{ marginBottom: "5%" }}>
        <Header />
        <Typography variant="h4" gutterBottom style={{ marginTop: "5rem" }}>
          Ödeme Ekranı
        </Typography>
        <Image src={Card} alt="Card" />
        <Typography variant="h6">Toplam Tutar: {totalPrice} ₺</Typography>

        {isPaymentProcessing ? (
          <CircularProgress style={{ margin: "1rem auto" }} />
        ) : (
          <>
            {isPaymentSuccessful ? (
              <>
                <Typography
                  variant="body1"
                  style={{
                    color: "green",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  }}
                >
                  Ödeme başarıyla tamamlandı!
                </Typography>
                <Link href="/" onClick={() => setTotalPrice(0)}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "1rem" }}
                  >
                    Anasayfaya Dön
                  </Button>
                </Link>
              </>
            ) : (
              <form onSubmit={handlePaymentSubmit}>
                <TextField
                  fullWidth
                  style={{ marginBottom: "1rem" }}
                  label="Kart Numarası"
                  variant="outlined"
                  name="cardNumber"
                  value={paymentInfo.cardNumber}
                  onChange={handleInputChange}
                  inputProps={{ maxLength: 16 }}
                  placeholder="XXXX XXXX XXXX XXXX"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="cc-number"
                  onInput={(e) => {
                    e.target.value = e.target.value
                      .replace(/\D/g, "")
                      .replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$1 $2 $3 $4");
                  }}
                />

                <TextField
                  fullWidth
                  style={{ marginBottom: "1rem" }}
                  label="Ad Soyad"
                  variant="outlined"
                  name="cardHolder"
                  value={paymentInfo.cardHolder}
                  onChange={handleInputChange}
                  inputProps={{
                    pattern: "^[A-Za-zğüşıöçĞÜŞİÖÇ ]+$",
                    title: "Lütfen yalnızca harf karakterleri kullanın.",
                  }}
                  placeholder="Ad Soyad"
                />

                <TextField
                  fullWidth
                  style={{ marginBottom: "1rem" }}
                  label="Son Kullanma Tarihi (AA/YY)"
                  variant="outlined"
                  name="expirationDate"
                  value={paymentInfo.expirationDate}
                  onChange={handleInputChange}
                  placeholder="AA/YY"
                  inputProps={{
                    maxLength: 5,
                    inputMode: "numeric",
                    pattern: "^(0[1-9]|1[0-2])/(0[0-9]|1[0-9]|2[0-9]|3[0-5])$",
                    title:
                      "Geçerli bir son kullanma tarihi girin (AA/YY formatında).",
                  }}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, "");
                    if (e.target.value.length > 2) {
                      e.target.value =
                        e.target.value.substring(0, 2) +
                        "/" +
                        e.target.value.substring(2);
                    }
                  }}
                />

                <TextField
                  fullWidth
                  style={{ marginBottom: "1rem" }}
                  label="CVV"
                  variant="outlined"
                  name="cvv"
                  value={paymentInfo.cvv}
                  onChange={handleInputChange}
                  inputProps={{ maxLength: 3 }}
                  onInput={(e) => {
                    e.target.value = e.target.value
                      .replace(/\D/g, "")
                      .replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, "$1 $2 $3 $4");
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handlePaymentSubmit}
                >
                  Ödemeyi Onayla
                </Button>
              </form>
            )}
          </>
        )}

        <ToastContainer />
      </Container>
      <Footer />
    </>
  );
};

export default PaymentPage;
