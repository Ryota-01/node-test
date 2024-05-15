import {
  Alert,
  Box,
  Button,
  Card,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function UserEdit() {
  const location = useLocation();
  const user = location.state;
  console.log(user)
  const navigate = useNavigate();
  const [inputAge, setInputAge] = useState();
  const [inputBirthplace, setInputBirthplace] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = {
      name: user.displayName,
      age: inputAge === null || inputAge === undefined ? user.age : inputAge,
      birthplace:
        inputBirthplace === null || inputBirthplace === undefined
          ? user.birthplace
          : inputBirthplace,
    };
    try {
      const result = window.confirm("ユーザー情報を編集を編集しますか？");
      console.log(value)
      if (result) {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/useredit`,
          value
        );
        console.log("Data sent successfully!");
        navigate("/home");
        alert("ユーザー情報を編集しました")
      } else {
        return 
      }
    } catch (e) {
      console.error(e.message);
    }
  };
  return (
    <div>
      <Box width="70%" margin="32px auto">
        <Card sx={{ padding: "24px", mt: 2 }}>
          <Typography>Useredit</Typography>
          <Divider />

          <Box
            component="form"
            method="POST"
            onSubmit={handleSubmit}
            sx={{ width: "50%", margin: "24px auto" }}
          >
            
            <TextField
              type="number"
              size="small"
              margin="dense"
              name="age"
              label="年齢"
              variant="standard"
              onChange={(e) => setInputAge(e.target.value)}
              defaultValue={user.age}
              fullWidth
            />
            <TextField
              type="text"
              size="small"
              margin="dense"
              name="birthplace"
              label="出身"
              variant="standard"
              onChange={(e) => setInputBirthplace(e.target.value)}
              defaultValue={user.birthplace}
              fullWidth
            />
            <Box sx={{ margin: "20px auto" }}>
              <Alert severity="info">
                氏名の変更は管理者へご連絡ください。
              </Alert>
            </Box>
            <Button type="submit" variant="outlined">
              更新
            </Button>
          </Box>
        </Card>
      </Box>
    </div>
  );
}
