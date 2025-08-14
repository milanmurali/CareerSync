import mongoose from "mongoose";    
import JobListing from "../models/listingSchema.js";


export async function createJob(req, res) {
    try {
        const { companyName, title, description, requiredSkills, minCGPA, location, type } = req.body;
        if (!companyName || !title) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const newJob = await JobListing.create({
            companyName,
            title,
            description,
            requiredSkills,
            minCGPA,
            location,
            type
        });
        res.status(201).json({ message: "Job created successfully", job: newJob });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export async function getAllJobs(req, res) {
    try {
        const jobs = await JobListing.find();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}



export async function getJobById(req, res) {
    try {
        const { id } = req.params;
        const job = await JobListing.findById(id);
        if (!job) return res.status(404).json({ message: "Job not found" });
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export async function updateJob(req, res) {
    try {
        const { id } = req.params;
        const updated = await JobListing.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Job not found" });
        res.status(200).json({ message: "Job updated successfully", job: updated });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export async function deleteJob(req, res) {
    try {
        const { id } = req.params;
        const deleted = await JobListing.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: "Job not found" });
        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export async function applyForJob(req, res) {
    try {
        const { jobId, studentId } = req.body;
        const job = await JobListing.findById(jobId);
        if (!job) return res.status(404).json({ message: "Job not found" });

        if (job.applied.includes(studentId)) {
            return res.status(400).json({ message: "Already applied" });
        }
        job.applied.push(studentId);
        await job.save();
        res.status(200).json({ message: "Applied successfully", job });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export async function updateApplicationStatus(req, res) {
    try {
        const { jobId, studentId, status } = req.body; // status = "selected" or "rejected"
        const job = await JobListing.findById(jobId);
        if (!job) return res.status(404).json({ message: "Job not found" });

        // Remove from applied list if present
        job.applied = job.applied.filter(id => id.toString() !== studentId);

        if (status === "selected" && !job.selected.includes(studentId)) {
            job.selected.push(studentId);
        } else if (status === "rejected" && !job.rejected.includes(studentId)) {
            job.rejected.push(studentId);
        } else {
            return res.status(400).json({ message: "Invalid or duplicate status" });
        }

        await job.save();
        res.status(200).json({ message: `Candidate ${status} successfully`, job });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getStudentApplications(req, res) {
    try {
        const { studentId } = req.params;
        
        if (!studentId) {
            return res.status(400).json({ message: "Student ID is required" });
        }

        // Find all jobs where the student has applied, been selected, or rejected
        const appliedJobs = await JobListing.find({
            applied: studentId
        });

        const selectedJobs = await JobListing.find({
            selected: studentId
        });

        const rejectedJobs = await JobListing.find({
            rejected: studentId
        });

        // Combine and format the response
        const applications = {
            applied: appliedJobs.map(job => ({
                ...job.toObject(),
                applicationStatus: 'applied'
            })),
            selected: selectedJobs.map(job => ({
                ...job.toObject(),
                applicationStatus: 'selected'
            })),
            rejected: rejectedJobs.map(job => ({
                ...job.toObject(),
                applicationStatus: 'rejected'
            }))
        };

        const totalApplications = appliedJobs.length + selectedJobs.length + rejectedJobs.length;

        res.status(200).json({
            message: "Student applications retrieved successfully",
            studentId,
            totalApplications,
            applications
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
