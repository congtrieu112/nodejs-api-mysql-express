import {Unique,Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn} from "typeorm";
@Entity()
export class Services {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true})
    name: string;

    @Column()
    description: string;

    @Column()
    status: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
  
}
