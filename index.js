import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import User from "./schema/User.js";
import Workout from "./schema/Workout.js";
import cors from "cors"


dotenv.config();
connectDB();

const app = express();
app.use(cors)

const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

app.get("/" , (req,res)=>{
  res.json("this is something")
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

app.get("/user/:id", async (req,res)=> {
  const { id, name , email} = req.params

  try {
    const user = await User.findById(id)
    if(!user) return res.status(404).json({message: "User not found"})
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  if(!name || !email){
    return res.status(400).json({message: "User not Registered"})
  }

  try {
    const user = await User.findOne({name , email})
    if(!user) return res.status(404).json({message: "User not found"})

      res.status(200).json(user)
    
  } catch (error) {

    res.status(500).json({error: error.message})
    
  }
  
})



app.post("/workout" , async (req,res)=> {
  const {workout_name, sets, reps } = req.body
  if(!workout_name || !sets || !reps) return res.status(500).json({message: "Workout is not added properly"})
  try {
    const workout = await Workout.create({workout_name , sets,reps})
    await workout.save()
    return res.status(201).json({message: "Workout is created" , workout})
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

})

app.get("/workout/:workout_name/:sets/:reps", async (req, res) => {
  const { workout_name, sets, reps } = req.params;
  if (!workout_name || !sets || !reps)
    return res.status(400).json({ message: "Missing parameters" });

  try {
    const workout = await Workout.findOne({ workout_name, sets, reps });
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    res.status(200).json(workout);
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
