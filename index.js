const express = require("express");
const cors = require('cors');
require('dotenv').config();
const { connection } = require("./db");
const {businessRouter}=require("./routes/business.route")
const {ownerRouter}=require("./routes/owner.route")

const app = express();

app.use(express.json());
app.use(cors());


app.use("/api/business", businessRouter);
app.use("/api/owner", ownerRouter);

app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("connected to DB");
    } catch (er) {
        console.log(er);
    }
    console.log(`server running at ${process.env.PORT}`);
});
