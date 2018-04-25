import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ClientModel } from '../../therapist/shared/client.model';

@Injectable()
export class ClientService {

  CLIENTS_COLLECTION = 'Clients';

  constructor(private afs: AngularFirestore) {
  }

  /**
   * Get list of category.
   * @returns {Observable<any[]>}
   */
  getClients() {
    const clientCollection = this.afs.collection(this.CLIENTS_COLLECTION).valueChanges();
    return clientCollection;
  }

  /**
   * Create new client in the CLIENTS_COLLECTION
   * @param {string} clientName
   * @returns {Promise<DocumentReference>}
   */
  createClient(newClient: ClientModel) {
    const id = this.afs.createId();
    newClient.uid = id;
    return this.afs.collection(this.CLIENTS_COLLECTION).doc(id).set(newClient);
  }
}
