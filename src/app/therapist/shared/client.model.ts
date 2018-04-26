import { UserModel } from './user.model';
import {RehabilitationPlan} from '../../client/shared/rehabilitation-plan.model';

export class ClientModel extends UserModel {
  email: string;
  rehabilitationPlan?: RehabilitationPlan;
}
