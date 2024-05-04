import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function UserInfo() {
  const location = useLocation();
  const { user } = location.state;
  console.log(user);
  const creationTime = user.metadata.creationTime;
  const lastSignInTime = user.metadata.lastSignInTime;
  const navigate = useNavigate();

  const formatTime = (time) => {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const d = date.getDate();
    const formatDate = `${year}年${month}月${d}日`;
    return formatDate;
  };

  const onClick = () => {
    navigate(`/useredit/${location.key}`, { state: user });
  };
  const styles = {
    item: {
      xs: 12,
      md: 6,
    },
    textStyle: {
      variant: "body2",
      color: "text.secondary",
      padding: {
        xs: "8px 0",
        md: "12px 0",
      },
    },
  };
  return (
    <>
      <Box sx={{ width: { xs: "90%", md: "40%", margin: "32px auto" } }}>
        <Card sx={{ padding: "24px", mt: 2 }}>
          <Typography>Userinfo</Typography>
          <Divider />
          <Box sx={{ mt: 4, mb: 4 }}>
            <Avatar sx={{ margin: "12px auto" }} />
            <Typography {...styles.textStyle}>{user.displayName}</Typography>
            <Typography {...styles.textStyle}>{user.email}</Typography>

            {user.phoneNumber === undefined || user.phoneNumber === null ? (
              <Typography {...styles.textStyle}>ーー</Typography>
            ) : (
              <Typography {...styles.textStyle}>{user.phoneNumber}</Typography>
            )}
            <Typography {...styles.textStyle}>{user.uid}</Typography>
            <Typography {...styles.textStyle}>
              作成日：{formatTime(creationTime)}
            </Typography>
            {lastSignInTime === null ? (
              <Typography {...styles.textStyle}>
                最終ログイン：ログイン情報なし
              </Typography>
            ) : (
              <Typography {...styles.textStyle}>
                最終ログイン：{formatTime(lastSignInTime)}
              </Typography>
            )}
            <Divider />
          </Box>
          <Button variant="outlined" onClick={onClick}>
            ユーザー情報編集画面へ
          </Button>
        </Card>
      </Box>
    </>
  );
}
