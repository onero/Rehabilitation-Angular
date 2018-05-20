import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {ClientEntity} from '../entities/client.entity';
import {FirestoreModel} from './firestore.model';
import {RehabilitationPlan} from '../entities/rehabilitation-plan.entity';

@Injectable()
export class ClientService {

  clients: ClientEntity[];

  constructor(private afs: AngularFirestore) {
  }

  /**
   * Get list of category.
   * @returns {Observable<any[]>}
   */
  getClients() {
    return this.afs.collection<ClientEntity>(FirestoreModel.CLIENTS_COLLECTION,
      ref => ref.orderBy('fullName')).valueChanges();
  }

  /**
   * Get list of category.
   * @returns {Observable<any[]>}
   */
  getClientsPaginated(limit: number, lastClient?: ClientEntity) {
    return this.afs.collection<ClientEntity>(FirestoreModel.CLIENTS_COLLECTION,
      ref => ref.orderBy('fullName').startAt(lastClient.fullName).limit(limit)).valueChanges();
  }

  /**
   * Create new client in the CLIENTS_COLLECTION
   * @returns {Promise<DocumentReference>}
   * @param newClient
   */
  createClient(newClient: ClientEntity) {
    return this.afs.collection(FirestoreModel.CLIENTS_COLLECTION).doc(newClient.uid).set(newClient);
  }

  // TODO ALH: Implement with Cloud Functions!
  /**
   * Delete provided client
   * @param {ClientEntity} clientToDelete
   * @returns {AngularFirestoreCollection<any>}
   */
  deleteClient(clientToDelete: ClientEntity) {
    return this.afs.collection(FirestoreModel.CLIENTS_COLLECTION).doc(clientToDelete.uid).delete();
  }

  /**
   * Update client doc on FireStore
   * @param {ClientEntity} clientToUpdate
   * @returns {Promise<void>}
   */
  updateClient(clientToUpdate: ClientEntity) {
    return this.afs.collection(FirestoreModel.CLIENTS_COLLECTION).doc(clientToUpdate.uid).set(clientToUpdate, {merge: true});
  }

  /**
   * Send updated plan to firestore
   * @param {string} clientId
   * @param {RehabilitationPlan} rehabilitationPlan
   * @returns {Promise<void>}
   */
  updateRehabilitationPlanByClientUid(clientId: string, rehabilitationPlan: RehabilitationPlan) {
    this.afs.collection(FirestoreModel.ASSIGNED_EXERCISES_COLLECTION);
    return this.afs.collection(FirestoreModel.CLIENTS_COLLECTION)
      .doc(clientId)
      .set(
        {rehabilitationPlan: rehabilitationPlan}
        , {merge: true});
  }

  /**
   * Assign provided exercise id to client
   * @param {string} clientUid
   * @param {string} exerciseUid
   */
  assignExerciseToClient(clientUid: string, exerciseUid: string) {
    return this.afs.collection(FirestoreModel.ASSIGNED_EXERCISES_COLLECTION)
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
    this.afs.collection(FirestoreModel.ASSIGNED_EXERCISES_COLLECTION,
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

  /**
   * Get currentClient by id
   */
  getCurrentClientById(uid: string) {
    return this.afs.collection<ClientEntity>(FirestoreModel.CLIENTS_COLLECTION)
      .doc(uid)
      .valueChanges();
  }
}
