require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require("passport");

const {corsOptions} = require('./models.js');
const blogRoute=require('./routes/blog')


app.use(cors(corsOptions))
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({secret:process.env.SECRET, resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGOLAB_URI,{useNewUrlParser: true});

app.post("/",(req,res)=>{
  console.log(req.body)
  res.send("done")
})


app.listen(process.env.PORT, function() {
  console.log(`Server started on http://localhost:${process.env.PORT}`);
});
























// const express = require('express');
// const { Like, addObjectToExistingObject } = require('./Like');

// const router = express.Router();

// router.post('/', async (req, res) => {
//   try {
//     const existingObject = req.body.existingObject;
//     const newKey = req.body.newKey;
//     const newValue = req.body.newValue;

//     const updatedObject = addObjectToExistingObject(existingObject, newKey, newValue);

//     const like = new Like({
//       user: req.user._id,
//       object: updatedObject,
//     });
//     await like.save();
//     res.send({ success: true });
//   } catch (error) {
//     res.status(400).send({ success: false, error: error.message });
//   }
// });

// module.exports = router;



// const mongoose = require('mongoose');

// const likeSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   object: {
//     type: Object,
//     required: true,
//   },
// }, {
//   timestamps: true,
// });

// const Like = mongoose.model('Like', likeSchema);

// function addObjectToExistingObject(existingObject, newKey, newValue) {
//   return {
//     ...existingObject,
//     [newKey]: newValue,
//   };
// }

// module.exports = {
//   Like,
//   addObjectToExistingObject,
// };



 // const existingObject = { name: 'John', age: 30 };
  // const newKey = 'address';
  // const newValue = '123 Main St.';
  
  // const updatedObject = addObjectToExistingObject(existingObject, newKey, newValue);
  // console.log(updatedObject);
  // // Output: { name: 'John', age: 30, address: '123 Main St.' }



//   function toggleKeyValuePair(obj, key, value) {
//     if (obj[key] === value) {
//       delete obj[key];
//     } else {
//       obj[key] = value;
//     }
//   }


//   function toggleKeyValuePairWithNumberedValue(obj, value) {
//     let keyToDelete;
//     for (let existingKey in obj) {
//       if (obj[existingKey] === value) {
//         keyToDelete = existingKey;
//         break;
//       }
//     }
//     if (keyToDelete) {
//       delete obj[keyToDelete];
//     } else {
//       let currentNumber = 1;
//       let keyPrefix = '';
//       for (let existingKey in obj) {
//         let num = parseInt(existingKey);
//         if (num >= currentNumber) {
//           currentNumber = num + 1;
//         }
//         keyPrefix = existingKey.replace(/[0-9]/g, '');
//       }
//       obj[`${keyPrefix}${currentNumber}`] = value;
//     }
//   }


   // app.get("/like/:blogId/:userId",(req, res) => {
    //   const { blogId, userId } = req.params;
    //   let detect = true;
    //   Like.find({blogId, userId},(err,user)=>{
      //     detect = user[0].like;
  //     Like.updateOne({ blogId, userId },{
  //       like:!detect
  //      },(err,like)=>{     
    //        res.status(201).json({message:"like changed",user:user[0]});
    //       });
    //   })
    // });

    // app.post("/like",(req,res)=>{
    //   console.log(req.body)
    //   const like = new Like({
    //     userId:req.body.userId,
    //     blogId:req.body.blogId,
    //     like:true
    //   })
    //   like.save(()=>{
    //     res.status(201).json({message:"like is saved", docs:like})
    //   })
    // })


//   obj={
//     "1":"G",
//     "3":"tt",
//     "fd":"RT"
// }
// let value = "r"


// for (let Key in obj) {
//     console.log("key", Key)
//     console.log("value",obj[Key])

//     if (obj[Key] === value) {
//       break;
//     }
//   }


    // const likeSchema = new mongoose.Schema({
    //   userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "User"
    //   },
    //   blogId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "Blog"
    //   },
    //   like: {
    //     type: Boolean,
    //     required: true,
    //     default: true
    //   }
    // });
  


