import { Column, OneToMany, ManyToOne, Entity, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn, UpdateDateColumn, JoinTable } from "typeorm";
import { User } from "./User";
import { Project } from "./Project";
import { Vote } from "./Vote";

@Entity()
export class Section {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[]

  @ManyToOne(() => Project)
  project: Project

  @OneToMany(() => Vote, (vote) => vote.section_id)
  votes: Vote[]

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date
}