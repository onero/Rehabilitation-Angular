import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable()
export class CategoryService {

  CATEGORIES_COLLECTION = 'Categories';

  constructor(private angularFireStore: AngularFirestore) { }

  /**
   * Get list of category
   * @returns {Observable<any[]>}
   */
  getCategories() {
    return this.angularFireStore.collection(this.CATEGORIES_COLLECTION).valueChanges();
  }

  /**
   * Create new category in the CATEGORIES_COLLECTION
   * @param {string} categoryName
   */
  createCategory(categoryName: string) {
    const newCategory = {name: categoryName};
    return this.angularFireStore.collection(this.CATEGORIES_COLLECTION).add(newCategory);
  }
}
