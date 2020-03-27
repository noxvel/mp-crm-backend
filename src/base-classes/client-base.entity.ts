import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

export abstract class ClientBaseEntity {
    // @PrimaryGeneratedColumn('uuid')
    // id: string;
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 200 })
    name: string

    @Column({ type: 'varchar', length: 100, default: '' })
    createdBy: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createDateTime: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    lastChangedDateTime: Date;

    @Column({ type: 'varchar', length: 100, default: '' })
    lastChangedBy: string;

    @Column({ type: 'varchar', length: 300, nullable: true })
    internalComment: string | null;
}