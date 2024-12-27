/* eslint-disable indent */
import { classNames, select, settings } from './settings.js';
import Home from './components/Home.js';
import Search from './components/Search.js';
import Discover from './components/Discover.js';
import Registration from './components/Registration.js';

const app = {
    initPages: function(){
        const thisApp = this;

        thisApp.pages = document.querySelector(select.containerOf.pagesWrapper).children;
        thisApp.navLinks = document.querySelector(select.nav.links);
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
    initRegistration: function(){
        const thisApp = this;

        thisApp.registrationWrapper = document.querySelector(select.containerOf.registrationWrapper);
        thisApp.registration = new Registration(thisApp.registrationWrapper);
    },
    init: function(){
        const thisApp = this;
        
        thisApp.initData();
        thisApp.initPages();
        thisApp.initRegistration();
    },
};

app.init();

