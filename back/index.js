const express = require("express");
const cors = require("cors");

require('dotenv').config({path: "./.default.env"});

const authRouter = require("./routers/auth");
const userRouter = require("./routers/user");
const courseRouter = require("./routers/course");
const filesRouter = require("./routers/files");
const testRouter = require("./routers/test")
const chatRouter = require("./routers/chat")
const deleteRouter = require("./routers/delete");

const app = express();
const bodyParser = require('body-parser')

app.listen(process.env.PORT || 3010, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
});

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/files", filesRouter);
app.use("/test", testRouter);
app.use("/chat", chatRouter);
app.use("/delete", deleteRouter);

