import { Request, Response } from 'express';
import { Competition } from '../db/models/Competition';
import { Other } from '../db/models/Other';
import { Camp } from '../db/models/Camp';
import { Op } from 'sequelize';

// Function to validate ISO 8601 date strings
const isValidISODate = (dateString: string): boolean => {
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
    return iso8601Regex.test(dateString);
}

// /api/v1/activities/?type=other&updatedAt=2024-07-30T15:12:12.000Z
// get
const getActivities = async (req: Request, res: Response) => {
    const { type, updatedAt } = req.query

    const Type = (type === "other") ? Other :
                (type === "competition") ? Competition :
                (type === "camp") ? Camp : null

    if (Type === null) {
        // Invalid Type response
        return res.status(400).json({
            code: 400,
            message: `Invalid type ${type}`
        });
    }

    const whereCondition: any = {
        isActive: true // Filter based on isActive
    }
    
    // Invalid format response
    if (updatedAt !== undefined) {
        if (!isValidISODate(String(updatedAt))) {
            return res.status(400).json({
                code: 400,
                message: 'Invalid format for updatedAt'
            });
        }

        whereCondition.updatedAt = {
            [Op.gt]: new Date(String(updatedAt))
        }
    } 

    
    try {
        const data = await Type.findAll({
            where: whereCondition,
            attributes: ['id', 'link', 'topic', 'imageUrl', 'deadline', 'updatedAt'], // Specify the columns to return
            limit: 20, // Limit the results to 20 records
            order: [['updatedAt', 'DESC']] // Order by updatedAt in descending order (most recently updated first)
        });

        // success response
        res.status(200).json({
            message: "success",
            code: 200,
            data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: 'Database Failed'
        });
    }
}

export { getActivities };