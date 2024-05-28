
const express = require("express");
const cors = require('cors')
const app = express();

const imgroute = require('./routes/upload')
const userroute = require("./routes/user")
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();
const uri = process.env.MONGO;
app.use(express.json())

app.use(cors());


const PORT = process.env.PORT
mongoose.connect(uri).then(
  ()=>{console.log("mongo db is connected");
  app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
  }
)



app.use((req, res, next) => {
  req.user = { username: 'newuser' }; // Mocked user
  next();
});


app.use('/',userroute)
app.use('/',imgroute)