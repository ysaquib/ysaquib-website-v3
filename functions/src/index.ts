import * as functions from "firebase-functions";
import axios from "axios";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.sendRecaptcha = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "https://yusufsaquib.com");
  const secret = functions.config().recaptcha.secret;
  const token = req.query.token;
  const response = await axios.get(`https://recaptcha.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`);
  const data = response.data;
  if (data.success) {
    res.status(200).send({success: true, score: data.score});
  } else {
    res.status(200).send({success: false, score: 0});
  }
});
