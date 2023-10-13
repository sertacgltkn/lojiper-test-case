"use client";

import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";
import "./register.css";
import { saveUser } from "@/business-logic/userRegister";
import FormInput from "./components/FormInput";
import BirthdateInput from "./components/BirthdateInput";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [uniqueName, setUniqueName] = useState("");
  const [register, setRegister] = useState(false);

  const validateForm = () => {
    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !gender ||
      !birthDay ||
      !birthMonth ||
      !birthYear ||
      !uniqueName
    ) {
      setError("Lütfen tüm alanları doldurun");
      return false;
    }

    setError("");
    return true;
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      setIsLoading(true);

      const newUserInfo = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        birthDay: birthDay,
        birthMonth: birthMonth,
        birthYear: birthYear,
        username: uniqueName,
      };

      setError("");
      const isSaved = await saveUser(newUserInfo);
        setError("");
        setIsLoading(false);
        setRegister(true);
        setTimeout(() => {
          router.push("/login");
        }, 2400);
    }
  };

  return (
    <>
      <Container maxWidth="sm" style={{ marginBottom: "5%" }}>
        <Header />
        {register ? (
        <div className="centered-container">
        <div className="icon-container">
          ✅ 
        </div>
        <div className="text-container">
          Kayıt olma işlemi başarılı..! <br/> Giriş Sayfasına Yönlendiriliyorsunuz..!
        </div>
        <style jsx>{`
          .centered-container {
            display: flex;
            flex-direction: column; /* İçerikleri dikey olarak sırala */
            align-items: center;
            justify-content: center;
            height: 100vh;
          }
  
          .icon-container {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100px;
            height: 100px;
            background-color: #4CAF50;
            border-radius: 50%;
            font-size: 48px;
            color: #fff;
          }
  
          .text-container {
            margin-top: 20px; /* İkon ile metin arasına boşluk ekler */
            font-size: 24px;
          }
        `}</style>
      </div>
        ) : (
          <Paper
            elevation={3}
            style={{ padding: 50, borderRadius: "8px", marginTop: "200px" }}
          >
            <ToastContainer />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h4" component="h1" gutterBottom>
                Kayıt Ol
              </Typography>
              <form onSubmit={handleRegister}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  onChange={setEmail}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Parola"
                  type="password"
                  onChange={setPassword}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="İsim"
                  type="text"
                  onChange={setFirstName}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Soyisim"
                  type="text"
                  onChange={setLastName}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Kullanıcı Adı"
                  type="text"
                  onChange={setUniqueName}
                  margin="normal"
                />
                <FormInput
                  label="Cinsiyet"
                  type="select"
                  value={gender}
                  onChange={setGender}
                  options={[
                    { value: "", label: "Seçin" },
                    { value: "female", label: "Kadın" },
                    { value: "male", label: "Erkek" },
                    { value: "unknow", label: "Belirtmek İstemiyorum" },
                  ]}
                />
                <BirthdateInput
                  birthDay={birthDay}
                  birthMonth={birthMonth}
                  birthYear={birthYear}
                  onDayChange={setBirthDay}
                  onMonthChange={setBirthMonth}
                  onYearChange={setBirthYear}
                />

                {error && (
                  <Typography variant="body1" color="error" paragraph>
                    {error}
                  </Typography>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  style={{ marginTop: "20px" }}
                >
                  Kayıt Ol
                </Button>
                {isLoading && <Loading />}
              </form>
            </Box>
          </Paper>
        )}
      </Container>
      <Footer />
    </>
  );
}