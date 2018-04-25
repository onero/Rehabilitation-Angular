import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {ExerciseModel} from '../../shared/exercise.model';

@Injectable()
export class ExerciseService {

  constructor(private angularFireStore: AngularFirestore) { }

  /**
   * Gets the exercise from FireStore DB.
   * @returns {Observable<ExerciseModel[]>}
   */
  public getExercises(): Observable<ExerciseModel[]> {
    // TODO MSP Refactor this with Client.
    return this.angularFireStore.collection<ExerciseModel>('Exercises').valueChanges();
  }

}
