const express = require("express");

const app = express();

//CRUD



// middleware
app.use('/posts', ()=>{
  console.log('this is middleware')
})

app.get("/", (req, res) => {
  res.send("We are on home");
});

app.get("/posts", (req, res) => {
  res.send("we are on posts")
});

// app.post();
// app.put();
// app.delete();

//configuration 
const port = process.env.PORT || 3000; // change it in the terminal 'export PORT=5000'
app.listen(port, () => console.log(`Listening on port ${port}`));
