import { Column, Entity, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne } from "typeorm";
import { Project } from "./Project";
import { Section } from "./Section";
import { User } from "./User";

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: string

  @OneToOne(() => User)
  @JoinColumn()
  user_id: string

  @Column()
  card_value: number

  @OneToOne(() => Project)
  @JoinColumn()
  project_id: string

  // TODO: Refletir sobre relacionamento aqui
  @ManyToOne(() => Section)
  section_id: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

}