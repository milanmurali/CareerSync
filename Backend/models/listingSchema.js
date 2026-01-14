import mongoose from 'mongoose';



const jobSchema = new mongoose.Schema({
    companyName: String,
    title: String,
    description: String,
    requiredSkills: [String],
    minCGPA: Number,
    interviews: [
        {
            studentId: String,
            date: String,
            time: String,
            mode: String,
            status: { type: String, enum: ["Scheduled", "Completed", "Cancelled"], default: "Scheduled" }
        }
    ],
    location: String,
    type: String,
    applied: [String],
    selected: [String],
    rejected: [String]
});

const JobListing = mongoose.model('JobListing', jobSchema);
export default JobListing