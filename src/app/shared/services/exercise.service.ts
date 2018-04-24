import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {ExerciseModel} from '../../client/shared/exercise.model';

@Injectable()
export class ExerciseService {

  constructor(private angularFireStore: AngularFirestore) { }

  public getExercises(): Observable<ExerciseModel[]> {
    return this.angularFireStore.collection<ExerciseModel>('Exercises').valueChanges();
  }

}
