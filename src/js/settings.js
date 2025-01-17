export const select = {
  templateOf: {
    songs: '#template-songs-wrapper',
    search: '#template-search-wrapper',
    join: '#template-join-wrapper',
    login: '#template-login-wrapper',
    addSong: '#template-add-song-wrapper',
    favorite: '#template-favorite-wrapper',
    songCategories: '#template-checkboxes-song-categories',
    privacyCategories: '#template-radio-song-categories',
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
    searchLink: 'a[href="#search"]',
    discoverLink: 'a[href="#discover"]',
    logoutLink: 'a[href="#logout"]',
    userWelcome: '.user',
    forLogged: '.for-logged',
  },
  home: {
    joinButton: '[href="#join"]',
    songsWrapper: '.songs-wrapper',
    songCategoryLink: '.songs-categories a',
  },
  song: {
    categoryId: 'span[data-id',
    playBtn: '.play-pause-btn',
    favoriteIcon: '.fa-heart',
  },
  search: {
    formButton: 'form .btn',
    form: 'form',
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
    privacy: '[name="privacy"]',
    checkboxes: '.checkboxes',
    songCategories: '.categories-checkbox',
    privacyCategories: '.privacy-checkbox',
    songAdded: '.section-subtitle',
  },
  favorite: {
    songsWrapper: '.songs-wrapper',
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
    url: '//' + window.location.hostname + (window.location.hostname=='localhost' ? ':3131' : ''),
    songs: 'songs',
    users: 'users',
    songCategories: 'song-categories',
    templates: 'templates',
  },
  privacyCategory: {
    private: 'Private',
  },
  actions: {
    remove: 'remove',
    add: 'add',
  }
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
  search: Handlebars.compile(document.querySelector(select.templateOf.search).innerHTML),
  join: Handlebars.compile(document.querySelector(select.templateOf.join).innerHTML),
  login: Handlebars.compile(document.querySelector(select.templateOf.login).innerHTML),
  addSong: Handlebars.compile(document.querySelector(select.templateOf.addSong).innerHTML),
  songCategories: Handlebars.compile(document.querySelector(select.templateOf.songCategories).innerHTML),
  privacyCategories: Handlebars.compile(document.querySelector(select.templateOf.privacyCategories).innerHTML),
  songCategoryLink: Handlebars.compile(document.querySelector(select.templateOf.songCategoryLink).innerHTML),
  favorite: Handlebars.compile(document.querySelector(select.templateOf.favorite).innerHTML),
};