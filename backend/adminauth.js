import jwt from 'jsonwebtoken';

export const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader)

  // Check if Authorization header exists and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if role is admin (if your token includes it)
    if (decoded.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Forbidden: Not an admin' });
    }

    // Add decoded token data to request object
    req.admin = decoded;

    next(); // Pass to next middleware or route handler
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
  }
};
