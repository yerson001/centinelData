import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'categories' })
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    created_at: Date;

}