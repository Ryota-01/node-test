import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Box,
  Card,
  Divider,
  ListItem,
  ListItemText,
  List,
  CircularProgress,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  const [formData, setFormData] = useState("");
  const [getData, setGetData] = useState("");
  const [loading, setLoading] = useState();

  // form送信処理
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/messages`, {
        text: formData,
      });
      console.log("Data sent successfully!");
      alert("送信しました。");
      getDataFromBackend();
    } catch (e) {
      console.error(e.message);
    }
  };

  // フォームに入力された値を保存
  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  // Firestoreからデータを取得
  useEffect(() => {
    getDataFromBackend();
  }, []);

  const getDataFromBackend = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/messages`)
      .then((res) => {
        console.log(res.data);
        setGetData(res.data);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Box width="70%" margin="24px auto" method="POST">
        <Card component="form" onSubmit={handleSubmit} sx={{ padding: "16px" }}>
          <Link to="/user">User　></Link>
          <TextField
            size="small"
            type="text"
            name="text"
            onChange={handleChange}
            margin="dense"
            fullWidth
            required
          />
          <Button type="submit" variant="outlined">
            送信
          </Button>
          <List>
            {getData.length > 0 ? (
              getData.map((data) => (
                <>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar edge="start" tabIndex={-1} />
                    </ListItemAvatar>
                    <ListItemText
                      color="text.secondary"
                      primary={`${data.text}`}
                    />
                  </ListItem>
                  <Divider />
                </>
              ))
            ) : (
              <>
                {loading ? (
                  <CircularProgress sx={{ mt: 3 }} />
                ) : (
                  <Typography
                    color="text.secondary"
                    variant="body1"
                    sx={{ mt: 3 }}
                  >
                    データが存在しません
                  </Typography>
                )}
              </>
              // <CircularProgress sx={{ mt: 2 }} />
            )}
          </List>
        </Card>
      </Box>
    </>
  );
}
