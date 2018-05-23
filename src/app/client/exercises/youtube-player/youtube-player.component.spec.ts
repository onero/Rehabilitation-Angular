import {YoutubeService} from '../../../shared/services/youtube.service';

describe('Youtube service should', () => {
  let youtubeService: YoutubeService;
  youtubeService = new YoutubeService(null); // Parsing null, due to mock implementation

  it('Get videoId from http url', () => {
    const videoUrlToValidateAgainst = 'http://www.youtube.com/watch?v=LXOaCkbt4lI';
    const expectedResult = 'LXOaCkbt4lI';

    expect(youtubeService.getIdFromURL(videoUrlToValidateAgainst)).toBe(expectedResult);
  });

  it('Get videoId from https url', () => {
    const videoUrlToValidateAgainst = 'https://www.youtube.com/watch?v=LXOaCkbt4lI';
    const expectedResult = 'LXOaCkbt4lI';

    expect(youtubeService.getIdFromURL(videoUrlToValidateAgainst)).toBe(expectedResult);
  });

  it('Get videoId from Shared Url At Specific Video Position', () => {
    const videoUrlToValidateAgainst = 'https://youtu.be/LXOaCkbt4lI?t=3m9s';
    const expectedResult = 'LXOaCkbt4lI';

    expect(youtubeService.getIdFromURL(videoUrlToValidateAgainst)).toBe(expectedResult);
  });

  it('Get videoId from Dk Localized Url', () => {
    const videoUrlToValidateAgainst = 'https://www.youtube.com/watch?v=LXOaCkbt4lI&gl=DK&hl=da';
    const expectedResult = 'LXOaCkbt4lI';

    expect(youtubeService.getIdFromURL(videoUrlToValidateAgainst)).toBe(expectedResult);
  });
});
