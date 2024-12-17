/* eslint-disable indent */
import { settings } from './settings.js';
import Song from './components/Song.js';

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
                console.log('data songs: ', parsedResponse);
                thisApp.data.songs = parsedResponse;
                thisApp.initSong();
            });


    }, 
    initSong: function(){
        const thisApp = this;

        for(let dataSong in thisApp.data.songs){
            thisApp.songs = new Song(thisApp.data.songs[dataSong]);
        }
    },
    init: function(){
        const thisApp = this;
        console.log('Welocme to music service!');
        console.log(thisApp);
        thisApp.initData();
    },
};

app.init();

