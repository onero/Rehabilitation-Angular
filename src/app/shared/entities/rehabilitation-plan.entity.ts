import {MilestoneEntity} from './milestone.entity';
import {ExerciseEntity} from './exercise.entity';

export class RehabilitationPlan {
  diagnosis?: string;
  exercises?: ExerciseEntity[] = [];
  goal?: string;
  milestones?: MilestoneEntity[];
}
