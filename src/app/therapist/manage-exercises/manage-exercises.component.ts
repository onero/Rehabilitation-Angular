import {Component, OnInit, ViewChild} from '@angular/core';
import {ExerciseEntity} from '../../shared/entities/exercise.entity';
import {ManageExercisesListComponent} from './manage-exercises-list/manage-exercises-list.component';
import {ClientService} from '../../shared/services/client.service';
interface AssignedExerciseEntity {
  clientUid: '';
  exerciseUid: '';
}

@Component({
  selector: 'rehab-manage-exercises',
  templateUrl: './manage-exercises.component.html',
  styleUrls: ['./manage-exercises.component.scss']
})
export class ManageExercisesComponent implements OnInit {
  @ViewChild('exerciseList') childExerciseList: ManageExercisesListComponent;
  selectedCategory: string;
  selectedExercise: ExerciseEntity;

  constructor(private clientService: ClientService) {
  }

  ngOnInit() {
    // TODO ALH: Move to functions!
    this.clientService.getAssignedExercisesByExerciseId()
      .subscribe(result => {
        result.forEach(assignedExercise => {
          const assignedExerciseEntity = assignedExercise as AssignedExerciseEntity;
          this.clientService.getCurrentClientById(assignedExerciseEntity.clientUid)
            .subscribe(client => console.log(client));
        });
      });
  }

  onSelectedCategory(selectedCategory: string) {
    this.selectedCategory = selectedCategory;
    this.selectedExercise = null;
    // Clear search field
    this.childExerciseList.searchValue = ' ';

  }
}
