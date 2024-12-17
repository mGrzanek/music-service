export const select = {
  templateOf: {
    songs: '#template-songs-wrapper',
  },
  containerOf: {
    songsWrapper: '.songs-wrapper',
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
};