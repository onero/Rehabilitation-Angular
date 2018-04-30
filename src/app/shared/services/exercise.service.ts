import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {ExerciseModel} from '../../client/shared/exercise.model';
import {FirestoreModel} from './firestore.model';
import {E} from '@angular/core/src/render3';
import 'rxjs/add/operator/first';

@Injectable()
export class ExerciseService {

  constructor(private angularFireStore: AngularFirestore) {
  }

  /**
   * Get observable list of exercise collection from FireStore
   * @returns {Observable<ExerciseModel[]>}
   */
  public getExercises(): Observable<ExerciseModel[]> {
    return this.angularFireStore.collection<ExerciseModel>(FirestoreModel.EXERCISES_COLLECTION).valueChanges();
  }

  /**
   * Get observable list of exercise collection in provided category from FireStore
   * @returns {Observable<ExerciseModel[]>}
   */
  public getExercisesByCategoryName(categoryName: string): Observable<ExerciseModel[]> {
    return this.angularFireStore.collection<ExerciseModel>(FirestoreModel.EXERCISES_COLLECTION,
      ref => ref.where('category', '==', categoryName)).valueChanges();
  }

  /**
   * Add new exercise
   * @param {ExerciseModel} newExercise
   * @returns {Promise<DocumentReference>}
   */
  addExercise(newExercise: ExerciseModel) {
    const id = this.angularFireStore.createId();
    newExercise.uid = id;
    return this.angularFireStore.collection<ExerciseModel>(FirestoreModel.EXERCISES_COLLECTION).doc(id).set(newExercise);
  }

  /**
   * Delete parsed exercise
   */
  deleteExercise(currentExercise: ExerciseModel) {
    return this.angularFireStore.collection<ExerciseModel>(FirestoreModel.EXERCISES_COLLECTION).doc(currentExercise.uid).delete();
  }

  /**
   * Update parsed exercise
   */
  updateExercise(updatedExercise: ExerciseModel) {
    return this.angularFireStore.collection<ExerciseModel>(FirestoreModel.EXERCISES_COLLECTION).doc(updatedExercise.uid).set(updatedExercise);
  }

  /**
   * Get exercise by provided id
   * @param {string} exerciseId
   * @returns {AngularFirestoreCollection<ExerciseModel[]>}
   */
  getExerciseById(exerciseId: string): Observable<ExerciseModel> {
    return this.angularFireStore.collection<ExerciseModel>(FirestoreModel.EXERCISES_COLLECTION,
      ref => ref.where('uid', '==', exerciseId)).valueChanges()
      .first()
      .map(result => {
        return result[0];
      });
  }
}
