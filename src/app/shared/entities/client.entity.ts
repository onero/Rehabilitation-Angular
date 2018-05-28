import {UserEntity} from './user.entity';
import {RehabilitationPlan} from './rehabilitation-plan.entity';

export class ClientEntity extends UserEntity {
  email: string;
  rehabilitationPlan?: RehabilitationPlan;
}
