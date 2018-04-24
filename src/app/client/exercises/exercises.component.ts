import {Component, OnInit, ViewChild} from '@angular/core';
import {YoutubePlayerComponent} from './youtube-player/youtube-player.component';

@Component({
  selector: 'rehab-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {
  // Set reference to child youtube player
  @ViewChild('youtubePlayer') child: YoutubePlayerComponent;
  currentVideoId: string;


  constructor() {
  }

  ngOnInit() {
    // TODO ALH: Dynamically insert videoID!
    this.currentVideoId = '8GI7pzelfJk';
  }

  /**
   * Load a new video, by its id
   * @param {string} videoId
   */
  loadNewVideoById(videoId: string) {
    this.child.loadVideoById(videoId);
  }

}
