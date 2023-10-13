"use client";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";
import { validateUserLogin } from "../../business-logic/userValidation";
import { MainContext } from "../Context/mainProvider";
import { LoginFormProps } from "../Interfaces/uiRelatedTypes";
import Header from "../components/Header";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Link as MuiLink,
  Grid,
} from "@mui/material";
import {toast, ToastContainer} from "react-toastify";
import {showToastFail} from "@/app/register/components/ShowToast";
import Footer from "../components/Footer";

export const useClient = true;

const LoginForm: React.FC<LoginFormProps> = ({
  setUsername,
  setPassword,
  error,
  handleLogin,
  handleRegisterRedirect,
}) => {
  return (
      <form onSubmit={handleLogin}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Kullanıcı Adı"
              variant="outlined"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="password"
              label="Parola"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography variant="body1" style={{ color: "red" }}>
                {error}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="secondary" fullWidth>
              Giriş Yap
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              Hesabınız yok mu?{" "}
              <MuiLink
                onClick={handleRegisterRedirect}
                style={{ cursor: "pointer", color: "blue" }}
              >
                Kayıt olun
              </MuiLink>
            </Typography>
          </Grid>
        </Grid>
      </form>
    
  );
};

const Login = () => {
  const { isLogin, setIsLogin, setUserName, setUserGender } =
    useContext(MainContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setTimeout(async () => {
      const currentUser = await validateUserLogin(
          username,
          password,
          setError,
          setIsLoading,
          setIsLogin,
          setUserName,
          setUserGender
      );
      toast.success("Giriş Başarılı!");
    }, 2000);
  };

  useEffect(() => {
    if (isLogin) {
      router.push("/");
    }
  }, [isLogin]);

  const handleRegisterRedirect = () => {
    setIsLoading(true); // Show loading indicator

    setTimeout(() => {
      router.push("/register");
      toast.info("Kayıt Sayfasına Yönlendiriliyorsunuz, Lütfen Bekleyiniz!");
      setIsLoading(false); // Hide loading indicator when the timeout is done
    }, 2000); // Adjust the delay time (in milliseconds) as needed
  };


  return (
   
    <>
     <Container maxWidth="sm">
      {isLoading ? (
              <div className="center-content">
                  <Loading />
                  <ToastContainer position="top-right" autoClose={5000} />
              </div>
          ) :
          (
            <Container maxWidth="sm" style={{ marginTop: "5%" }}>
              <Paper
                  elevation={3}
                  style={{ padding: 50, borderRadius: "8px", marginTop: "200px" }}
              >
                <Typography
                    variant="h4"
                    component="h1"
                    align="center"
                    color={"purple"}
                    gutterBottom
                >
                  Kullanıcı Girişi
                </Typography>
                <LoginForm
                    username={username}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    error={error}
                    isLoading={isLoading}
                    handleLogin={handleLogin}
                    handleRegisterRedirect={handleRegisterRedirect}
                />
              </Paper>
            </Container>
          )}
      <Header />
      </Container>
      <Footer />
    </>
  );
};

export default Login;