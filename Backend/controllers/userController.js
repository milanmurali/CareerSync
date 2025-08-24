import bcrypt from "bcryptjs";
import "dotenv/config";
import jwt from "jsonwebtoken";
import user from "../models/userSchema.js";
import mongoose from "mongoose";



// Login Function
export async function login(req, res) { 
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Data not Valid" });
        }
        let userexists = await user.findOne({ email });
        if (!userexists) {
            return res.status(404).json({ message: "User Not Found" });
        }
        const validpassword = await bcrypt.compare(password, userexists.password);
        if (!validpassword) {
            return res.status(401).json({ message: "Invalid Password" });
        }
        const token = jwt.sign(
            { userId: userexists._id, email: userexists.email },
            process.env.JWTKEY, { expiresIn: "24h" }
        );

        return res.status(200).json(
            {
                message: "Login Successful",
                token,
                id: userexists._id,
                role: userexists.role
            }
        );
    }
    catch (error) {
        console.error("Internal Server Error", error);
        return res.status(500).json({ message: "Internal Server Error", error });
    }
}
// Register Function
export async function register(req, res) { 
    try {
        let { name, email, password, mobile, dob, address } = req.body;

        if (!name || !email || !password || !mobile || !dob) {
            return res.status(400).json({ message: "Data not valid" });
        }

        let emailalreadyexists = await user.findOne({ email });
        if (emailalreadyexists) {
            return res.status(409).json({ message: "Email Already Exists" });
        }

        const PSALT = parseInt(process.env.PSALT) || 10;
        password = await bcrypt.hash(password, PSALT);
        let response = await user.create({ name, email, password, mobile, dob });
        res.status(201).json({ message: "New User Created" });
        // console.log(response);
    }
    catch (error) {
        console.error("Internal Server Error", error);
        return res.status(500).json({ message: "Internal Server Error" })

    }
}


// Delete Function
export async function deleteuser(req, res) { 
    const id = req.params.id;

    try {
        const response = await user.findByIdAndDelete(id);
        if (!response) {
            return res.status(404).json({ message: "User Not Found" });
        }
        return res.status(200).json({ message: "User AcountDeleted" });
    }
    catch (error) {
        console.error("Internal Server Error", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

}


// Update Function 
export async function updateuser(req, res) { 

    const id = req.user.id;
    if (!id) {
        return res.status(400).json({ message: "User ID not provided. Try logging in again." });
    }

    try {
        // Check if the request body contains a role or verified field
        if (req.body.role || req.body.verified) {
            return res.status(403).json({ message: "You cannot update role or verification status" });
        }
        // Check if the request body contains a password field
        if (req.body.password) {
            const PSALT = parseInt(process.env.PSALT) || 10;
            req.body.password = await bcrypt.hash(req.body.password, PSALT);
        }

        const response = await user.findByIdAndUpdate(id, req.body, { new: true });
        if (!response) {
            return res.status(404).json({ message: "User Not Found" });
        }

        // console.log(response);
        return res.status(200).json({ message: "User Updated" });

    } catch (error) {
        console.error("Internal Server Error", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// Admin Update Function 
export async function adminUpdateUser(req, res) { 

    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: "User ID not provided" });
    }
    try {
        // block everything except role, verified, password
        const allowedFields = ["role", "verified", "password"];
        const invalidField = Object.keys(req.body).find(
            (key) => !allowedFields.includes(key)
        );
        if (invalidField) {
            return res.status(403).json({ message: `Admins cannot update field: ${invalidField}` });
        }
        // Check if the request body contains a password field
        if (req.body.password) {
            const PSALT = parseInt(process.env.PSALT) || 10;
            req.body.password = await bcrypt.hash(req.body.password, PSALT);
        }

        const response = await user.findByIdAndUpdate(id, req.body, { new: true });
        if (!response) {
            return res.status(404).json({ message: "User Not Found" });
        }

        // console.log(response);
        return res.status(200).json({ message: "User Updated" });

    } catch (error) {
        console.error("Internal Server Error", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}



// View by ID Function
export async function viewuser(req, res) {  
    const id = req.params.id;
    try {
        const response = await user.findById(id);
        if (!response) {
            return res.status(404).json({ message: "User Not Found" });
        }
        return res.status(200).json(response);
    }
    catch (error) {
        console.error("Internal Server Error", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

}

// View All Users Function
export async function viewAllUsers(req, res) {  
    try {

        const { id } = req.params; // Extract admin ID from request params

        if (!id) {        // Validate ID presence
            return res.status(400).json({ message: "Admin ID not provided" });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {   // Validate if ID is a valid MongoDB ObjectId
            return res.status(400).json({ message: "Invalid Admin ID format" });
        }

        const adminUser = await user.findById(id);   // Check if the user exists and has admin privileges
        if (!adminUser || adminUser.role !== "admin") {
            return res.status(403).json({ message: "Access Denied. Not an admin." });
        }
        // Fetch all users
        const users = await user.find(); // Returns an array, even if empty
        return res.status(200).json({
            message: users.length > 0 ? "Users retrieved successfully" : "No users found",
            users,
        });
    } catch (error) {
        console.error("Internal Server Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}



