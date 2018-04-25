import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable()
export class CategoryService {

  CATEGORIES_COLLECTION = 'Categories';

  constructor(private angularFireStore: AngularFirestore) { }

  /**
   * Get list of categories
   * @returns {Observable<any[]>}
   */
  getCategories() {
    return this.angularFireStore.collection(this.CATEGORIES_COLLECTION).valueChanges();
  }

}
