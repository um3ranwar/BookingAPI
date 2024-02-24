import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  await queryInterface.createTable("Bookings", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    startAt: {
      type: DataTypes.DATE,
    },
    finishAt: {
      type: DataTypes.DATE,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users", // Note: It should match the table name exactly as it is in the database.
        key: "id",
      },
    },
    agentId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Agents", // Note: It should match the table name exactly as it is in the database.
        key: "id",
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });
};

export const down = async (queryInterface) => {
  await queryInterface.dropTable("Bookings");
};
