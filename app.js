require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");

const { corsOptions } = require("./models.js");
const blogRoute = require("./routes/blog");
const dashRoute = require("./routes/dashboard");
const loginRoute = require("./routes/login");
const userRoute = require("./routes/user");
const commentRoute = require("./routes/comments");
const followRoute = require("./routes/follow");
const likeRoute = require("./routes/likes");
const reviewRoute = require("./routes/review");
const bucketRoute = require("./routes/bucket");
const recomandationRoute = require("./routes/recomandation");
const competitionRoute = require("./routes/competition");
const rankingRoute = require("./routes/ranking");

app.use(cors(corsOptions));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true });

app.use("/", blogRoute);
app.use("/", dashRoute);
app.use("/", userRoute);
app.use("/", loginRoute);
app.use("/", bucketRoute);
app.use("/", followRoute);
app.use("/", reviewRoute);
app.use("/", commentRoute);
app.use("/", reviewRoute);
app.use("/", likeRoute);
app.use("/", recomandationRoute);
app.use("/", competitionRoute);
app.use("/", rankingRoute);

app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("index");
  } else {
    res.redirect("/login");
  }
});

app.get("/write", (req, res) => {
  res.render("write");
});

app.post("/write", (req, res) => {
  console.log(req.body);
});

// app.get("/dashboard/:userId", (req, res) => {
//   let id = req.params.userId;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).send("Invalid user ID.");
//   }
//   User.findOne({ _id: id }, function (err, user) {
//     if (err) {
//       console.log(err);
//       return res
//         .status(500)
//         .send("An error occurred while retrieving the user.");
//     }
//     if (!user) {
//       return res.status(404).send("User not found.");
//     }
//     res.render("dashboard", { username: user.username });
//   });
// });

app.get("/register", function (req, res) {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", function (req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, function (err) {
    if (!err) {
      passport.authenticate("local")(req, res, function () {
        // Retrieve the user object from the database
        User.findOne({ username: req.body.username }, function (err, user) {
          if (err) {
            console.log(err);
          } else {
            // Redirect to the dashboard with the actual user ID
            res.redirect("/");
          }
        });
      });
    }
  });
});

app.post("/signup", function (req, res) {
  User.register(
    { username: req.body.username, email: req.body.email },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/index");
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/dashboard/" + user._id);
        });
      }
    }
  );
});

app.listen(process.env.PORT, function () {
  console.log(`Server started on http://localhost:${process.env.PORT}`);
});
