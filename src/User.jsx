import {
  Avatar,
  Box,
  Card,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function User() {
  const [users, setUsers] = useState([]);

  // ユーザー一覧を取得
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((e) => {
        console.error(e.message);
      })
      .finally(() => {
        return <Typography>待機中・・・・・</Typography>;
      });
  }, []);

  return (
    <>
      <Box sx={{ width: { xs: "90%", md: "70%", margin: "24px auto" } }}>
        <Card sx={{ padding: "16px", mt: 2 }}>
          <Typography>Users</Typography>
          <List>
            {users.length > 0 ? (
              users.map((user) => (
                <>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar edge="start" tabIndex={-1} />
                    </ListItemAvatar>
                    <Link to={"/userinfo"} state={{ user: user }}>
                      <ListItemText
                        color="text.secondary"
                        primary={`${user.displayName}`}
                      />
                    </Link>
                  </ListItem>
                  <Divider />
                </>
              ))
            ) : (
              <></>
            )}
          </List>
        </Card>
      </Box>
    </>
  );
}
