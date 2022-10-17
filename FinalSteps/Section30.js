/*Step 1 - Save Composed Posts with MongoDB*/
//You need to install mongoose and require it in your app.js
//Terminal1: npm i mongoose
//Terminal2: mongod
//Terminali3: mongosh
//app.js:
const mongoose =require("mongoose");

//You’ll need to connect to a new database called blogDB
mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

//*You’ll need to create a new postSchema that contains a title and content.
const postSchema = { title: String, content: String };

//You’ll need to create a new mongoose model using the schema to define your posts collection.
const Post = mongoose.model("Post", postSchema);

//Inside the app.post() method for your /compose route,
//you’ll need to create a new post document using your mongoose model.
const post = new Post({ title: req.body.postTitle, content: req.body.postBody });

//You’ll need to save the document to your database instead of pushing to the posts array.
post.save()

/*-----------------------------------------------------------------------------*/
/*Step 2*/
//Goal: You should be able to go to the compose page
//and add a new post which will be added to your database as a new document.

/*If we go to localhost:3000/compose, Press Enter
/Write a Title and a post. For example as post we write: "Dibra is the best"
/*Terminal3:
show dbs
use blogDB
show collections
db.posts.find()
//here have to printed the posts that you made above: "Dibra is the best"
*/

//You’ll need to delete the existing posts array.
let posts = [];

//You’ll need to find all the posts in the posts collection and render that in the home.ejs file.
Post.find({}, function(err, posts) {
 res.render("home", { startingContent: homeStartingContent, posts: posts });
})

/*----------------------------------------------------------------------------
Step 3 - Fix the bug
At the moment, when you compose a post and redirect to the root route,
sometimes the post is not yet saved and doesn’t show up on the home page.
Goal: Add a callback to the save method to only redirect to the home page once save is complete with no errors.
*/
//You’ll need to add a call back to the mongoose save() method.
post.save(function(err){
 if (!err){ res.redirect("/"); }
 });

/*-----------------------------------------------------------------------------
Step 4 - Render the correct blog post based on post _id
Goal: When you click on Read More, it should take you to the post.ejs page rendering the correct post using the post._id
*/
/*In home.ejs you’ll need to change the href of the anchor tag based on the post id instead of the post name.*/
<a href="/posts/<%=post._id%>">Read More</a>

//In the app.post() method for the /post route, you should change  the express route parameter  to postId instead.
app.get("/posts/:postId", function(req, res){  }

//You’ll need a constant to store the postId parameter value
const requestedPostId = req.params.postId;

//You can use the findOne() method to find the post with a matching id in the posts collection.
Post.findOne({_id: requestedPostId}, function(err, post){ }

//Once a matching post is found, you can render its title and content in the post.ejs page.
Post.findOne( {id: requestedPostId}, function(err, post) {
 res.render("post", { title: post.title, content: post.content });
});
