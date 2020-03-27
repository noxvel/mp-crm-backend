import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn, Generated } from 'typeorm';
import { ProgramEntity } from '../program/program.entity';

export abstract class TreatyBaseEntity {
    // @PrimaryGeneratedColumn('uuid')
    // id: string;
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 4, default: 'НМП' })
    series: string;

    @Column({type: 'int'})
    @Generated()
    number: number

    @Column({ type: 'date' })
    date: Date;

    @Column({type: 'float', default: 0.00})
    sum: number

    @ManyToOne(type => ProgramEntity,  {eager: true})
    program: ProgramEntity

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @Column({ type: 'boolean', default: false })
    isArchived: boolean;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createDateTime: Date;

    @Column({ type: 'varchar', length: 300, default: '' })
    createdBy: string;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    lastChangedDateTime: Date;

    @Column({ type: 'varchar', length: 300, default: '' })
    lastChangedBy: string;

    @Column({ type: 'varchar', length: 300, nullable: true })
    comment: string | null;
}