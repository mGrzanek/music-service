import { select, settings, templates } from './../settings.js';
import SongCategory from './SongCategory.js';

class AddSong {
  constructor(element, data){
    const thisAddSong = this;

    thisAddSong.data = data;
    thisAddSong.render(element);
    thisAddSong.getElements();
    thisAddSong.initCategories();
    thisAddSong.initActions();
  }

  render(element){
    const thisAddSong = this;

    const generatedHtml = templates.addSong();
    thisAddSong.dom = {};
    thisAddSong.dom.wrapper = element;
    thisAddSong.dom.wrapper.innerHTML = generatedHtml;
  }

  getElements(){
    const thisAddSong = this;

    thisAddSong.dom.form = thisAddSong.dom.wrapper.querySelector(select.addSong.form);
    thisAddSong.dom.titleInput = thisAddSong.dom.form.querySelector(select.addSong.title);
    thisAddSong.dom.authorInput = thisAddSong.dom.form.querySelector(select.addSong.author);
    thisAddSong.dom.filePathInput = thisAddSong.dom.form.querySelector(select.addSong.filename);
    thisAddSong.dom.rankingInput = thisAddSong.dom.form.querySelector(select.addSong.ranking);
    thisAddSong.dom.checkboxes = thisAddSong.dom.form.querySelector(select.addSong.checkboxes);
  }

  initCategories(){
    const thisAddSong = this;

    for(let songCategory in thisAddSong.data){
      thisAddSong.songCategory = new SongCategory(thisAddSong.dom.checkboxes, thisAddSong.data[songCategory]);
    }
  }

  initActions(){
    const thisAddSong = this;

    thisAddSong.dom.form.addEventListener('submit', function(event){
      event.preventDefault();
      thisAddSong.addNewSong();
    });
  }

  addNewSong(){
    const thisAddSong = this;

    thisAddSong.dom.categoryInput = thisAddSong.dom.checkboxes.querySelectorAll(select.addSong.category);
    
    const url = `${settings.db.url}/${settings.db.songs}`;

    const payload = {
      title: thisAddSong.dom.titleInput.value,
      author: thisAddSong.dom.authorInput.value,
      filename: thisAddSong.dom.filePathInput.value,
      ranking: thisAddSong.dom.rankingInput.value,
      categories: []
    };

    for(let category of thisAddSong.dom.categoryInput){
      if(category.checked){
        payload.categories.push(category.value);
      }
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    };

    fetch(url, options);
  }
}

export default AddSong;