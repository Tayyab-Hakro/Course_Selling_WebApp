import jwt from 'jsonwebtoken'
export const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization Header:", authHeader); // 👈 See if token is received

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log("No token or invalid format");
    return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];
  console.log("Token extracted:", token); // 👈 Confirm extracted token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); // 👈 Check token payload

    if (decoded.role !== 'admin') {
      console.log("Role is not admin");
      return res.status(403).json({ success: false, message: 'Forbidden: Not an admin' });
    }

    req.admin = decoded;
    console.log("Admin verified successfully ✅");

    next();
  } catch (error) {
    console.log("Token verification failed:", error.message);
    return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
  }
};
