import { sequelize } from "../database";
import { DataTypes } from "sequelize";

export const Camp = sequelize.define(
    "Camps",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false
        },
        topic: {
            type: DataTypes.STRING,
        },
        imageUrl: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        deadline: {
            type: DataTypes.DATE,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        timestamps: true,
        updatedAt: false 
    }
)