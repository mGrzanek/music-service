/* eslint-disable indent */
import { classNames, select, settings } from './settings.js';
import Home from './components/Home.js';
import Search from './components/Search.js';
import Discover from './components/Discover.js';
import Join from './components/Join.js';
import Login from './components/Login.js';
import AddSong from './components/AddSong.js';

const app = {
    initPages: function(){
        const thisApp = this;

        thisApp.pages = document.querySelector(select.containerOf.pagesWrapper).children;
        thisApp.navLinks = document.querySelector(select.nav.links);
        thisApp.loginLinks = document.querySelector(select.nav.loginLinks);
        thisApp.logoutLink = thisApp.loginLinks.querySelector(select.nav.logoutLink);
        thisApp.discoverLink = thisApp.navLinks.querySelector(select.nav.discoverLink);
        const idFromHash =  window.location.hash.replace('#/','');
        let pageMatchingHash = thisApp.pages[0].id;

        for(let page of thisApp.pages){
            if(page.id == idFromHash){
                pageMatchingHash = page.id;
                break;
            }
        }

        thisApp.activatePage(pageMatchingHash);

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
            thisApp.initUserLogged(event.detail.user);
        });

        document.addEventListener('song-added', function(){
            thisApp.fetchSongs();
        });

        thisApp.discoverLink.addEventListener('click', function(){
            thisApp.discover.songRandom();
        });
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
    initData: function(){
        const thisApp = this;
        thisApp.data = {};
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
        thisApp.home = new Home(thisApp.homeWrapper, thisApp.data.songs);

        thisApp.joinButton = thisApp.homeWrapper.querySelector(select.home.joinButton);

        thisApp.joinButton.addEventListener('click', function(event){
            thisApp.getPageId(event);
        });
    },
    initSearch: function(){
        const thisApp = this;

        thisApp.searchWrapper = document.querySelector(select.containerOf.searchWrapper);
        thisApp.search = new Search(thisApp.searchWrapper, thisApp.data.songs);
    },
    initDiscover: function(){
        const thisApp = this;

        thisApp.discoverWrapper = document.querySelector(select.containerOf.discoverWrapper);
        thisApp.discover = new Discover(thisApp.discoverWrapper, thisApp.data.songs);
    },
    initAddSong: function(){
        const thisApp = this;

        thisApp.addSongWrapper = document.querySelector(select.containerOf.addSongWrapper);
        thisApp.addSong = new AddSong(thisApp.addSongWrapper, thisApp.data.songsCategories, thisApp.convertText);
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
    initUserLogged: function(userName){
        const thisApp = this;
        userName = thisApp.convertText(userName);

        thisApp.userLogged = true;
        thisApp.setHidden();
        thisApp.userWelcome = thisApp.loginLinks.querySelector(select.nav.userWelcome);
        thisApp.userWelcome.innerHTML = `Hello, ${userName}!`;
    },
    initUserUnlogged: function(){
        const thisApp = this;
        
        thisApp.userLogged = false;
        thisApp.setHidden();
    },
    init: function(){
        const thisApp = this;
        
        thisApp.initData();
        thisApp.initPages();
        thisApp.initJoin();
    },
};

app.init();

