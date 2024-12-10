import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import {fileURLToPath} from "url";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import fs from "fs";
import {GoogleGenerativeAI} from "@google/generative-ai";

const app = express();
// const port = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Date
const currentDate = new Date();
const formattedCurrentDate = currentDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
});
const previousDate = new Date(currentDate);
previousDate.setDate(currentDate.getDate() - 1);
const formattedPreviousDate = previousDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
});

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

//schema
const jobSchema = new mongoose.Schema({
    Job_Role: {
        type: String,
        required: true
    },
    Company_Name: {
        type: String,
        required: true
    },
    Job_location: {
        type: String,
        required: true
    },
    Job_link: {
        type: String,
        required: true
    },
    Avg_Sal_asper_role: {
        type: Number,
        default: []
    },
    JobDesc: {
        type: String,
        required: true
    },
    ImageURL: {
        type: String,
        required: true
    },
    IndustryType: {
        type: String,
        required: true
    },
    Avg_Sal_asper_role_and_comp: {
        type: Number,
        default: []
    },
    downloaded_img: {
        type: String,
        required: true
    },
    Company_rating: {
        type: [String],
        default: []
    },
    base64_img: {
        type: String,
        required: true
    },
    Founded_Year: {
        type: String,
        required: true
    },
    Ownership_Type: {
        type: String,
        required: true
    },
    Employee_Count: {
        type: String,
        required: true
    },
    HQ_Location: {
        type: String,
        required: true
    },
    Offices_Location: {
        type: [String],
        default: []
    },
    Website_Link: {
        type: [String],
        default: []
    },
    Fetch_DT: {
        type: Date,
        required: true
    }
});

const LI_Collection = mongoose.model(
    "LI_Collection",
    jobSchema,
    "LI_Collection"
);

app.get("/", (req, res) => {
    res.redirect("/JobWatch")
})

app.get("/JobWatch", (req, res) => {
    //connecting mongoDB
    mongoose
        .connect(
            "mongodb+srv://singhbhallaa:cwPAieXnnzKDvLyw@cluster0.g0eb8jw.mongodb.net/LI_DB" +
            "?retryWrites=true&w=majority"
        )
        .then(() => {
            console.log("connected");
        })
        .catch((err) => {
            console.log("Error", err);
        });

    LI_Collection
        .find()
        .sort({_id: -1})
        .limit(300)
        .then((sData) => {
            console.log(sData.length);
            const arr = [];
            const latestDate = sData[0].Fetch_DT;
            const formattedlatestDate = latestDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            });
            const previouslatestDate = new Date(latestDate);
            previouslatestDate.setDate(latestDate.getDate() - 1);
            const formattedpreviouslatestDate = previouslatestDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            });
            console.log(formattedlatestDate);
            console.log(formattedpreviouslatestDate);

            for (let i = 0; i < sData.length; i++) {
                // Assuming Fetch_DT is stored as a string in the format 'YYYY-MM-DD'
                const fetchDate = new Date(sData[i].Fetch_DT);

                // Check if the date matches the current or previous formatted date
                if (fetchDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                }) === formattedlatestDate || fetchDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                }) === formattedpreviouslatestDate) {
                    arr[i] = sData[i];
                }
            }
            console.log(arr.length);
            const searchLength = arr.length;

            res.render("index.ejs", {
                findP: arr,
                searchLength: searchLength
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

// For Searching
app.post("/search", (req, res) => {
    const searchBox1 = req.body.searchBox1;
    const searchBox2 = req.body.searchBox2;
    const searchBox3 = req.body.searchBox3;

    const searchArr = [searchBox1, searchBox2, searchBox3];

    // Create an array to store the conditions for the $or operator
    const conditions = [];

    // Check if searchBox1 has a value and add it to the conditions
    if (searchBox1) {
        conditions.push({
            Job_Role: {
                $regex: new RegExp(searchBox1, 'i')
            }
        });
    }

    // Check if searchBox2 has a value and add it to the conditions
    if (searchBox2) {
        conditions.push({
            Company_Name: {
                $regex: new RegExp(searchBox2, 'i')
            }
        });
    }

    // Check if searchBox3 has a value and add it to the conditions
    if (searchBox3) {
        conditions.push({
            Job_location: {
                $regex: new RegExp(searchBox3, 'i')
            }
        });
    }

    // Check if there are any conditions before executing the query
    const query = conditions.length > 0
        ? {
            $or: conditions
        }
        : {};

    LI_Collection
        .find(query)
        .sort({_id: -1})
        .limit(300)
        .then((result) => {
            const arr = [];
            if (result.length > 0) {
                const latestDate = result[0].Fetch_DT;
                const formattedlatestDate = latestDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                });
                const previouslatestDate = new Date(latestDate);
                previouslatestDate.setDate(latestDate.getDate() - 1);
                const formattedpreviouslatestDate = previouslatestDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                });
                for (let i = 0; i < result.length; i++) {
                    // Assuming Fetch_DT is stored as a string in the format 'YYYY-MM-DD'
                    const fetchDate = new Date(result[i].Fetch_DT);
    
                    // Check if the date matches the current or previous formatted date
                    if (fetchDate.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                    }) === formattedlatestDate || fetchDate.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                    }) === formattedpreviouslatestDate) {
                        arr[i] = result[i];
                    }
                }
            }

            const searchLength = arr.length;

            res.render("index.ejs", {
                findP: arr,
                filter: searchArr,
                searchLength: searchLength
            });
        })
        .catch((error) => {
            console.error(error);
        });
});

