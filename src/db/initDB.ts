import { dbConnect, sequelize } from './database';
import { Competition } from './models/Competition';
import { Other } from './models/Other';
import { Camp } from './models/Camp';

export async function initDB() {
    await dbConnect();
    // await sequelize.drop();
    await Competition.sync();
    await Other.sync();
    await Camp.sync();
}