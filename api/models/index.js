// ES Module imports
import fs from "fs/promises";
import path from "path";
import Sequelize from "sequelize";
import process from "process";
import { fileURLToPath } from "url";

// Convert file URL to path for __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration for different environments
async function loadConfig() {
  const env = process.env.NODE_ENV || "development";
  const configPath = path.join(__dirname, "../config/config.json");
  const configFile = await fs.readFile(configPath, "utf-8");
  const configs = JSON.parse(configFile);
  return configs[env];
}

// Asynchronously load and initialize models
async function loadModels(sequelize) {
  const models = {};
  const files = await fs.readdir(__dirname);
  const modelFiles = files.filter(
    (file) => file.endsWith(".js") && file !== path.basename(__filename)
  );

  for (const file of modelFiles) {
    const { default: defineModel } = await import(
      `file://${path.join(__dirname, file)}`
    );
    const model = defineModel(sequelize, Sequelize.DataTypes);
    models[model.name] = model;
  }

  // Associate models if applicable
  Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });

  return models;
}

// Main db object initialization
async function initialize() {
  const config = await loadConfig();
  const sequelize = config.use_env_variable
    ? new Sequelize(process.env[config.use_env_variable], config)
    : new Sequelize(config.database, config.username, config.password, config);

  const db = {
    sequelize,
    Sequelize,
    ...(await loadModels(sequelize)),
  };

  return db;
}
const dbPromise = initialize();

export default dbPromise;
// Exporting a promise that resolves to the db object
//export const dbPromise = initialize();
