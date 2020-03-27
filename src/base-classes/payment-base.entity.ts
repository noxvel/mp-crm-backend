import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

export abstract class PaymentBaseEntity {
    // @PrimaryGeneratedColumn('uuid')
    // id: string;
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 20, default: 'cash' })
    type: string

    @Column({type: 'float', default: 0.00})
    sum: number

    @Column({ type: 'varchar', length: 100, default: '' })
    createdBy: string;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    payDateTime: Date;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createDateTime: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    lastChangedDateTime: Date;

    @Column({ type: 'varchar', length: 100, default: '' })
    lastChangedBy: string;

    @Column({ type: 'varchar', length: 300, nullable: true })
    comment: string | null

}