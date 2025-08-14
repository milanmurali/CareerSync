import mongoose from 'mongoose';



const jobSchema = new mongoose.Schema({
    companyName: String,
    title: String,
    description: String,
    requiredSkills: [String],
    minCGPA: Number,
    location: String,
    type: String,
    applied: [String],
    selected: [String],
    rejected: [String]
});

const JobListing = mongoose.model('JobListing', jobSchema);
export default JobListing