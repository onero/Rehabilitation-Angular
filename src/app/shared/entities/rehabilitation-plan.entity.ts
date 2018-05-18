import {MilestoneEntity} from './milestone.entity';
import {ExerciseEntity} from './exercise.entity';

export class RehabilitationPlan {
  diagnosis?: string;
  exerciseIds?: string[] = [];
  exercises?: ExerciseEntity[] = [];
  goal?: string;
  milestones?: MilestoneEntity[];
}
