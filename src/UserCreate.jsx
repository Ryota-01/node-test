import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserCreate() {
  const [inputEmail, setInputEmail] = useState();
  const [inputPhoneNumber, setInputPhoneNumber] = useState();
  const [inputPassword, setInputPassword] = useState();
  const [inputDisplayName, setInputDisplayName] = useState();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // form送信処理
  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = {
      email: inputEmail,
      emailVerified: false,
      phoneNumber: inputPhoneNumber,
      password: inputPassword,
      displayName: inputDisplayName,
      photoURL: "http://www.example.com/12345678/photo.png",
      disabled: false,
    };
    console.log(value);
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/usercreate`, value);
      console.log("Data sent successfully!");
      alert("ユーザー情報を作成しました");
      navigate("/home");
    } catch (e) {
      console.error(e.message);
    }
  };

  // ユーザー一覧を取得
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/usercreate`)
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((e) => {
        console.error(e.message);
      })
      .finally(() => {
        return <Typography>待機中・・・・・</Typography>;
      });
  }, []);

  const styles = (type, name, label) => ({
    input: {
      size: "small",
      margin: "dense",
      type: type,
      name: name,
      label: label,
      variant: "standard",
      fullWidth: true,
      required: true,
    },
  });

  return (
    <>
      <Box sx={{ width: { xs: "90%", md: "70%", margin: "24px auto" } }}>
        <Card
          component="form"
          sx={{ padding: "18px" }}
          onSubmit={handleSubmit}
          method="POST"
        >
          <Typography>User Create</Typography>
          <Box sx={{ width: "60%", margin: "16px auto" }}>
            <TextField
              {...styles("email", "email", "メールアドレス").input}
              onChange={(e) => setInputEmail(e.target.value)}
              value={inputEmail}
            />
            {/* 電話番号 */}
            {/* <TextField
              {...styles("string", "phonenumber", "電話番号").input}
              onChange={(e) => setInputPhoneNumber(e.target.value)}
              value={inputPhoneNumber}
            /> */}
            {/* パスワード */}
            <TextField
              {...styles("password", "password", "パスワード").input}
              onChange={(e) => setInputPassword(e.target.value)}
              value={inputPassword}
            />
            {/* ユーザー名 */}
            <TextField
              {...styles("text", "name", "名前").input}
              onChange={(e) => setInputDisplayName(e.target.value)}
              value={inputDisplayName}
            />
          </Box>
          <Button type="submit" variant="outlined">
            送信
          </Button>
        </Card>
      </Box>
    </>
  );
}
