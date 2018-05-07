import {MilestoneEntity} from '../../shared/entities/milestone.entity';

export class RehabilitationPlan {
  diagnosis?: string;
  exerciseIds: string[] = [];
  goal?: string;
  milestones?: MilestoneEntity[];
}
