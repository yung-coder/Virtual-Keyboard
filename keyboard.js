const Keyboard = {
  elements: {
    main: null,
    keysContanier: null,
    keys: [],
  },

  eventHandelers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    value: "",
    capslock: false,
  },

  init() {
    this.elements.main = document.createElement("div");
    this.elements.keysContanier = document.createElement("div");

    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContanier.classList.add("keyboard__keys");
    this.elements.keysContanier.appendChild(this._createKeys());
 
    this.elements.keys = this.elements.keysContanier.querySelectorAll(".keyboard__key");

    this.elements.main.appendChild(this.elements.keysContanier);
    document.body.appendChild(this.elements.main);


    document.querySelectorAll('.use-keyboard-input').forEach(element => {
        element.addEventListener('focus' , () => {
            this.open(element.value , currentvalue => {
                element.value = currentvalue;
            })
        })
    })
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace" , "del",

        "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",

        "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",

        "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",

        "space"
    ];
    
    const creatIconHTML = (icon_name) => {
        return `<i class='material-icons'>${icon_name}</i>`;
    };

    keyLayout.forEach(key => {
        const KeyElement = document.createElement('button');
        const innsertLineBreak = ['backspace', 'p' , 'enter', '?'].indexOf(key) !== -1;

        KeyElement.setAttribute('type', 'button');
        KeyElement.classList.add('keyboard__key');

        switch(key) {
            case "backspace":
                KeyElement.classList.add("keyboard__key--wide");
                KeyElement.innerHTML  = creatIconHTML('backspace');

                KeyElement.addEventListener('click' , () => {
                    this.properties.value = this.properties.value.substring(0, this.properties.value.length -1);
                    this._triggerEvent("oninput");
                })
                break;

            case "caps": 
               KeyElement.classList.add("keyboard__key--wide", "keyboard__key--activatble" );
               KeyElement.innerHTML  = creatIconHTML('keyboard_capslock');

               KeyElement.addEventListener('click' , () => {
                this._toogleCapsLock();
                KeyElement.classList.toggle('keyboard__key--active' , this.properties.capslock);
            });

            break;

            case "enter": 
               KeyElement.classList.add("keyboard__key--wide");
               KeyElement.innerHTML  = creatIconHTML('keyboard_return');

               KeyElement.addEventListener('click' , () => {
                this.properties.value += '\n';
                this._triggerEvent('oninput');
            });

            break;

            case "space": 
               KeyElement.classList.add("keyboard__key--extra-wide");
               KeyElement.innerHTML  = creatIconHTML('space_bar');

               KeyElement.addEventListener('click' , () => {
                this.properties.value += ' ';
                this._triggerEvent('oninput');
            });

            break;


            case "done": 
               KeyElement.classList.add("keyboard__key--wide", 'keyboard__key--dark');
               KeyElement.innerHTML  = creatIconHTML('check_circle');

               KeyElement.addEventListener('click' , () => {
                this.close();
                this._triggerEvent('onclose');
            });

            break;

            case "del": 
               KeyElement.classList.add("keyboard__key--wide");
               KeyElement.innerHTML  = creatIconHTML('delete');

               KeyElement.addEventListener('click' , () => {
                 this.properties.value = ' ';
                 this._triggerEvent("oninput");
            });

            break;

            default:
                KeyElement.textContent = key.toLocaleLowerCase();



                KeyElement.addEventListener('click' , () => {
                    this.properties.value += this.properties.capslock ? key.toUpperCase() : key.toLowerCase();
                    this._triggerEvent('oninput')
                })

        }

        fragment.appendChild(KeyElement);

        if(innsertLineBreak){
            fragment.appendChild(document.createElement('br'));
        }
    })

    return fragment;
  },

  _triggerEvent(handelerName) {
      if(typeof this.eventHandelers[handelerName] == 'function'){
         this.eventHandelers[handelerName](this.properties.value);
      }
  },

  _toogleCapsLock() {
    this.properties.capslock = !this.properties.capslock;


    for(const key of this.elements.keys){
        if(key.childElementCount === 0){
            key.textContent = this.properties.capslock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
        }
    }
  },

  open(initialvalue, oninput, onclose) {
    this.properties.value = initialvalue || "";
    this.eventHandelers.oninput = oninput;
    this.eventHandelers.onclose = onclose;
    this.elements.main.classList.remove('keyboard--hidden');
  },

  close() {
    this.properties.value = '';
    this.eventHandelers.oninput = oninput;
    this.eventHandelers.onclose = onclose;
    this.elements.main.classList.add('keyboard--hidden');
  },
};

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});