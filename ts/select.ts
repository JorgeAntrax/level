/* Class for the listbox component */
/* @params obj: array object
{
			 el: the id container component.
			 hasTwoIcons: true or false -> this property add padding-left to the input element.
			 iconToggleClass: 'fa fa-caret-down', // classes for icon toggle.
			 iconLabelClass: 'fa fa-lock', //classes for icon left component.
			 rounded: true // this property apply the class is-rounded for the input element
			 name: //the name for the input element
			 id: //id for the input element
} */
class Listbox {
    el: Element;
    constructor(obj: any) {
        this.el = document.querySelector(obj.el);
        this.el.innerHTML += `<input ${obj.name ? `name="${obj.name}"` : ''} ${obj.id ? `id="${obj.id}"` : ''} type="text" class="input${obj.rounded ? ' is-rounded' : ''}${obj.hasTwoIcons ? ' padding-l-2' : ''}">
				<icon class="is-toggle-listbox"><i class="${obj.iconToggleClass}"></i></icon>
				${obj.iconLabelClass ? `<icon class="listbox-icon"><i class="${obj.iconLabelClass}"></i></icon>` : ''}`;
        this.init();
    }

    /* the iit method, add the listeners for input and toggle icon elements */

    init() {
        this.watch();
    }

    /* this method added interactivity for component listbox */
    watch() {
        let input: HTMLInputElement = this.el.querySelector('.input');
        let list: Element = this.el.querySelector('list');
		let listItems = this.el.querySelectorAll('list-item');
		
		input.value = listItems[0].hasAttribute('text') ? listItems[0].getAttribute('text') : listItems[0].getAttribute('value');
        input.readOnly = true;

        listItems[0].classList.add('is-active');
        input.addEventListener('click', () => {
            list.classList.toggle('is-visible');
        }, false);

        let toggle: HTMLInputElement = this.el.querySelector('.is-toggle-listbox');

        toggle.addEventListener('click', () => {
            list.classList.toggle('is-visible');
        }, false);

		let activo: Element;

		for (let i = 0; i < listItems.length; i++) {
			listItems[i].addEventListener('click', () => {
				for (let j = 0;j < listItems.length; j++) {
					if(listItems[j].classList.contains('is-active')) {
						listItems[j].classList.remove('is-active');
					}
				}

				listItems[i].classList.add('is-active');
				activo = listItems[i];
				list.classList.remove('is-visible');
				this.update(input, activo);
			}, false);
		}	
    }

    /* * this method update the value property in the input element
     *
     * @param input the input element selected in DOM
     * @param activo the list-item element with class is-active */
    update(input: HTMLInputElement, activo: any) {
        input.value = activo.getAttribute('text');
    }
}
