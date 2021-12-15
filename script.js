class Game {
  constructor(options) {
    this.container = document.querySelector(options.container);
    this.countItems = options.items;
    this.createElements();
    this.handlers();
    this.checkWin = this.checkWin.bind(this);
    this.counter = 0
  }

  createElements() {
    this.itemsArr = []

    this.btn = this.createDomElement('button', null, 'Start');
    this.items = this.createDomElement('div', {class: 'items'}, '');
    for(let i = 0; i < this.countItems; i++) {
      this.item = this.createDomElement('div', null, '');
      this.itemsArr.push(this.item)
      this.items.append(this.item)
    }
    this.output = this.createDomElement('div', {class: 'output'}, 'READY?');
    this.score = this.createDomElement('div', {class: 'score'}, 0);
    this.container.append(this.btn, this.items, this.output, this.score)
  }

  handlers() {
    this.btn.addEventListener('click', this.startGame.bind(this));
  }

  startGame() {
    let uniqNum = [];

    while(uniqNum.length < this.countItems){
      const num = this.randomNumber()
      if(uniqNum.indexOf(num) === -1) uniqNum.push(num);
    }

    this.itemsArr.map((item, index) => {
      item.className = 'item';
      item.innerHTML = uniqNum[index];
      item.addEventListener('click', this.checkWin);
    });
  }

  checkScore() {
    if(this.counter < -4) {
      alert('YOU LOSE')
      this.counter = 0
      this.score.innerHTML = this.counter
    } else if(this.counter > 4){
      alert('YOU WON')
      this.counter = 0
      this.score.innerHTML = this.counter
    }
  }

  checkWin() {

    const winItem = this.randomNumber();

    if(+event.target.innerText === winItem){
      this.output.innerHTML = 'WIN'
      this.score.innerHTML = ++this.counter
      this.checkScore();
    }else{
      this.output.innerHTML = 'LOSE'
      this.score.innerHTML = --this.counter
      this.checkScore();
    }
    this.item.removeEventListener('click', this.checkWin);
    this.startGame()
  }

  randomNumber() {
    return Math.floor(Math.random() * this.countItems) + 1;
  }

  createDomElement(tag,options,content) {
    const elem = document.createElement(tag);

    for(let atr in options) {
      const value = options[atr];
      elem.setAttribute(atr, value);
    }

    if (!Array.isArray(content)) {
      content = [content];
    }

    content.forEach(child => elem.append(child));

    return elem;
  }
}

const game = new Game({
  container: '.game',
  items: 3
})