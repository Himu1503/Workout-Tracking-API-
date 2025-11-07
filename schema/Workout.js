import mongoose from "mongoose";
import { Schema } from "mongoose";

const workoutSchema = new Schema({
    workout_name:{
        type: String,
        trim: true,
        required: [true, "Workout Name is Required"],
        maxlength: 100,
    },
    sets:{
        type: Number, 
        required: [true, "Number of Sets are required"]
    },
    reps:{
        type:Number, 
        required:[true,"Number of Reps are required"]
    },
    total_workout:{
        type:Number
    },
},{  timestamps: true  })


const Workout = mongoose.model("Workout", workoutSchema);
export default Workout;



