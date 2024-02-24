import dbPromise from "../models/index.js";
const db = await dbPromise;
const { User, Agent, Booking } = db;
import Sequelize from "sequelize";
export const createBooking = async (req, res) => {
  try {
    console.log("working");
    const { userId, startAt, finishAt } = req.body;

    const agentId = req.agentId;
    const user = await User.findByPk(userId);
    const agent = await Agent.findByPk(agentId);
    console.log("UserID:", userId, "AgentID:", agentId);
    if (!user || !agent) {
      return res.status(404).json({ message: "User or Agent not found" });
    }

    const newBooking = await Booking.create({
      userId,
      agentId,
      startAt,
      finishAt,
    });

    res.status(201).json(newBooking);
  } catch (error) {
    console.error("Error creating booking: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getScheduler = async (req, res) => {
  try {
    const { weekdate } = req.query;
    if (!weekdate) {
      return res.status(400).json({ message: "Weekdate parameter is missing" });
    }
    const startDate = new Date(weekdate);
    if (isNaN(startDate.getTime())) {
      return res.status(400).json({ message: "Invalid weekdate format" });
    }
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 7);

    const bookings = await Booking.findAll({
      where: {
        startAt: {
          [Sequelize.Op.gte]: startDate,
        },
        finishAt: {
          [Sequelize.Op.lte]: endDate,
        },
      },
      include: [
        {
          model: User,
          as: "user",
        },
      ],
    });

    res.status(200).json({ status: "success", data: bookings });
  } catch (error) {
    console.error("Error fetching scheduler data: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Booking ID:", id);
    console.log("Agent ID:", req.agentId);

    const booking = await Booking.findByPk(id);
    console.log("booking...", booking);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await booking.destroy();
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
