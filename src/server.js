import express from "express";

import router from "./routes";

const PORT = 1910

const app = express();
app.use(express.json());
app.use(router);

app.listen(PORT, function () {
    console.log("Server started!");
});