const upload = multer({dest: "public/img/"});

var resume_name;

app.post("/upload", upload.single("resume"), async (req, res) => {
    try {
        const resumeFile = req.file;
        const targetPath = path.join(__dirname, "public/img/", resumeFile.originalname);

        fs.renameSync(resumeFile.path, targetPath);
        resume_name = resumeFile.originalname;
        console.log(resume_name);

        const genAI = new GoogleGenerativeAI("AIzaSyCbw_OzznoWp5yjiS2TLvxUpFRm6Do1-NM");

        // Converts local file information to a GoogleGenerativeAI.Part object.
        function fileToGenerativePart(path, mimeType) {
            return {
                inlineData: {
                    data: Buffer
                        .from(fs.readFileSync(path))
                        .toString("base64"),
                    mimeType
                }
            };
        }

        async function run() {
            // For text-and-image input (multimodal), use the gemini-pro-vision model
            const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

            const prompt = "Based on my resume, first tell me my name and then please recommend job profiles that align with my skills an" +
                    "d experience. Highlight roles that best match my qualifications and interests," +
                    " focusing on [mention key skills or technologies]. Identify specific job title" +
                    "s and industries where I would be a strong fit, considering my career goals an" +
                    "d expertise. Please present the results with valid and appropriate HTML format" +
                    "ting to ensure readability.";

            const imageParts = [fileToGenerativePart("public/img/" + resume_name, "image/png")];

            const result = await model.generateContent([
                prompt, ...imageParts
            ]);
            const response = await result.response;

            const text = response.text();
            console.log(text);

            res.render("resume.ejs", {
                resume_data: text,
                img_name: resume_name
            });
        }

        run();
    } catch (error) {
        console.error("Error in upload:", error);
        res
            .status(500)
            .send("Internal Server Error");
    }
});

app.post("/clear", (req, res) => {
    res.redirect("/");
});

app.get("/JobWatchAbout", (req, res) => {
    res.render("about.ejs");
});

app.get("/JobWatchAI", (req, res) => {
    res.render("askAI.ejs");
});

app.get("/AIx", (req, res) => {
    res.render("AI_two.ejs");
});

// app.listen(port, () => {
//     console.log(`running on port ${port}`);
// });
