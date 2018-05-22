import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {ClientEntity} from '../../entities/client.entity';
import {RehabilitationPlan} from '../../entities/rehabilitation-plan.entity';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ClientService {

  private CLIENTS_COLLECTION = 'Clients';

  constructor(private afs: AngularFirestore) {
  }

  /**
   * Get amount of client documents in collection
   * @returns {Observable<number>}
   */
  getAmountOfClients(): Observable<number> {
    return this.afs.collection<ClientEntity>(this.CLIENTS_COLLECTION)
      .valueChanges()
      .map(clients => {
        return clients.length;
      });
  }

  /**
   * Get list of category.
   * @returns {Observable<any[]>}
   */
  getClients() {
    return this.afs.collection<ClientEntity>(this.CLIENTS_COLLECTION,
      ref => ref
        .orderBy('fullName'))
      .valueChanges();
  }

  /**
   * Get list of category.
   * @returns {Observable<any[]>}
   */
  getClientsPaginated(limit: number, lastClient?: ClientEntity) {
    // Check if last client wasn't provided (we paginate from first page)
    if (!lastClient) {
      return this.afs.collection<ClientEntity>(this.CLIENTS_COLLECTION,
        ref =>
          ref.orderBy('fullName')
            .limit(limit))
        .valueChanges();
      // Paginate, starting after last element on previous page
    } else {
      return this.afs.collection<ClientEntity>(this.CLIENTS_COLLECTION,
        ref =>
          ref.orderBy('fullName')
            .startAfter(lastClient.fullName)
            .limit(limit))
        .valueChanges();
    }
  }

  /**
   * Create new client in the CLIENTS_COLLECTION
   * @returns {Promise<DocumentReference>}
   * @param newClient
   */
  createClient(newClient: ClientEntity) {
    return this.afs.collection(this.CLIENTS_COLLECTION)
      .doc(newClient.uid)
      .set(newClient);
  }

  // TODO ALH: Implement with Cloud Functions!
  /**
   * Delete provided client
   * @param {ClientEntity} clientToDelete
   * @returns {AngularFirestoreCollection<any>}
   */
  deleteClient(clientToDelete: ClientEntity) {
    return this.afs.collection(this.CLIENTS_COLLECTION).doc(clientToDelete.uid).delete();
  }

  /**
   * Update client doc on FireStore
   * @param {ClientEntity} clientToUpdate
   * @returns {Promise<void>}
   */
  updateClient(clientToUpdate: ClientEntity) {
    return this.afs.collection(this.CLIENTS_COLLECTION)
      .doc(clientToUpdate.uid)
      .set(clientToUpdate, {merge: true});
  }

  /**
   * Send updated plan to firestore
   * @param {string} clientId
   * @param {RehabilitationPlan} rehabilitationPlan
   * @returns {Promise<void>}
   */
  updateRehabilitationPlanByClientUid(clientId: string, rehabilitationPlan: RehabilitationPlan) {
    return this.afs.collection(this.CLIENTS_COLLECTION)
      .doc(clientId)
      .set(
        {rehabilitationPlan: rehabilitationPlan}
        , {merge: true});
  }

  /**
   * Get currentClient by id
   */
  getCurrentClientById(uid: string) {
    return this.afs.collection<ClientEntity>(this.CLIENTS_COLLECTION)
      .doc(uid)
      .valueChanges();
  }
}
