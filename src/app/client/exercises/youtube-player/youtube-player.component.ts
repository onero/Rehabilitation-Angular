import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {YoutubeService} from './youtube.service';
import {YoutubeResponse} from './models/YoutubeResponse.model';

@Component({
  selector: 'rehab-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.scss']
})
export class YoutubePlayerComponent implements OnInit {

  @Input() width = 640;
  @Input() height = 390;
  @Input() videoId: string;
  @Input() playerId = 'player';
  @Input() playlistId = '';

  public player: YT.Player;
  public src: SafeResourceUrl;
  public title = '';
  public description = '';

  constructor(private ytService: YoutubeService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.ytService.getVideoInformation(this.videoId)
      .subscribe(result => {
        const ytResponse = result as YoutubeResponse;
        this.title = ytResponse.items[0].snippet.title;
        this.description = ytResponse.items[0].snippet.description;
      });
    this.instantiateVideo();
  }

  loadVideoByUrl(videoUrl: string) {
    const videoId = this.ytService.getIdFromURL(videoUrl);
    this.player.loadVideoById(videoId);
  }

  savePlayer(player) {
    this.player = player;
  }

  onStateChange(event) {
    console.log('player state', event.data);
  }

  private instantiateVideo() {
    // Check for video ID (single video"
    if (this.videoId) {
      this.videoId = this.ytService.getIdFromURL(this.videoId);
    } else if (this.playlistId !== '') {
      this.videoId = '';
    } else {
      this.videoId = 'vntAEVjPBzQ'; // Ghostbusters!
    }

    // Check for playlist
    if (this.playlistId !== '') {
      this.src =
        this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.videoId + '?listType=playlist&list=' + this.playlistId);
    } else {
      // Sanitize the entry
      this.src =
        this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.videoId + '?enablejsapi=1');
    }
  }

}
