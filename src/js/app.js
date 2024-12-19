/* eslint-disable indent */
import { select, settings } from './settings.js';
import Song from './components/Song.js';
import Home from './components/Home.js';
import Search from './components/Search.js';

const app = {
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
            });


    }, 
    initSong: function(){
        const thisApp = this;
        console.log('home', thisApp.homeWrapper);
        for(let dataSong in thisApp.data.songs){
            thisApp.songs = new Song(thisApp.homeWrapper, thisApp.data.songs[dataSong]);
        }
    },
    initHome: function(){
        const thisApp = this;
        thisApp.homeWrapper = document.querySelector(select.containerOf.homeWrapper);
        thisApp.home = new Home(thisApp.homeWrapper);
        this.initSong();
    },
    initSearch(){
        const thisApp = this;

        thisApp.searchWrapper = document.querySelector(select.containerOf.searchWrapper);
        thisApp.search = new Search(thisApp.searchWrapper, thisApp.data.songs);
    },
    init: function(){
        const thisApp = this;
        console.log('Welocme to music service!');
        console.log(thisApp);
        //thisApp.initHome();
        thisApp.initData();
    },
};

app.init();

