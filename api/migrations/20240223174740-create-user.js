import { DataTypes } from "sequelize";
// Assuming sequelize-cli supports ES module syntax or you're using a wrapper or tool that enables such support.
export const up = async (queryInterface) => {
  await queryInterface.createTable("Users", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
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
  await queryInterface.dropTable("Users");
};
