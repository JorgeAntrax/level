class Listbox {
    constructor(obj) {
        this.id = `#${obj.el}--input`;
        this.props = obj.props || '';
        this.classes = obj.classes || '';
        this.toggleClass = obj.toggleClass || '';
        this.el = document.querySelector(`[data-id="${obj.el}"]`);
        this.list = this.el.querySelector('list .list-container');
        this.el.innerHTML += `<input autocomplete="off" type="text" ${obj.props} name="${obj.name}" id="${obj.el}--input" class="oh-input oh-black ${this.classes}" /><span class="toggleListbox"><span></span></span>`;
        this._call = obj.call || null;
        this.val = '';
        this.origin = '';
        this.name = obj.el;
        this.editable = obj.editable;
        this.init(this.id, this._call);
    }

    static ready() {
      let $__allListbox = document.querySelectorAll('listbox');

      if($__allListbox !== null || $__allListbox !== undefined) {
        window.Listbox = [];

        $__allListbox.forEach($listbox => {
          window.Listbox.push({
            name: $listbox.getAttribute('data-id'),
            input: $listbox.querySelector('input'),
            list: $listbox.querySelector('list'),
            childrens: $listbox.querySelectorAll('list-item')
          });
        });
      }

    }


    init(id, call) {
        setTimeout(()=>{
          Listbox.ready();
        },1000);
        this.watch(id, call);
    }

    // limpia el listbox
    empty($container) {
      let $_default = $container.querySelector('list-item:first-child').cloneNode(true);
      $container.innerHTML = '';
      $container.appendChild($_default);
    }

    // recibe un array del tipo
    /*
      [{
      value: valor,
      text:valor
      }]
    */
    addList($items) {
      let $container = this.el.querySelector(`.list-container`);
      this.empty($container);
      $items.map(($item) => {
        $container.innerHTML += `<list-item origin="${$item.origin}" value="${$item.value}" text="${$item.text}">${$item.text}</list-item>`;
      });
    }

    getId() {
        return this.id;
    }

    getOrigin() {
        return this.origin;
    }

    /* this method added interactivity for component listbox */
    watch(id, callback) {
        let _this = this;
        let $p = document.querySelector(`[data-id='${_this.el.dataset.id}']`);
        let input = document.querySelector(id);
        let list = input.previousElementSibling;
        let listItems = list.querySelectorAll('list-item');
        input.value = listItems[0].hasAttribute('text') ? listItems[0].getAttribute('text') : listItems[0].getAttribute('value');

        input.readOnly = this.editable;
        listItems[0].classList.add('is-active');

        input.addEventListener('focus', function() {
            window.Listbox.forEach($list => {
                if($list.list !== list){
                  $list.list.classList.remove('is-visible');
                }
            });
            list.classList.toggle('is-visible');
        }, false);

        input.addEventListener('keyup', function(e) {
            const $input = e.target;
            const $_value = $input.value.toLowerCase();


            listItems.forEach($sow => {
                    $sow.hidden = false
            });

            listItems.forEach($item => {
                let $option = $item.textContent.toLowerCase();

                if(!$option.includes($_value) || $option.indexOf($_value) == -1){
                    $item.hidden = true
                }else {
                    $item.hidden = false
                }
            });

        }, false);

        input.addEventListener('change', (e) => {
            this.val = e.target.value;
            list.classList.toggle('is-visible');
        }, false);

        let toggle = input.nextElementSibling;

        toggle.addEventListener('click', function() {

          window.Listbox.forEach($list => {
              if($list.list !== list){
                $list.list.classList.remove('is-visible');
              }
          });
          list.classList.toggle('is-visible');
        }, false);

        let activo;


        $p.addEventListener('click', event => {
          const el = event.target.localName;
          const $__current = event.target;
          // console.log(el);
          if(el == 'list-item'){
            let $items = this.siblings($__current);
            this.origin = $__current.getAttribute('origin');
            // console.log($items);

            for (let j = 0; j < $items.length; j++) {
                const $__siblings = $items[j];
                if ($__siblings.classList.contains('is-active')) {
                    $__siblings.classList.remove('is-active');
                }
            }

            $__current.classList.add('is-active');
            activo = $__current;
            list.classList.remove('is-visible');
            _this.update(input, activo);
            _this.clear = true;
            if(callback != null) {
                callback.call(this);
            }
          }
        },false);

    }

    update(input, activo) {
        input.value = activo.getAttribute('text').firstUpperCase();
        input.setAttribute('origin', activo.getAttribute('origin'));
        this.val = input.value;
        if(this.toggleClass !== ''){
          let $classes = this.toggleClass.split(' ');
          for(let $i = 0; $i < $classes.length; $i++){
            input.classList.add($classes[$i]);
          }
        }
    }

    getVal() {
        return this.val;
    }

    prevSiblings(target) {
        var siblings = [];
        var n = target;
        if (n !== null && n !== undefined && n + '' !== '') {
            while (n = n.previousElementSibling) {
                siblings.push(n);
            }
            return siblings;
        }
        else {
            return siblings;
        }
    }
    // select all next elements siblings
    /* @param element - type: DOM objet */
    nextSiblings(target) {
        var siblings = [];
        var n = target;
        if (n !== null && n !== undefined && n + '' !== '') {
            while (n = n.nextElementSibling) {
                siblings.push(n);
            }
            return siblings;
        }
        else {
            return siblings;
        }
    }
    // save all previous and next elements siblings in array objet
    /* @param element - type: DOM objet */
    siblings(target) {
        var previus = this.prevSiblings(target) || [], next = this.nextSiblings(target) || [];
        return previus.concat(next);
    }


}
