import express from "express";
import { checkJobCompatibility, suggestBestJobs } from "../utils/aiStuff.js";

const aiRouter = express.Router();

// Route to check job compatibility
aiRouter.post("/check-compatibility", async (req, res) => {
  try {
    const { studentProfile, jobListing } = req.body;

    if (!studentProfile || !jobListing) {
      return res.status(400).json({ error: "Missing studentProfile or jobListing in request body" });
    }

    const compatibilityResult = await checkJobCompatibility(studentProfile, jobListing);
    res.status(200).json({ success: true, data: compatibilityResult });
  } catch (error) {
    console.error("Error in /check-compatibility route:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Route to suggest best jobs
aiRouter.post("/suggest-jobs", async (req, res) => {
  try {
    const { studentProfile, jobListings } = req.body;

    if (!studentProfile || !jobListings) {
      return res.status(400).json({ error: "Missing studentProfile or jobListings in request body" });
    }

    const suggestions = await suggestBestJobs(studentProfile, jobListings);
    res.status(200).json({ success: true, data: suggestions });
  } catch (error) {
    console.error("Error in /suggest-jobs route:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

export default aiRouter;