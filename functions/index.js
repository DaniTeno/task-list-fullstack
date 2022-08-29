const functions = require("firebase-functions");
const cors = require('cors')
const admin = require("firebase-admin");
const express = require("express");
const serviceAccount = require("./permissions.json");
const app = express();
const credentials = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cobuild-193ee.firebaseio.com",
};

admin.initializeApp(credentials);
app.use(cors())

const db = admin.firestore();

app.put("/api/tasks/:docId", async (req, res) => {
  const { docId } = req.params;
  const { doneMark } = req.body;
  await db.collection("tasks")
    .doc(docId)
    .update({ doneMark })
  return res.status(200).json({ message: "doc updated!" });
});

exports.app = functions.https.onRequest(app);
