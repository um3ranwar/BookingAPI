// Import the necessary dependencies from "sequelize"
import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Agent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here, for example:
      Agent.hasMany(models.Booking, { foreignKey: "agentId" });
    }
  }
  Agent.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Agent",
    }
  );
  return Agent;
};
