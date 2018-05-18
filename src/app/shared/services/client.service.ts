import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {ClientEntity} from '../entities/client.entity';
import {FirestoreModel} from './firestore.model';

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
   * Get currentClient by id
   */
  getCurrentClientById(uid: string) {
    return this.afs.collection<ClientEntity>(FirestoreModel.CLIENTS_COLLECTION)
      .doc(uid)
      .valueChanges();
  }
}
