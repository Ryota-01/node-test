const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const cors = require("cors");
const ServiceAccount = require("./ServiceAccount.json");

// Firebaseのinitialize
admin.initializeApp({ credential: admin.credential.cert(ServiceAccount) });

// Firestoreの参照を取得
const db = admin.firestore();

// Expressのセットアップ
const app = express();
app.use(bodyParser.json());
app.use(cors()); // corsミドルウェアを設定

// Firebase Authenticationのインスタンスを取得
const auth = admin.auth();

// corsの設定
app.options("*", cors()); // プリフライトリクエストに対する応答を許可

// ユーザー情報取得メソッド
app.get("/users", async (req, res) => {
  try {
    // 全てのユーザー情報を取得
    const listUsersResult = await auth.listUsers();
    const users = listUsersResult.users;
    res.json(users);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: "ユーザー情報の取得に失敗しました" }); // エラーレスポンスを返す
  }
});

// ユーザー情報作成メソッド
app.post("/usercreate", async (req, res) => {
  console.log(req.body);
  try {
    const userRecord = await auth.createUser(req.body);
    console.log("Message added to Firebase:", userRecord);
    res.status(201).json({ message: "User added successfully" });
  } catch (e) {
    console.error("Error adding user to Firebase:", e);
    res.status(500).json({ error: "Failed to add user to Firebase" });
  }
});

// ユーザー情報編集メソッド
app.post("/useredit", async (req, res) => {
  console.log(req.body.name);
  try {
    const docName = req.body.name;
    const userRef = await db.collection("users").doc(docName);
    await userRef.set(req.body);
    console.log("Message added to Firebase:", req.body);
    res.status(201).json({ message: "User added successfully" });
  } catch (e) {
    console.error("Error adding user to Firebase:", e);
    res.status(500).json({ error: "Failed to add user to Firebase" });
  }
});

// Expressを起動する
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`app start listening on port ${PORT}`));
