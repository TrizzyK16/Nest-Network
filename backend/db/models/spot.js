"use strict";
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define(
    "Spot",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "id"
        }
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lat: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      lng: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      }
    },
    {}
  );

  Spot.associate = function (models) {
    // Define associations here

    Spot.belongsTo(models.User, { foreignKey: "ownerId", as: "Owner" });
    Spot.hasMany(models.Review, {
      foreignKey: "spotId",
      onDelete: "CASCADE",
      hooks: true,
    });
    Spot.hasMany(models.Booking, {
      foreignKey: "spotId",
      onDelete: "CASCADE",
      hooks: true,
    });
    Spot.hasMany(models.SpotImage, {
      foreignKey: "spotId",
      onDelete: "CASCADE",
      hooks: true,
    });
  };

  return Spot;
};
