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
    const clientCollection = this.afs.collection(this.CLIENTS_COLLECTION).valueChanges();
    return clientCollection;
  }

  /**
   * Create new client in the CLIENTS_COLLECTION
   * @param {string} clientName
   * @returns {Promise<DocumentReference>}
   */
  createClient(clientName: string, clientAddress: string, clientPhone: string, clientEmail: string) {
    const newClient = {
      fullName: clientName,
      address: clientAddress,
      phone: clientPhone,
      email: clientEmail
    };
    return this.afs.collection(this.CLIENTS_COLLECTION).add(newClient);
  }
}
