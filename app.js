const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require("mongoose"); //I.1 REQUIRE MONGOOSE
const configss = require("./Configs");//SECURE

//------------------------------------------------------------------------------
const homeStartingContent = "Erebara is one of the most beautiful villages in Albania. It is part of the Maqellara municipality in the Diber district. " +
 "Erebara is located at an elevation of 962 meters above sea level. It is situated nearby to Herbel village, and south of Trepçë village. " +
 "Erebara is also known as Erebara, Erebare, Erebarë.";
const aboutContent = " Erebara stands out for many things, below we mention some of them:"
const contactContent = "You can contact us through the pages below:";
//------------------------------------------------------------------------------

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//----------------------------------MONGODB-------------------------------------
//I.2 CONNECT to MongoDB Atlas
//mongoose.connect("mongodb://localhost:27017/todolistDB") //2) Create a new database called todolistDB
//COPY-PASTE FROM Atlas Cluster-Connect your application, set pswd, delete this part ?retryWrites=true&w=majority/
mongoose.connect("mongodb+srv://admin-"+configss.name+":"+configss.pswd+"@atlascluster.qs6ael0.mongodb.net/todolistDB");

const postSchema = { //I.3 POSTSCHEMA
 titleKey: String,
 contentKey: String
};
const Post = mongoose.model("Post", postSchema); //I.4 MODEL-POSTSCHEMA

/*----------------------------------------------------------------------------*/
app.get("/", function(req, res) {

 Post.find({}, function(err, posts) { //II.2
  res.render("home", {
   startingContent: homeStartingContent,
   posts: posts
  });
 });
});

//------------------------------------------------------------------------------
app.get("/compose", function(req, res) {
 res.render("compose") //Challenge7
});

//------
app.post("/compose", function(req, res) {
 const postJSobject = new Post({  //variable can be named post or postJSobject or othername  //I.5 NEW POST
  titleKey: req.body.postTitle,
  contentKey: req.body.postBody
 });

 postJSobject.save(function(err) { //I.6 & III     instead of //posts.push(postJSobject);
  if (!err) {
   res.redirect("/");
  }
 });
});




app.get("/posts/:postId", function(req, res){

 const requestedPostId = req.params.postId;
 Post.findOne( {_id: requestedPostId}, function(err, postObj) {
  if (!err) {
   res.render("post", {
    titleKey: postObj.titleKey,
    contentKey: postObj.contentKey
   });
   console.log("Match");
   }
  else {
   console.log("Not a Match");
  }
 });
});

//------------------------------------------------------------------------------
app.get("/about", function(req, res) {
 res.render("about", {aboutContent_key: aboutContent });
});

app.get("/contact", function(req, res) {
 res.render("contact", {contactContent_key: contactContent });
});


//Heroku
app.listen(process.env.PORT|| 3000, function() { //0
 console.log("The server is running on port 3000");
});
