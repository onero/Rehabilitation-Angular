import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ExerciseService {

  constructor(private angularFireStore: AngularFirestore) { }

  public getExercises() {
    return this.angularFireStore.collection('test/');
  }

}
