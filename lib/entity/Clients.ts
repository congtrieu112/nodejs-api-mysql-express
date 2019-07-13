import {Unique,Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn} from "typeorm";
@Entity()
export class Clients {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullname: string;

    @Column({ unique: true})
    username: string;

    @Column({ unique: true})
    email: string;

    @Column({select: false})
    password: string;

    @Column({ unique: true})
    phone: string;

    @Column({default: "2000-01-01",type:"date"})
    birthday: Date;

    @Column()
    description: string;

    @Column()
    status: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
  
}