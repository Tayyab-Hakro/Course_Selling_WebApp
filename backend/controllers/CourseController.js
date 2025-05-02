import CourseModel from "../models/CourseModel.js";

export const CreateCourse = async (req, res) => {
  try {
    const { title, description, price, Videotitle, url } = req.body;

    // Check for required fields
    if (!title || !description || !price || !Videotitle || !url) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    // Create new course with a single video inside videos array
    const Course = new CourseModel({
      title,
      description,
      price,
      videos: [
        {
          videoTitle: Videotitle,
          url,
        },
      ],
    });

    await Course.save();

    return res.status(200).json({ message: "Course successfully created" });
  } catch (error) {
    console.error("Error creating course:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
