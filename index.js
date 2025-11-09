import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import cors from "cors";
import User from "./schema/User.js"
import Workout from "./schema/Workout.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// connect to MongoDB
connectDB();


app.get("/" , (req,res)=>{
  res.send ("this is something")
})


app.post("/user", async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Missing name or email" });
  }

  try {
    const user = new User({ name, email });
    await user.save();
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get("/user" , async (req,res) =>{
  try {
    const user = await User.find()
    if(!user) return res.status(404).json({ message: "User not found" })
    return res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message });
    
  }
})
app.post("/workout", async (req, res) => {
  const { workout_name, sets, reps } = req.body;

  const  total_volume = sets* reps;
  if (!workout_name || !sets || !reps)
    return res.status(400).json({ message: "Workout is not added" });

  try {
    const workout = await Workout.create({ workout_name, sets, reps,total_volume });
    return res.status(201).json({ message: "Workout is created", workout, total_volume});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get("/workouts", async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Wokout server running on http://localhost:${PORT}`);
});
