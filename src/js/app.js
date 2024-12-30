/* eslint-disable indent */
import { classNames, select, settings } from './settings.js';
import Home from './components/Home.js';
import Search from './components/Search.js';
import Discover from './components/Discover.js';
import Join from './components/Join.js';
import Login from './components/Login.js';

const app = {
    initPages: function(){
        const thisApp = this;

        thisApp.pages = document.querySelector(select.containerOf.pagesWrapper).children;
        thisApp.navLinks = document.querySelector(select.nav.links);
        thisApp.loginLinks = document.querySelector(select.nav.loginLinks);
        thisApp.logoutLink = thisApp.loginLinks.querySelector(select.nav.logoutLink);
        thisApp.discoverLink = thisApp.navLinks.querySelector(select.nav.discoverLink);
        thisApp.userLogged = false;
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

        thisApp.logoutLink.addEventListener('click', function(event){
            event.preventDefault();
            thisApp.initUserUnlogged();
        });

        document.addEventListener('logged', function(event){
            thisApp.activatePage(thisApp.pages[0].id);
            console.log('logged user!');
            thisApp.initUserLogged(event.detail.user);
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
        const urlSongs = settings.db.url + '/' + settings.db.songs;
        const urlUsers = settings.db.url + '/' + settings.db.users;

        fetch(urlSongs)
            .then(function(rawResponse){
                return rawResponse.json();
            })
            .then(function(parsedResponse){
                thisApp.data.songs = parsedResponse;
                thisApp.initHome();
                thisApp.initSearch();
                thisApp.initDiscover();
            });

        fetch(urlUsers)
            .then(function(rawResponse){
                return rawResponse.json();
            })
            .then(function(parsedResponse){
                thisApp.data.users = parsedResponse;
                thisApp.initLogin();
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
    initJoin: function(){
        const thisApp = this;

        thisApp.joinWrapper = document.querySelector(select.containerOf.joinWrapper);
        thisApp.join = new Join(thisApp.joinWrapper);
    },
    initLogin: function(){
        const thisApp = this;

        thisApp.loginWrapper = document.querySelector(select.containerOf.loginWrapper);
        thisApp.login = new Login(thisApp.loginWrapper, thisApp.data.users);
    },
    setHidden: function(){
        const thisApp = this;

        for(let link of thisApp.loginLinks.children){
            if(link.classList.contains(classNames.links.hidden)){
                link.classList.remove(classNames.links.hidden);
            } else {
                link.classList.add(classNames.links.hidden);
            }
        }
    },
    initUserLogged: function(userName){
        const thisApp = this;

        thisApp.userLogged = true;
        thisApp.setHidden();
        thisApp.userWelcome = thisApp.loginLinks.querySelector(select.nav.userWelcome);
        thisApp.userWelcome.innerHTML = `Hello, ${userName}!`;
    },
    initUserUnlogged: function(){
        const thisApp = this;
        thisApp.userLogged = false;
    },
    init: function(){
        const thisApp = this;
        
        thisApp.initData();
        thisApp.initPages();
        thisApp.initJoin();
    },
};

app.init();

