import jwt from "jsonwebtoken";
import user from "../models/userSchema.js";

export const requireAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Authorization header required' });
    }

    const authHeader = req.headers.authorization || '';
    // console.log(authHeader);

    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({ message: 'Access token required' });
    }

    const decoded = jwt.verify(token, process.env.JWTKEY);
    // console.log(decoded);

    if (!decoded?.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const dbUser = await user.findById(decoded.userId);
    if (!dbUser) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = { id: decoded.userId };
    // console.log(req.user);;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export const requireRole = async (req, res, next) => {

  try {
    const userId = req.user.id

    if (!userId) {
      return res.status(403).json({ message: 'No User ID found' });
    }

    let userexists = await user.findOne({ _id: userId });
    if (!userexists) {
      return res.status(404).json({ message: "User Not Found" });
    }
    // console.log(userexists);
    if (userexists.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    next();

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
