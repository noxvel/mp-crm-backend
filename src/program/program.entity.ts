import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'program' })
export class ProgramEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 15 })
  serialNumber: string;

  @Column({type: 'float', default: 0.00})
  cost: number

  @Column({ type: 'varchar', length: 300 })
  description: string;
}