import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateAIResponse(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating AI response:", error);
    throw error;
  }
}

export async function checkJobCompatibility(studentProfile, jobListing) {
  const prompt = `Analyze the compatibility between this student and job listing:

STUDENT PROFILE:
- Name: ${studentProfile.name}
- Skills: ${studentProfile.skills?.join(', ') || 'None specified'}
- Education: ${studentProfile.education?.join(', ') || 'None specified'}
- Interests: ${studentProfile.interests?.join(', ') || 'None specified'}
- CGPA: ${studentProfile.cgpa || 'Not specified'}
- Certificates: ${studentProfile.certificates?.join(', ') || 'None'}

JOB LISTING:
- Company: ${jobListing.companyName}
- Title: ${jobListing.title}
- Description: ${jobListing.description}
- Required Skills: ${jobListing.requiredSkills?.join(', ') || 'None specified'}
- Minimum CGPA: ${jobListing.minCGPA || 'Not specified'}
- Location: ${jobListing.location}
- Type: ${jobListing.type}

Please provide:
1. Compatibility Score (0-100%)
2. Matching Skills
3. Missing Skills
4. CGPA Assessment
5. Overall Recommendation (Highly Recommended/Recommended/Consider/Not Recommended)
6. Specific advice for improvement

Format the response as JSON with these fields: compatibilityScore, matchingSkills, missingSkills, cgpaAssessment, recommendation, advice`;

  return await generateAIResponse(prompt);
}

export async function suggestBestJobs(studentProfile, jobListings) {
  const jobsText = jobListings.map(job => 
    `Job ${job._id}: ${job.companyName} - ${job.title}
    Skills Required: ${job.requiredSkills?.join(', ') || 'None'}
    Min CGPA: ${job.minCGPA || 'Not specified'}
    Location: ${job.location}
    Type: ${job.type}
    Description: ${job.description?.substring(0, 200)}...`
  ).join('\n\n');

  const prompt = `Based on this student profile, rank and suggest the best job matches from the available listings:

STUDENT PROFILE:
- Name: ${studentProfile.name}
- Skills: ${studentProfile.skills?.join(', ') || 'None specified'}
- Education: ${studentProfile.education?.join(', ') || 'None specified'}
- Interests: ${studentProfile.interests?.join(', ') || 'None specified'}
- CGPA: ${studentProfile.cgpa || 'Not specified'}
- Certificates: ${studentProfile.certificates?.join(', ') || 'None'}

AVAILABLE JOB LISTINGS:
${jobsText}

Please provide:
1. Top 5 recommended jobs (ranked by compatibility)
2. For each job, include:
   - Job ID
   - Company and Title
   - Match Percentage
   - Why it's a good fit
   - What skills to highlight in application

Format as JSON with array of recommendations, each containing: jobId, company, title, matchPercentage, whyGoodFit, skillsToHighlight`;

  return await generateAIResponse(prompt);
}