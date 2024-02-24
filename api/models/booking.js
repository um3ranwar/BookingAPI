import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.User, { foreignKey: "userId", as: "user" });

      // Booking to Agent association
      Booking.belongsTo(models.Agent, { foreignKey: "agentId", as: "agent" });
    }
  }
  Booking.init(
    {
      startAt: DataTypes.DATE,
      finishAt: DataTypes.DATE,
      userId: DataTypes.INTEGER,
      agentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
