import {Injectable} from '@angular/core';
import {RehabilitationPlan} from '../../client/shared/rehabilitation-plan.model';
import {AngularFirestore} from 'angularfire2/firestore';
import {FirestoreModel} from './firestore.model';

@Injectable()
export class RehabilitationPlanService {

  constructor(private angularFirestore: AngularFirestore) { }

  /**
   * Send updated plan to firestore
   * @param {string} clientId
   * @param {RehabilitationPlan} rehabilitationPlan
   * @returns {Promise<void>}
   */
  updatePlan(clientId: string, rehabilitationPlan: RehabilitationPlan) {
    return this.angularFirestore.collection(FirestoreModel.CLIENTS_COLLECTION)
      .doc(clientId)
      .set(
        {rehabilitationPlan: rehabilitationPlan}
        , {merge: true});
  }
}
