import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {YoutubeService} from '../../../shared/services/youtube.service';
import {YoutubeResponse} from '../../../shared/entities/YoutubeResponse.model';

@Component({
  selector: 'rehab-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.scss']
})
export class YoutubePlayerComponent implements OnInit, OnChanges {

  @Input() videoUrl = '';
  @Input() width = 640;
  @Input() height = 390;
  @Input() playerId = 'player';
  @Input() playlistId = '';

  public player: YT.Player;

  // public src: SafeResourceUrl;

  constructor(private ytService: YoutubeService) {
  }

  ngOnInit() {
    this.instantiateVideo();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadVideoByUrl(this.videoUrl);
  }

  /**
   * Load video into player by url
   * @param {string} videoUrl
   */
  loadVideoByUrl(videoUrl: string) {
    if (videoUrl) {
      const videoId = this.ytService.getIdFromURL(videoUrl);
      if (this.player) {
        this.player.loadVideoById(videoId);
      }
    }
  }

  /**
   * Save a reference to the YoutubePlayer
   * @param player
   */
  savePlayer(player) {
    this.player = player;
  }

  /**
   * Triggered when player starts, pauses, resumes or stops
   * @param event
   */
  onStateChange(event) {
  }

  private instantiateVideo() {
    // Check for video ID (single video"
    if (this.videoUrl) {
      this.videoUrl = this.ytService.getIdFromURL(this.videoUrl);
    } else if (this.playlistId !== '') {
      this.videoUrl = '';
    } else {
      this.videoUrl = 'vntAEVjPBzQ'; // Ghostbusters!
    }

    // // Check for playlist
    // if (this.playlistId !== '') {
    //   this.src =
    //     this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.videoUrl + '?listType=playlist&list=' + this.playlistId);
    // } else {
    //   // Sanitize the entry
    //   this.src =
    //     this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.videoUrl + '?enablejsapi=1');
    // }
  }

}
