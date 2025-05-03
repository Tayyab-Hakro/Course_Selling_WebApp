import mongoose from 'mongoose';

// Define video subdocument schema
const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

// Main course schema
const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    videos: [VideoSchema], // array of video documents
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const CourseModel = mongoose.model('Course', CourseSchema);

export default CourseModel;
