const express = require("express");
const path = require("path");

const app = express();

app.use("/static", express.static(path.resolve(__dirname,"front_end", "static")));


app.get("/*",(req, res) =>{
    res.sendFile(path.resolve(__dirname,"front_end","index.html"));
});

app.listen(process.env.PORT || 8080, () => console.log("Server running..."));

