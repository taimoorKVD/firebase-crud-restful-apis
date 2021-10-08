const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const admin = require("firebase-admin");
const serviceAccount = require("../permissions.json");
const express = require("express");
const cors = require("cors");
const app = express();
const db = admin.firestore();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
app.use( cors( {origin: true} ) );

// hello world //
app.get("/api/hello-world", ( req, res ) => {
    return res.status(200).send("Hello world.");
});

// create new product //
app.post("/api/create", ( req, res ) => {
    try {
        const collection = db.collection("products").doc("/" + req.body.id + "/")
        .create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        });
        return res.status(200).send(req.body.name + " created successfully.");
    }
    catch(error) {
        return res.status(500).send(error);
    }
});
// fetch product by id //

// fetch all products //

// update product by id //

// delete product by id //

// for increasing timeout //
const runtimeOpts = {timeoutSeconds: 300, memory: "1GB"};
exports.app = functions.runWith(runtimeOpts).https.onRequest(app);