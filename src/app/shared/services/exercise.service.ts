import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {ExerciseModel} from '../../client/shared/exercise.model';

@Injectable()
export class ExerciseService {

  EXERCISES_COLLECTION = 'Exercises';

  constructor(private angularFireStore: AngularFirestore) {
  }

  /**
   * Get observable list of exercise collection from FireStore
   * @returns {Observable<ExerciseModel[]>}
   */
  public getExercises(): Observable<ExerciseModel[]> {
    return this.angularFireStore.collection<ExerciseModel>(this.EXERCISES_COLLECTION).valueChanges();
  }

  /**
   * Add new exercise
   * @param {ExerciseModel} newExercise
   * @returns {Promise<DocumentReference>}
   */
  addExercise(newExercise: ExerciseModel) {
    const id = this.angularFireStore.createId();
    newExercise.uid = id;
    return this.angularFireStore.collection<ExerciseModel>(this.EXERCISES_COLLECTION).doc(id).set(newExercise);
  }

  deleteExercise(currentExercise: ExerciseModel) {
    return this.angularFireStore.collection<ExerciseModel>(this.EXERCISES_COLLECTION).doc(currentExercise.uid).delete();
  }
}
