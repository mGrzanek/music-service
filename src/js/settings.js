export const select = {
  templateOf: {
    songs: '#template-songs-wrapper',
    home: '#template-home-wrapper',
    search: '#template-search-wrapper',
    discover: '#template-discover-wrapper',
    join: '#template-join-wrapper',
    login: '#template-login-wrapper',
  },
  containerOf: {
    songsWrapper: '.songs-wrapper',
    homeWrapper: '.home-wrapper',
    searchWrapper: '.search-wrapper',
    audioWrapper: '.player',
    discoverWrapper: '.discover-wrapper',
    pagesWrapper: '#pages',
    joinWrapper: '.join-wrapper',
    loginWrapper: '.login-wrapper',
  },
  nav: {
    links: '.links-wrapper',
    loginLinks: '.login-links-wrapper',
    discoverLink: '.links-wrapper a[href="#discover"]',
    logoutLink: 'a[href="#logout"]',
    userWelcome: '.user',
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
  login: {
    form: '.login-form',
    email: '[name="email"]',
    password: '[name="password"]',
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
    active: 'active',
  },
  form: {
    success: 'success',
    error: 'error',
  },
  links: {
    hidden:'hidden',
  },
};

export const templates = {
  songs: Handlebars.compile(document.querySelector(select.templateOf.songs).innerHTML),
  home: Handlebars.compile(document.querySelector(select.templateOf.home).innerHTML),
  search: Handlebars.compile(document.querySelector(select.templateOf.search).innerHTML),
  discover: Handlebars.compile(document.querySelector(select.templateOf.discover).innerHTML),
  join: Handlebars.compile(document.querySelector(select.templateOf.join).innerHTML),
  login: Handlebars.compile(document.querySelector(select.templateOf.login).innerHTML),
};