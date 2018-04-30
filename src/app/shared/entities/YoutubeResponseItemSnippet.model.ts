import {YoutubeResponseItemSnippetThumbnail} from './YoutubeResponseItemSnippetThumbnail.model';

export interface YoutubeResponseItemSnippet {
  title: string;
  description: string;
  thumbnails: YoutubeResponseItemSnippetThumbnail;
}
