/* eslint-disable indent */
import { classNames, select, settings } from './settings.js';
import Home from './components/Home.js';
import Search from './components/Search.js';
import Discover from './components/Discover.js';
import Join from './components/Join.js';
import Login from './components/Login.js';
import AddSong from './components/AddSong.js';
import Favorite from './components/Favorite.js';

const app = {
    getElements: function(){
        const thisApp = this;

        thisApp.pages = document.querySelector(select.containerOf.pagesWrapper).children;
        thisApp.navLinks = document.querySelector(select.nav.links);
        thisApp.loginLinks = document.querySelector(select.nav.loginLinks);
        thisApp.logoutLink = thisApp.loginLinks.querySelector(select.nav.logoutLink);
        thisApp.searchLink = thisApp.navLinks.querySelector(select.nav.searchLink);
        thisApp.discoverLink = thisApp.navLinks.querySelector(select.nav.discoverLink);
        thisApp.userStatus = false;
    },
    initPages: function(){
        const thisApp = this;

        const idFromHash =  window.location.hash.replace('#/','');
        let pageMatchingHash = thisApp.pages[0].id;

        for(let page of thisApp.pages){
            if(page.id == idFromHash){
                pageMatchingHash = page.id;
                break;
            }
        }

        thisApp.activatePage(pageMatchingHash);
    },
    getPageId: function(event){
        const thisApp = this;

        const clickedElement = event.target;
        event.preventDefault();
        const id = clickedElement.getAttribute('href').replace('#', '');
        thisApp.activatePage(id);
        window.location.hash = `#/${id}`;
    },
    activatePage: function(pageId){
        const thisApp = this;

        for(let page of thisApp.pages){
            page.classList.toggle(
                classNames.pages.active,
                page.id == pageId
            );
        }
    },
    initActions(){
        const thisApp = this;

        thisApp.navLinks.addEventListener('click', function(event){
            thisApp.getPageId(event);
        });

        thisApp.loginLinks.addEventListener('click', function(event){
            thisApp.getPageId(event);
        });

        thisApp.logoutLink.addEventListener('click', function(){
            thisApp.initUserUnlogged();
        });

        document.addEventListener('user-added', function(){
            thisApp.fetchUsers();
        });

        document.addEventListener('logged', function(event){
            thisApp.activatePage(thisApp.pages[0].id);
            thisApp.initUserLogged(event.detail.userName, event.detail.userPlayedSongs, event.detail.favoriteSongs);
            thisApp.userId = event.detail.userId;
            //console.log('thisApp.userId', thisApp.userId);
            // thisApp.playedSongsCategories = event.detail.userPlayedSongs;
            // thisApp.favoriteSongs = event.detail.favoriteSongs;
            // console.log('thisApp.favoriteSongs', thisApp.playedSongsCategories);
        });

        document.addEventListener('song-added', function(){
            thisApp.fetchSongs();
        });

        document.addEventListener('played-song', function(event){
            if(thisApp.userLogged){
                thisApp.songsCategoryCounter(event.detail.songCategories);
            }
        });

        document.addEventListener('update-favorite', function(event){
            const songId = event.detail.songId;
            if(thisApp.userLogged){
                if(!thisApp.favoriteSongs.includes(songId)){
                    thisApp.favoriteSongs.push(songId);
                    thisApp.home.initSongs(thisApp.favoriteSongs, thisApp.userLogged);
                    thisApp.favorite.showFavorites(thisApp.favoriteSongs, thisApp.userLogged);
                    thisApp.discover.songRandom(thisApp.userLogged, thisApp.playedSongsCategories, thisApp.favoriteSongs);
                } else {
                    const songToRemove = thisApp.favoriteSongs.indexOf(songId);
                    thisApp.favoriteSongs.splice(songToRemove, 1);
                    thisApp.home.initSongs(thisApp.favoriteSongs, thisApp.userLogged);
                    thisApp.favorite.showFavorites(thisApp.favoriteSongs, thisApp.userLogged);
                    thisApp.discover.songRandom(thisApp.userLogged, thisApp.playedSongsCategories, thisApp.favoriteSongs);
                }   
            }
        });

        thisApp.discoverLink.addEventListener('click', function(){
            thisApp.discover.songRandom(thisApp.userLogged, thisApp.userPlayedSongs, thisApp.favoriteSongs);
        });

        thisApp.searchLink.addEventListener('click', function(){
            thisApp.search.clearSongs();
        });
    },
    initData: function(){
        const thisApp = this;
        thisApp.data = {};
        thisApp.categories = [];
        thisApp.fetchSongs();
        thisApp.fetchUsers();
        thisApp.fetchSongsCategories();   
    }, 
    fetchSongs: function(){
        const thisApp = this;
        const url = settings.db.url + '/' + settings.db.songs;

        fetch(url)
            .then(function(rawResponse){
                return rawResponse.json();
            })
            .then(function(parsedResponse){
                thisApp.data.songs = parsedResponse;
                for(let dataSong in thisApp.data.songs){
                    for(let category of thisApp.data.songs[dataSong].categories){
                        if(!thisApp.categories.includes(category)){
                            thisApp.categories.push(category);
                        }
                    }
                }
                thisApp.initHome();
                thisApp.initSearch();
                thisApp.initDiscover();
            });
    },
    fetchUsers: function(){
        const thisApp = this;
        const url = settings.db.url + '/' + settings.db.users;

        fetch(url)
            .then(function(rawResponse){
                return rawResponse.json();
            })
            .then(function(parsedResponse){
                thisApp.data.users = parsedResponse;
                thisApp.initLogin();
                thisApp.initFavorite();
            });
    },
    fetchSongsCategories: function(){
        const thisApp = this;
        const url = settings.db.url +'/' + settings.db.songCategories;

        fetch(url)
            .then(function(rawResponse){
                return rawResponse.json();
            })
            .then(function(parsedResponse){
                thisApp.data.songsCategories = parsedResponse;
                thisApp.initAddSong();
            });
    },
    initHome: function(){
        const thisApp = this;
        thisApp.homeWrapper = document.querySelector(select.containerOf.homeWrapper);
        thisApp.home = new Home(thisApp.homeWrapper, thisApp.data.songs, thisApp.categories, thisApp.favoriteSongs, thisApp.userLogged);
        thisApp.joinButton = thisApp.homeWrapper.querySelector(select.home.joinButton);

        thisApp.joinButton.addEventListener('click', function(event){
            thisApp.getPageId(event);
        });
    },
    initSearch: function(){
        const thisApp = this;

        thisApp.searchWrapper = document.querySelector(select.containerOf.searchWrapper);
        thisApp.search = new Search(thisApp.searchWrapper, thisApp.data.songs, thisApp.categories, thisApp.favoriteSongs, thisApp.userLogged);
    },
    initDiscover: function(){
        const thisApp = this;

        thisApp.discoverWrapper = document.querySelector(select.containerOf.discoverWrapper);
        thisApp.discover = new Discover(thisApp.discoverWrapper, thisApp.data.songs, thisApp.userPlayedSongs, thisApp.favoriteSongs, thisApp.userLogged);
    },
    initAddSong: function(){
        const thisApp = this;

        thisApp.addSongWrapper = document.querySelector(select.containerOf.addSongWrapper);
        thisApp.addSong = new AddSong(thisApp.addSongWrapper, thisApp.data.songsCategories, thisApp.convertText);
    },
    initFavorite: function(){
        const thisApp = this;

        thisApp.favoriteWrapper = document.querySelector(select.containerOf.favoriteWrapper);
        thisApp.favorite = new Favorite(thisApp.favoriteWrapper, thisApp.data.songs, thisApp.favoriteSongs, thisApp.userLogged);
    },
    initJoin: function(){
        const thisApp = this;

        thisApp.joinWrapper = document.querySelector(select.containerOf.joinWrapper);
        thisApp.join = new Join(thisApp.joinWrapper, thisApp.convertText);
    },
    initLogin: function(){
        const thisApp = this;

        thisApp.loginWrapper = document.querySelector(select.containerOf.loginWrapper);
        thisApp.login = new Login(thisApp.loginWrapper, thisApp.data.users);
    },
    setHidden: function(){
        const thisApp = this;
        thisApp.linksForLogged = document.querySelectorAll(select.nav.forLogged);

        for(let link of thisApp.linksForLogged){
            if(thisApp.userLogged){
                link.classList.add(classNames.links.active);
                for(let logLink of thisApp.loginLinks.children){
                    if(logLink.tagName === 'A'){
                        logLink.classList.add(classNames.links.hidden);
                    }
                }
            } else {
                link.classList.remove(classNames.links.active);
                for(let logLink of thisApp.loginLinks.children){
                    if(logLink.tagName === 'A'){
                        logLink.classList.remove(classNames.links.hidden);
                    }
                }
            }
        }
    },
    convertText: function(text){
        let newText = text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
        return newText;
    },
    initUserLogged: function(userName, userPlayedSongs, favoriteSongs){
        const thisApp = this;
        userName = thisApp.convertText(userName);

        thisApp.userLogged = true;
        thisApp.setHidden();
        thisApp.userWelcome = thisApp.loginLinks.querySelector(select.nav.userWelcome);
        thisApp.userWelcome.innerHTML = `Hello, ${userName}!`;
        thisApp.userPlayedSongs = userPlayedSongs;
        thisApp.favoriteSongs = favoriteSongs;
        console.log('app playedSongs and favoriteSongs', thisApp.userPlayedSongs, thisApp.favoriteSongs);
        thisApp.home.initSongs(thisApp.favoriteSongs, thisApp.userLogged);
        thisApp.favorite.showFavorites(thisApp.favoriteSongs, thisApp.userLogged);
        thisApp.search.initActions(thisApp.favoriteSongs, thisApp.userLogged);
        thisApp.discover.songRandom(thisApp.userLogged, thisApp.thisApp.userPlayedSongs, thisApp.favoriteSongs);
    },
    initUserUnlogged: function(){
        const thisApp = this;
        
        const url = `${settings.db.url}/${settings.db.users}/${thisApp.userId}`; 
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                playedSongs: thisApp.playedSongsCategories,
                favoriteSongs: thisApp.favoriteSongs
            })
        };

        fetch(url, options);

        thisApp.userId = null;
        thisApp.playedSongsCategories = null;
        thisApp.favoriteSongs = null;
        thisApp.userLogged = false;
        thisApp.setHidden();
        thisApp.home.initSongs(thisApp.favoriteSongs, thisApp.userLogged);
        thisApp.search.initActions(thisApp.favoriteSongs, thisApp.userLogged);
    },
    songsCategoryCounter: function(categoriesArr){
        const thisApp = this;

        for(let category of categoriesArr){
            if(typeof thisApp.playedSongsCategories[category] === 'undefined'){
                thisApp.playedSongsCategories[category] = {};          
                thisApp.playedSongsCategories[category].amount = 1;
            } else {
                thisApp.playedSongsCategories[category].amount++;
            }
        }
    },
    init: function(){
        const thisApp = this;
        
        thisApp.initData();
        thisApp.getElements();
        thisApp.initPages();
        thisApp.initActions();
        thisApp.initJoin();
    },
};

app.init();

