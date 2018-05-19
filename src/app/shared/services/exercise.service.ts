import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {ExerciseEntity} from '../entities/exercise.entity';
import {FirestoreModel} from './firestore.model';
import 'rxjs/add/operator/first';

@Injectable()
export class ExerciseService {

  constructor(private angularFireStore: AngularFirestore) {
  }

  /**
   * Get observable list of exercise collection from FireStore
   * @returns {Observable<ExerciseEntity[]>}
   */
  public getExercises() {
    return this.angularFireStore.collection<ExerciseEntity>(FirestoreModel.EXERCISES_COLLECTION,
      ref => ref.orderBy('title')).valueChanges();
  }

  /**
   * Get observable list of exercise collection in provided category from FireStore
   * @returns {Observable<ExerciseEntity[]>}
   */
  public getExercisesByCategoryNamePaginated(categoryName: string, limit: number, lastExercise?: ExerciseEntity) {
    return this.angularFireStore.collection<ExerciseEntity>(FirestoreModel.EXERCISES_COLLECTION,
      ref => ref
        .where('category', '==', categoryName)
        .orderBy('title')
        .startAt(lastExercise.title)
        .limit(limit))
      .valueChanges();
  }

  /**
   * Get observable list of exercise collection in provided category from FireStore
   * @returns {Observable<ExerciseEntity[]>}
   */
  public getExercisesByCategoryName(categoryName: string) {
    return this.angularFireStore.collection<ExerciseEntity>(FirestoreModel.EXERCISES_COLLECTION,
      ref => ref
        .where('category', '==', categoryName)
        .orderBy('title'))
        .valueChanges();
  }

  /**
   * Add new exercise
   * @param {ExerciseEntity} newExercise
   * @returns {Promise<DocumentReference>}
   */
  addExercise(newExercise: ExerciseEntity) {
    const id = this.angularFireStore.createId();
    newExercise.uid = id;
    return this.angularFireStore.collection<ExerciseEntity>(FirestoreModel.EXERCISES_COLLECTION)
      .doc(id).set(newExercise);
  }

  /**
   * Delete parsed exercise
   */
  deleteExercise(currentExercise: ExerciseEntity) {
    return this.angularFireStore.collection<ExerciseEntity>(FirestoreModel.EXERCISES_COLLECTION)
      .doc(currentExercise.uid).delete();
  }

  /**
   * Update parsed exercise
   */
  updateExercise(updatedExercise: ExerciseEntity) {
    return this.angularFireStore.collection<ExerciseEntity>(FirestoreModel.EXERCISES_COLLECTION)
      .doc(updatedExercise.uid).set(updatedExercise);
  }

  /**
   * Get exercise by provided id
   * @param {string} exerciseId
   * @returns {Observable<ExerciseEntity>}
   */
  getExerciseById(exerciseId: string): Observable<ExerciseEntity> {
    return this.angularFireStore.collection(FirestoreModel.EXERCISES_COLLECTION)
      .doc(exerciseId).valueChanges();
  }
}
