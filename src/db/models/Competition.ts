import { Table, Model, Column, PrimaryKey, DataType, AutoIncrement, Index, Default } from "sequelize-typescript";

@Table({
    timestamps: true,
    tableName: "Competitions",
    modelName: "Competition"
})
export class Competition extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    id!: number;

    @Index
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    hashLink!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    link!: string;
    
    @Column(DataType.STRING)
    topic?: string;
    
    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    imageUrl!: string;
    
    @Column(DataType.DATE)
    deadline?: Date;
    
    @Default(true)
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    isActive!: boolean;
    
    @Index
    @Column
    updatedAt!: Date;

    @Column
    createdAt!: Date;
}