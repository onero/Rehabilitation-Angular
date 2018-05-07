import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {MilestoneEntity} from '../entities/milestone.entity';
import {FirestoreModel} from './firestore.model';

@Injectable()
export class MilestoneService {

  constructor(private angularFireStore: AngularFirestore) { }

  /**
   * Get milestone by id
   * @param {string} milestoneId
   */
  getMilestoneById(milestoneId: string) {
    return this.angularFireStore.collection<MilestoneEntity>(FirestoreModel.MILESTONE_COLLECTION,
      ref => ref.where('uid', '==', milestoneId))
      .valueChanges();
  }

  /**
   * Get all milestones from user
   * @param {string} clientUid
   */
  getMilestonesByClientUid(clientUid: string) {
    return this.angularFireStore.collection<MilestoneEntity>(FirestoreModel.MILESTONE_COLLECTION,
      ref => ref.where('clientUid', '==', clientUid)).valueChanges();
  }

}
