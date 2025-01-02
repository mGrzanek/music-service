export const select = {
  templateOf: {
    songs: '#template-songs-wrapper',
    home: '#template-home-wrapper',
    search: '#template-search-wrapper',
    discover: '#template-discover-wrapper',
    join: '#template-join-wrapper',
    login: '#template-login-wrapper',
    addSong: '#template-add-song-wrapper',
    songCategories: '#template-checkboxes-song-categories',
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
    addSongWrapper: '.add-song-wrapper',
  },
  nav: {
    links: '.links-wrapper',
    loginLinks: '.login-links-wrapper',
    discoverLink: '.links-wrapper a[href="#discover"]',
    logoutLink: 'a[href="#logout"]',
    userWelcome: '.user',
    forLogged: '.for-logged',
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
  addSong: {
    form: '.song-form',
    title: '[name="title"]',
    author: '[name="author"]',
    filename: '[name="filename"]',
    ranking: '[name="ranking"]',
    category: 'input[name="categories"]',
    checkboxes: '.checkboxes',
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
    songCategories: 'song-categories',
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
    active: 'active'
  },
};

export const templates = {
  songs: Handlebars.compile(document.querySelector(select.templateOf.songs).innerHTML),
  home: Handlebars.compile(document.querySelector(select.templateOf.home).innerHTML),
  search: Handlebars.compile(document.querySelector(select.templateOf.search).innerHTML),
  discover: Handlebars.compile(document.querySelector(select.templateOf.discover).innerHTML),
  join: Handlebars.compile(document.querySelector(select.templateOf.join).innerHTML),
  login: Handlebars.compile(document.querySelector(select.templateOf.login).innerHTML),
  addSong: Handlebars.compile(document.querySelector(select.templateOf.addSong).innerHTML),
  songCategories: Handlebars.compile(document.querySelector(select.templateOf.songCategories).innerHTML),
};