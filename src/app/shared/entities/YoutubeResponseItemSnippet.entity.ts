import {YoutubeResponseItemSnippetThumbnail} from './YoutubeResponseItemSnippetThumbnail.entity';

export interface YoutubeResponseItemSnippet {
  title: string;
  description: string;
  thumbnails: YoutubeResponseItemSnippetThumbnail;
}
