import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 4000;

//Date
const currentDate = new Date();
const formattedCurrentDate = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
const previousDate = new Date(currentDate);
previousDate.setDate(currentDate.getDate() - 1);
const formattedPreviousDate = previousDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });


app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

//schema
const jobSchema = new mongoose.Schema({
    Job_Role: {
      type: String,
      required: true,
    },
    Company_Name: {
      type: String,
      required: true,
    },
    Job_location: {
      type: String,
      required: true,
    },
    Job_link: {
      type: String,
      required: true,
    },
    Avg_Sal_asper_role: {
      type: Number, 
      default: [],    
    },
    JobDesc: {
      type: String,
      required: true,
    },
    ImageURL: {
      type: String,
      required: true,
    },
    IndustryType: {
      type: String,
      required: true,
    },
    Avg_Sal_asper_role_and_comp: {
      type: Number, 
      default: [],    
    },
    downloaded_img: {
      type: String,
      required: true,
    },
    Company_rating: {
      type: [String], 
      default: [],    
    },
    base64_img: {
      type: String,
      required: true,
    },
    founded_year: {
            type: Number, 
            default: [],    
    },
    ownershipType: {
        type: String, 
        default: [],    
    },
    Employee_count: {
        type: [String], 
        default: [],    
    },
    HQ_location: {
        type: [String], 
        default: [],    
    },
    offices_loc: {
        type: [String], 
        default: [],    
    },
    web_link: {
        type: [String], 
        default: [],    
    },
    Fetch_DT: {
        type: Date,
        required: true,
    }
  });

const LI_Collection = mongoose.model("LI_Collection", jobSchema, "LI_Collection");  

app.get("/", (req, res) => {
    //connecting mongoDB
    mongoose.connect("mongodb+srv://singhbhallaa:cwPAieXnnzKDvLyw@cluster0.g0eb8jw.mongodb.net/LI_DB?retryWrites=true&w=majority")
    .then(()=> {
        console.log("connected");
    }).catch((err)=> {
        console.log("Error", err);
    });

    LI_Collection.find().sort({ _id: -1 })
    .then((sData)=> {
      const arr = [];
      for (let i = 0; i < sData.length; i++) {
        // Assuming Fetch_DT is stored as a string in the format 'YYYY-MM-DD'
        const fetchDate = new Date(sData[i].Fetch_DT);

        // Check if the date matches the current or previous formatted date
        if (fetchDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) === formattedCurrentDate ||
            fetchDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) === formattedPreviousDate) {
            arr[i] = sData[i];
        }
    }

      
        res.render("index.ejs", {
            findP: arr
        });
    })
    .catch((err)=> {
        console.log(err);
    });
});


// For Searching
app.post("/search", (req, res) => {
  const searchBox1 = req.body.searchBox1;
  const searchBox2 = req.body.searchBox2;
  const searchBox3 = req.body.searchBox3;

  // Create an array to store the conditions for the $or operator
  const conditions = [];

  // Check if searchBox1 has a value and add it to the conditions
  if (searchBox1) {
      conditions.push({ Job_Role: { $regex: new RegExp(searchBox1, 'i') } });
  }

  // Check if searchBox2 has a value and add it to the conditions
  if (searchBox2) {
      conditions.push({ Company_Name: { $regex: new RegExp(searchBox2, 'i') } });
  }

  // Check if searchBox3 has a value and add it to the conditions
  if (searchBox3) {
      conditions.push({ Job_location: { $regex: new RegExp(searchBox3, 'i') } });
  }

  // Check if there are any conditions before executing the query
  const query = conditions.length > 0 ? { $or: conditions } : {};

  LI_Collection.find(query).sort({ _id: -1 })
      .then((result) => {
        const arr = [];
        for (let i = 0; i < result.length; i++) {
          // Assuming Fetch_DT is stored as a string in the format 'YYYY-MM-DD'
          const fetchDate = new Date(result[i].Fetch_DT);
  
          // Check if the date matches the current or previous formatted date
          if (fetchDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) === formattedCurrentDate ||
              fetchDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) === formattedPreviousDate) {
              arr[i] = result[i];
          }
      }
          res.render("index.ejs", {
              findP: arr
          });
      })
      .catch((error) => {
          console.error(error);
      });
});


app.post("/clear", (req, res) => {
  res.redirect("/");
});

app.listen(port, ()=> {
    console.log(`running on port ${port}`);
});
