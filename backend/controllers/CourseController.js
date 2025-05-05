import { compareSync } from "bcryptjs";
import CourseModel from "../models/CourseModel.js";

export const CreateCourse = async (req, res) => {
  try {
    const { title, description, price, videos } = req.body;

    // Validate input
    if (!title || !description || !price || !Array.isArray(videos) || videos.length === 0) {
      return res.status(400).json({ message: "Please provide all required fields and at least one video." });
    }

    for (const video of videos) {
      if (!video.title || !video.url) {
        return res.status(400).json({ message: "Each video must include a title and URL." });
      }
    }

    // Create and save course
    const newCourse = new CourseModel({
      title,
      description,
      price,
      videos,
    });

    await newCourse.save();

    return res.status(200).json({ message: "Course successfully created" });
  } catch (error) {
    console.error("Error creating course:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const getCreatedCourses = async(req , res)=>{
  try{
    const getcourse = await  CourseModel.find()
    return res.status(200).json({ message: "get data successfully created" ,data:getcourse});

  }catch(error){
    console.log(error)
  }
}

export const UpdateCourses = async (req, res) => {
  try {
    const updatedCourse = await CourseModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated document
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    console.log(updatedCourse);
    res.status(200).json(updatedCourse);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
