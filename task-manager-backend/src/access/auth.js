import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import payload from "payload";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"; // Fake JWT

export const register = async (req, res) => {
  const { username, password, email } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const user = await payload.create({
      collection: "users",
      data: {
        username,
        email,
        password: passwordHash,
      },
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error registering user", error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await payload.find({
      collection: "users",
      where: { email: { equals: email } },
    });

    if (!user || user.docs.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const userData = user.docs[0];

    const isPasswordValid = await bcrypt.compare(password, userData.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: userData.id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: "Error logging in", error });
  }
};
