import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

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
    return this.afs.collection(this.CLIENTS_COLLECTION).valueChanges();
  }

  /**
   * Create new client in the CLIENTS_COLLECTION
   * @param {string} clientName
   * @returns {Promise<DocumentReference>}
   */
  createClient(clientName: string) {
    const newClient = {fullName: clientName};
    return this.afs.collection(this.CLIENTS_COLLECTION).add(newClient);
  }
}
