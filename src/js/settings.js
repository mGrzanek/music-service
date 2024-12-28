export const select = {
  templateOf: {
    songs: '#template-songs-wrapper',
    home: '#template-home-wrapper',
    search: '#template-search-wrapper',
    discover: '#template-discover-wrapper',
    join: '#template-join-wrapper',
  },
  containerOf: {
    songsWrapper: '.songs-wrapper',
    homeWrapper: '.home-wrapper',
    searchWrapper: '.search-wrapper',
    audioWrapper: '.player',
    discoverWrapper: '.discover-wrapper',
    pagesWrapper: '#pages',
    joinWrapper: '.join-wrapper',
  },
  nav: {
    links: '.links-wrapper',
    loginLinks: '.login-wrapper',
    discoverLink: '.links-wrapper a[href="#discover"]',
  },
  home: {
    joinButton: '[href="#join"]',
  },
  search: {
    formButton: 'form .btn',
    formInput: '#song-input',
    subtitle: '.section-subtitle',
  },
  discover: {
    songsWrapper: '.songs-wrapper',
  },
  join: {
    form: '.join-form',
    name: '[name="name"]',
    surname: '[name="surname"]',
    email: '[name="email"]',
    password: '[name="password"]',
    newAccount: '.new-account',
  },
};

export const settings = {
  db: {
    url: '//localhost:3131',
    songs: 'songs',
    users: 'users',
  },
};

export const classNames = {
  pages: {
    active:'active',
  },
  form: {
    success: 'success',
    error: 'error',
  },
};

export const templates = {
  songs: Handlebars.compile(document.querySelector(select.templateOf.songs).innerHTML),
  home: Handlebars.compile(document.querySelector(select.templateOf.home).innerHTML),
  search: Handlebars.compile(document.querySelector(select.templateOf.search).innerHTML),
  discover: Handlebars.compile(document.querySelector(select.templateOf.discover).innerHTML),
  join: Handlebars.compile(document.querySelector(select.templateOf.join).innerHTML),
};