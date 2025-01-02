import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  constructor(data?: Partial<User>) {
    Object.assign(this, data)
  }

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  user_token: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date
}
