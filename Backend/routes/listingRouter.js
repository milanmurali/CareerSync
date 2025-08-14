import express from "express";
import { createJob, getAllJobs, getJobById, updateJob, deleteJob, applyForJob, updateApplicationStatus, getStudentApplications } from "../controllers/listingController.js";

const listingRouter = express.Router();

// Job CRUD operations
listingRouter.post("/create", createJob);
listingRouter.get("/all", getAllJobs);
listingRouter.get("/job/:id", getJobById);
listingRouter.put("/update/:id", updateJob);
listingRouter.delete("/delete/:id", deleteJob);

// Application operations
listingRouter.post("/apply", applyForJob);
listingRouter.put("/application-status", updateApplicationStatus);

// Get all jobs a student has applied to
listingRouter.get("/student-applications/:studentId", getStudentApplications);

export default listingRouter;
