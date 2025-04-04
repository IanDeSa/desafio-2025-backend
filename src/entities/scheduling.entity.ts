import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { User } from './user.entity';
import { SchedulingStatus } from 'src/enums/scheduling-status.enum';

@Entity()
export class Scheduling {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'student_id', referencedColumnName: 'id' })
  studentId: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'teacher_id', referencedColumnName: 'id' })
  teacherId: User;

  @Column()
  datetime: Date;

  @Column({ default: SchedulingStatus.PENDING })
  status: string;

  @Column({ default: 60, name: 'duration_in_minutes' })
  durationInMinutes: number;
}
