import { Request, Response } from 'express';
import { Competition } from '../db/models/Competition';
import { Other } from '../db/models/Other';
import { Camp } from '../db/models/Camp';
import { Op } from 'sequelize';

// /api/v1/activities/?type=other&lastId=0

// get
const getActivities = async (req: Request, res: Response) => {

    const lastId: number = (req.query.lastId === undefined) ? 0: parseInt(req.query.lastId as string)
    // Invalid format response
    if (isNaN(lastId)) {
        return res.status(400).json({
            code: 400,
            message: 'Invalid format for lastId'
        });
    }

    const { type } = req.query
    const Type = (type === "other") ? Other : (type === "competition") ? Competition : (type === "camp") ? Camp : null
    if (Type === null) {
        // Invalid Type response
        return res.status(400).json({
            code: 400,
            message: `Invalid type ${type}`
        });
    }
    
    try {
        const data = await Type.findAll({
            where: {
                id: {
                    [Op.gt]: lastId
                },
                isActive: true // Filter based on isActive
            },
            attributes: ['id', 'link', 'topic', 'imageUrl', 'deadline'], // Specify the columns to return
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