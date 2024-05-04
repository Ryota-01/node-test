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

// corsの設定
app.options("*", cors()); // プリフライトリクエストに対する応答を許可

app.get("/messages", async (req, res) => {
  try {
    // messagesコレクションのデータを全件取得
    const messageRef = db.collection("messages");
    const snapshots = await messageRef.get();
    // レスポンスからデータ部分のみ取り出す。
    const messages = snapshots.docs.map((doc) => doc.data());
    console.log(messages);
    res.json(messages);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: "Failed to fetch messages" }); // エラーレスポンスを返す
  }
});

const generateDocName = () => {
  const date = new Date();
  const getFullYear = date.getFullYear();
  const getMonth = date.getMonth() + 1;
  const getDate = date.getDate();
  const getHours = date.getHours();
  const getMinutes = date.getMinutes();
  const getSeconds = date.getSeconds();
  const formattedDocName = `${getFullYear}-${getMonth}-${getDate}_${getHours}:${getMinutes}:${getSeconds}`;
  return formattedDocName;
};

app.post("/messages", async (req, res) => {
  console.log(generateDocName());
  try {
    const text = req.body.text;
    console.log(text);
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }
    const docName = generateDocName();
    const messageRef =  await db.collection("messages").doc(`${docName}`);
    const message = {
      text,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    };
    await messageRef.set(message);
    console.log("Message added to Firebase:", message);
    res.status(201).json({ message: "Message added successfully" });
  } catch (e) {
    console.error("Error adding message to Firebase:", e);
    res.status(500).json({ error: "Failed to add message to Firebase" });
  }
});

// Expressを起動する
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`app start listening on port ${PORT}`));
