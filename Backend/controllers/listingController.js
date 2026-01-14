import mongoose from "mongoose";
import JobListing from "../models/listingSchema.js";
import user from "../models/userSchema.js";

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


export async function getStudentDashboardData(req, res) {
    try {
        
        const studentId = req.params.id;
        // const { studentId } = req.user.id;

        if (!studentId) {
            return res.status(400).json({ message: "Student ID is required" });
        }

        // 1. Fetch user
        const User = await user.findById(studentId);
        if (!User) return res.status(404).json({ message: "User not found" });

        // 2. Calculate profile score dynamically
        const profileScore = (() => {
            let score = 0;
            if (User.skills?.length) score += 25;
            if (User.education?.length) score += 25;
            if (User.certificates?.length) score += 25;
            if (User.interests?.length) score += 25;
            return score;
        })();

        // 3. Calculate rating dynamically (placeholder: random or based on interviews completed)
        const completedInterviews = await JobListing.find({ "interviews.studentId": studentId, "interviews.status": "Completed" });
        const rating = completedInterviews.length ? 4.5 : 0; // Replace with actual rating logic later

        // 4. Get applications data
        const appliedJobs = await JobListing.find({ applied: studentId });
        const selectedJobs = await JobListing.find({ selected: studentId });
        const rejectedJobs = await JobListing.find({ rejected: studentId });

        // 5. Upcoming interviews
        const upcomingInterviews = await JobListing.find({
            "interviews.studentId": studentId,
            "interviews.status": "Scheduled"
        }).select("title companyName interviews");

        // Filter only this student's interviews
        const userUpcomingInterviews = upcomingInterviews.map(job => {
            const interview = job.interviews.find(i => i.studentId === studentId && i.status === "Scheduled");
            return {
                jobId: job._id,
                title: job.title,
                companyName: job.companyName,
                date: interview.date,
                time: interview.time,
                mode: interview.mode
            };
        });

        // 6. Response
        res.status(200).json({
            message: "Dashboard data retrieved successfully",
            profile: {
                name: User.name,
                profileScore,
                rating
            },
            stats: {
                applied: appliedJobs.length,
                interviews: userUpcomingInterviews.length,
                totalApplications: appliedJobs.length + selectedJobs.length + rejectedJobs.length
            },
            upcomingInterviews: userUpcomingInterviews,
            recentApplications: appliedJobs.slice(-5).reverse()
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}



