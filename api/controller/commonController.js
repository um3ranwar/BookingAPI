import dbPromise from "../models/index.js";
const db = await dbPromise;

const { User, Agent } = db;
export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const newUser = await User.create({
      name,
      email,
    });

    res.status(201).json({
      status: "success",
      data: newUser,
    });
  } catch (error) {
    console.error("Error creating user: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getUsers = async (req, res) => {
  try {
    const agentId = req.agentId;
    const users = await User.findAll({
      where: { agentId: agentId },
    });
    res.json(users);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};
export const createAgent = async (req, res) => {
  try {
    const { name, email } = req.body;

    const newAgent = await Agent.create({
      name,
      email,
    });

    res.status(201).json({
      status: "success",
      data: newAgent,
    });
  } catch (error) {
    console.error("Error creating Agent: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getAgents = async (req, res) => {
  try {
    const agents = await Agent.findAll();
    res.json(agents);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};
