import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import Car from './Car';

@Entity('specifications')
class Specifications {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  car_id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  icon: string;

  @ManyToOne(() => Car)
  @JoinColumn({ name: 'car_id' })
  car: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Specifications;
