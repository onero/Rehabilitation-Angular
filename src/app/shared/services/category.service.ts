import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {FirestoreModel} from './firestore.model';

@Injectable()
export class CategoryService {

  constructor(private angularFireStore: AngularFirestore) { }

  /**
   * Get list of category
   * @returns {Observable<any[]>}
   */
  getCategories() {
    return this.angularFireStore.collection(FirestoreModel.CATEGORIES_COLLECTION).valueChanges();
  }

  /**
   * Create new category in the CATEGORIES_COLLECTION
   * @param {string} categoryName
   */
  createCategory(categoryName: string) {
    const newCategory = {name: categoryName};
    return this.angularFireStore.collection(FirestoreModel.CATEGORIES_COLLECTION).add(newCategory);
  }
}
