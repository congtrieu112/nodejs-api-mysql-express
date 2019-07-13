import {Unique,Entity, PrimaryGeneratedColumn, Column,CreateDateColumn,UpdateDateColumn} from "typeorm";

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true})
    username: string;

    @Column({select: false})
    password: string;

    @Column({ unique: true})
    email: string;

    @Column({default: "2000-01-01 00:00:00"})
    sex: Date;
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
