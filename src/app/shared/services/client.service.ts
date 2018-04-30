import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ClientModel } from '../entities/client.model';
import {FirestoreModel} from './firestore.model';

@Injectable()
export class ClientService {

  constructor(private afs: AngularFirestore) {
  }

  /**
   * Get list of category.
   * @returns {Observable<any[]>}
   */
  getClients() {
    return this.afs.collection<ClientModel>(FirestoreModel.CLIENTS_COLLECTION).valueChanges();
  }

  /**
   * Create new client in the CLIENTS_COLLECTION
   * @returns {Promise<DocumentReference>}
   * @param newClient
   */
  createClient(newClient: ClientModel) {
    return this.afs.collection(FirestoreModel.CLIENTS_COLLECTION).doc(newClient.uid).set(newClient);
  }

  /**
   * Delete provided client
   * @param {ClientModel} clientToDelete
   * @returns {AngularFirestoreCollection<any>}
   */
  deleteClient(clientToDelete: ClientModel) {
    return this.afs.collection(FirestoreModel.CLIENTS_COLLECTION).doc(clientToDelete.uid).delete();
  }

  /**
   * Update client doc on FireStore
   * @param {ClientModel} clientToUpdate
   * @returns {Promise<void>}
   */
  updateClient(clientToUpdate: ClientModel) {
    return this.afs.collection(FirestoreModel.CLIENTS_COLLECTION).doc(clientToUpdate.uid).set(clientToUpdate, {merge: true});
  }
}
