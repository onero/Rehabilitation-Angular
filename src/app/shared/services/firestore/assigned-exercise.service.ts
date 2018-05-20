import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {FirestoreModel} from './firestore.model';

@Injectable()
export class AssignedExerciseService {

  private ASSIGNED_EXERCISES_COLLECTION = 'AssignedExercises';

  constructor(private angularFireStore: AngularFirestore) { }

  /**
   * Assign provided exercise id to client
   * @param {string} clientUid
   * @param {string} exerciseUid
   */
  assignExerciseToClient(clientUid: string, exerciseUid: string) {
    return this.angularFireStore.collection(this.ASSIGNED_EXERCISES_COLLECTION)
      .add({
        exerciseUid: exerciseUid,
        clientUid: clientUid
      });
  }

  /**
   * Unassign exercise from client, by provided exerciseId
   * @param exerciseUid
   * @param clientUid
   */
  unassignExerciseFromClient(exerciseUid: string, clientUid: string) {
    // Get all AssignedExercise documents
    this.angularFireStore.collection(this.ASSIGNED_EXERCISES_COLLECTION,
      ref =>
        ref.where('exerciseUid', '==', exerciseUid)
          .where('clientUid', '==', clientUid))
      .snapshotChanges()
      .take(1)
      .subscribe(assignedExercises => {
        // Delete AssignedExercise document (can only exist once)
        assignedExercises[0].payload.doc.ref.delete();
      });
  }

}
