export const select = {
  templateOf: {
    songs: '#template-songs-wrapper',
    home: '#template-home-wrapper',
  },
  containerOf: {
    songsWrapper: '.songs-wrapper',
    homeWrapper: '.home-wrapper',
    audioWrapper: '.player',
  }
};

export const settings = {
  db: {
    url: '//localhost:3131',
    songs: 'songs',
  }
};

export const templates = {
  songs: Handlebars.compile(document.querySelector(select.templateOf.songs).innerHTML),
  home: Handlebars.compile(document.querySelector(select.templateOf.home).innerHTML),
};