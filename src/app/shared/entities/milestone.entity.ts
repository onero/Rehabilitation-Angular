import {VisitEntity} from './visit.entity';

export class MilestoneEntity {
  uid: string;
  title: string;
  purpose: string;
  visits?: VisitEntity[] = [];
}
