export const select = {
  templateOf: {
    songs: '#template-songs-wrapper',
    home: '#template-home-wrapper',
    search: '#template-search-wrapper',
    discover: '#template-discover-wrapper',
    join: '#template-join-wrapper',
    login: '#template-login-wrapper',
    addSong: '#template-add-song-wrapper',
    favorite: '#template-favorite-wrapper',
    songCategories: '#template-checkboxes-song-categories',
    songCategoryLink: '#template-song-category-link',
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
    favoriteWrapper: '.favorite-wrapper',
    songsCategoriesLinks: '.songs-categories',
  },
  nav: {
    links: '.links-wrapper',
    loginLinks: '.login-links-wrapper',
    discoverLink: 'a[href="#discover"]',
    logoutLink: 'a[href="#logout"]',
    userWelcome: '.user',
    forLogged: '.for-logged',
  },
  home: {
    joinButton: '[href="#join"]',
    songCategoryLink: '.songs-categories a',
  },
  song: {
    categoryId: 'span[data-id',
    playBtn: '.play-pause-btn',
  },
  search: {
    formButton: 'form .btn',
    formInput: '#song-input',
    subtitle: '.section-subtitle',
    categoryInput: '#category-input',
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
    category: '[name="categories"]',
    checkboxes: '.checkboxes',
    songAdded: '.section-subtitle',
  },
  join: {
    form: '.join-form',
    name: '[name="name"]',
    surname: '[name="surname"]',
    email: '[name="email"]',
    password: '[name="password"]',
    newAccount: '.section-subtitle',
  },
  login: {
    form: '.login-form',
    email: '[name="email"]',
    password: '[name="password"]',
    message: '.section-subtitle',
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
    hidden: 'hidden',
    active: 'active',
  },
  songs: {
    hidden: 'hidden',
    favorite: 'favorite',
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
  songCategoryLink: Handlebars.compile(document.querySelector(select.templateOf.songCategoryLink).innerHTML),
  favorite: Handlebars.compile(document.querySelector(select.templateOf.favorite).innerHTML),
};