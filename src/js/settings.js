export const select = {
  templateOf: {
    songs: '#template-songs-wrapper',
    home: '#template-home-wrapper',
    search: '#template-search-wrapper',
    discover: '#template-discover-wrapper',
    registration: '#template-registration-wrapper',
  },
  containerOf: {
    songsWrapper: '.songs-wrapper',
    homeWrapper: '.home-wrapper',
    searchWrapper: '.search-wrapper',
    audioWrapper: '.player',
    discoverWrapper: '.discover-wrapper',
    pagesWrapper: '#pages',
    registrationWrapper: '.registration-wrapper',
  },
  nav: {
    links: '.links-wrapper',
    discoverLink: '.links-wrapper a[href="#discover"]',
  },
  home: {
    joinButton: '[href="#registration"]',
  },
  search: {
    formButton: 'form .btn',
    formInput: '#song-input',
    subtitle: '.section-subtitle',
  },
  discover: {
    songsWrapper: '.songs-wrapper',
  },
};

export const settings = {
  db: {
    url: '//localhost:3131',
    songs: 'songs',
  },
};

export const classNames = {
  pages: {
    active:'active',
  },
};

export const templates = {
  songs: Handlebars.compile(document.querySelector(select.templateOf.songs).innerHTML),
  home: Handlebars.compile(document.querySelector(select.templateOf.home).innerHTML),
  search: Handlebars.compile(document.querySelector(select.templateOf.search).innerHTML),
  discover: Handlebars.compile(document.querySelector(select.templateOf.discover).innerHTML),
  registration: Handlebars.compile(document.querySelector(select.templateOf.registration).innerHTML),
};