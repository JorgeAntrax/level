/* módules and components saved in variables */

let acordeon = document.querySelectorAll('acordeon');
let body = document.querySelector('body');
let head = document.querySelector('head');
let close_button = document.querySelectorAll('close');
let checkbox = document.querySelectorAll('checkbox');
let dropdown = document.querySelectorAll('dropdown');
let dropmenu = document.querySelectorAll('dropmenu');
let form_color = document.querySelectorAll('color');
let radio = document.querySelectorAll('radio');
let fab = document.querySelectorAll('fab');
let fabmenu = document.querySelectorAll('fabmenu');
let navbar = document.querySelectorAll('navbar');
let modal = document.querySelectorAll('[modal]');
let process_bar = document.querySelectorAll('process');
let range = document.querySelectorAll('range');
let slideshow = document.querySelectorAll('slideshow');
let tabs = document.querySelectorAll('tabs');
let tabsContent = document.querySelectorAll('tabs-content');
let toggle_button = document.querySelectorAll('toggle');

// initializes dynamic components
init('checkbox');
init('radio');
init('toggle');
init('process');
init('color');
init('logo');
init('range');

/* ================== Import system CSS ==================== */

let includeCSS = body.getAttribute('km-include'); //get attribute km-include
const PATH_URL = '//cdn.jsdelivr.net/npm/kimera@0.4.4/css/'; // path CDN

if (includeCSS != undefined) {
    includeCSS = ('base ' + includeCSS).split(' ');
    let haskimera = validateArray(includeCSS, 'kimera');
    let url_include;

    if (haskimera) {
        url_include = PATH_URL + 'kimera.min.css'; // url to file base.min.css
        head.appendChild(createLink(url_include));
    } else {
        for (let i = 0; i < includeCSS.length; i++) {
            url_include = PATH_URL + includeCSS[i] + '.min.css';
            head.appendChild(createLink(url_include));
        }
    }
}

// hide a element
/* @param el: DOM element, classContain:  */
function hideSelector(el, classContain) {
    if (el.length > 0) {
        for (let i = 0; i < el.length; i++) {
									let element = el[i];
            if (element.classList.contains(classContain)) {
                element.classList.remove(classContain);
            }
        }
    }
}

document.querySelector('body').onclick = function() {
    hideSelector(dropmenu, 'is-visible');
    hideSelector(fab, 'is-visible');
};

/* ================== FAB button event listener ===================== */

if (fab.length > 0) {
    for (let i = 0; i < fab.length; i++) {
        onEventListener(fab[i].querySelector('.is-toggle-fab'), 'click', showToggle);
    }
}

/* =============== Dropdown event listener ==================== */

if (dropdown.length > 0) {
    for (let i = 0; i < dropdown.length; i++) {
        onEventListener(dropdown[i].querySelector('.is-toggle-dropdown'), 'click', showToggle);
    }
}

/* ====================== Js modal with custom atribute ========================= */

if (modal.length > 0) {
    for (let i = 0; i < modal.length; i++) {
        onEventListener(modal[i], 'click', modalToggle);

        function modalToggle() {
            let modalId = this.getAttribute('modal');
            let el = document.querySelector(modalId);
            let modalClass = ['is-zoom-in', 'is-slide-up', 'is-slide-down'];
            let modalClassSub = ['zoom-in', 'slide-up', 'slide-down'];

            for (let j = 0; j < modalClass.length; j++) {
                if (el.classList.contains(modalClass[j])) el.classList.toggle(modalClassSub[j]);
            }
            el.classList.toggle('is-visible');
        }
    }
}

/* =================== Navbar Js ======================= */

if (navbar.length > 0) {
    let el = document.querySelectorAll('.is-toggle-navbar');
    for (let i = 0; i < el.length; i++) {
        onEventListener(el[i], 'click', navToggle);
    }

    function navToggle() {
        this.parentNode.parentElement.querySelector('navmenu').classList.toggle('is-visible');
    }
}

/* =================== Js acordeon ===================== */

if (acordeon.length > 0) {
    let acordeonItem = document.querySelectorAll('acordeon-item');
    for (let i = 0; i < acordeonItem.length; i++) {
        onEventListener(acordeonItem[i], 'click', acordeonToggle);
    }

				/* shows, hides, and controls behavior module accordion */
    function acordeonToggle() {
        let contentAcordeon = this.parentNode.querySelectorAll('content');
        if (this.parentNode.hasAttribute('is-multiple')) {
            this.nextElementSibling.classList.toggle('is-visible');
        } else {
            for (let i = 0; i < contentAcordeon.length; i++) {
                contentAcordeon[i].classList.remove('is-visible');
            }
            this.nextElementSibling.classList.toggle('is-visible');
        }
    }
}

/* ======================== range =========================== */

/*
role initializes a elment type renage
@param el: The parent element <range></range> selected
*/
function initRange(el) {
    let input = el.querySelector('input'),
        label = el.querySelector('label'),
        position = parseInt(window.getComputedStyle(input, null).getPropertyValue('width')) / 100;

    label.style.left = ((input.value * position) - 10) + 'px';
    label.textContent = input.value;

				onEventListener(input, 'input mousedown', updateRange);

				/* update position the label floating, and the value of the element type range */
    function updateRange() {
        let position = parseInt(window.getComputedStyle(this, null).getPropertyValue('width')) / 100;
        this.nextElementSibling.style.left = ((this.value * position) - 10) + 'px';
        this.nextElementSibling.textContent = this.value;
    }
}

/* ====================== Tabs ========================== */

for (let i = 0; i < tabs.length; i++) {
    tabs[i].firstElementChild.classList.add("is-active");
}
for (let i = 0; i < tabsContent.length; i++) {
    tabsContent[i].firstElementChild.classList.add("is-active");
}

let tab = document.querySelectorAll('tab');
for (let i = 0; i < tab.length; i++) {
    onEventListener(tab[i], 'click', tabToggle);

    function tabToggle() {
        removeClass(siblings(this), 'is-active');
        this.classList.add("is-active");
        showContentTab(this.getAttribute('data-id'));
    }
}

/*
function that adds class is-visible to the container with id
@param id: the id container to show
*/
function showContentTab(id) {
    if (id !== null) {
        let siblingsId = siblings(document.querySelector(id));
        removeClass(siblingsId, 'is-active');
        document.querySelector(id).classList.add('is-active');
    }
}

/* =============== Slideshow ================ */

/*if (slideshow.length > 0) {
    for (let i = 0; i < slideshow.length; i++) {
        let nextSlider = slideshow[i].querySelector('.next-slide');
        let previuSlider = slideshow[i].querySelector('.previus-slide');
        let intervalSlide = slideshow[i].getAttribute('interval') || 5000;
        let slider = slideshow[i].querySelectorAll('slider');
        let ctrl = 0;

        slider[0].classList.add('is-visible');
        for (let h = 0; h < slider.length; h++) {
            let sliderImg = slider[h].getAttribute('src');
            let sliderAlt = slider[h].getAttribute('alt');
            let img = document.createElement('img');
            img.setAttribute('src', sliderImg);
            img.setAttribute('alt', sliderAlt);
            slider[h].appendChild(img);
            removeAttr(slider[h], 'src alt');
        }

        onEventListener(nextSlider, 'click', function() {
            if (ctrl === slider.length - 1) ctrl = -1;
            controlSlide(1);
        });

        onEventListener(previuSlider, 'click', function() {
            if (ctrl === 0) ctrl = slider.length;
            controlSlide(-1);
        });

        if (slideshow[i].hasAttribute('autoplay')) {
            setInterval(controlSlide(1), intervalSlide);
        }

        function controlSlide(c) {
            clearSlides();
            if (c > 0) {
                ctrl++;
                slider[ctrl].classList.add('is-visible');
            } else {
                ctrl--;
                slider[ctrl].classList.add('is-visible');
            }
        }

        function clearSlides() {
            for (let i = 0; i < slider.length; i++) {
                slider[i].classList.remove('is-visible');
            }
        }
    }
}*/

/*
initialized function for dinamic components.
@params
Supported components {checkbox, radio, color, process, toggle, range, logo}
type: string
*/
function init(component) {
    let element = document.querySelectorAll(component);

    for (let i = 0; i < element.length; i++) {
        let currentElement = element[i],
            id = currentElement.id;
        text = currentElement.getAttribute('text'),
            check = currentElement.getAttribute('checked'),
            require = currentElement.getAttribute('required'),
            form = currentElement.getAttribute('form'),
            name = currentElement.getAttribute('name'),
            value = currentElement.getAttribute('value');

        switch (component) {
            case 'checkbox':
            case 'radio':
																currentElement.innerHTML =
																`<input type="${component}"
																${id ? ' id="' + id + '"' : ''}
																${form ? ' form="' + form + '"' : ''}
																${name ? ' name="' + name + '"' : ''}
																${check ? check : ''}
																${ require ? require : ''}/><label
																${id ? ' for="' + id + '"' : ''}>
																${text ? text : ''}
																</label>`;
                break;
            case 'color':
                currentElement.innerHTML = '<input type="color"' + (id ? 'id="' + id + '"' : '') + (value ? 'value="' + value + '"' : '') + '/>';
                break;
            case 'process':
                currentElement.innerHTML = '<complete ' + (value ? 'value="' + value + '"' : '') + '></complete>';
                currentElement.querySelector('complete').style.width = currentElement.getAttribute('value');
                break;
            case 'toggle':
                currentElement.innerHTML = '<input type="checkbox"' + (id ? ' id="' + id + '"' : '') + (form ? ' form="' + form + '"' : '') + (name ? ' name="' + name + '"' : '') + (check ? check : '') + ' ' + (require ? require : '') + '/><label' + (id ? ' for="' + id + '"' : '') + '></label>';
                break;
            case 'logo':
                let value_src = currentElement.getAttribute('src');
                currentElement.innerHTML = '<img ' + (value_src ? 'src="' + value_src + '"' : '') + '/>' + (text ? '<span>' + text + '</span>' : '');
                break;
            case 'range':
                let min = currentElement.getAttribute('min'),
                    max = currentElement.getAttribute('max'),
                    step = currentElement.getAttribute('step');
                currentElement.innerHTML = '<input type="' + component + '"' + (id ? ' id="' + id + '"' : '') + (min ? ' min="' + min + '"' : '') + (max ? ' max="' + max + '"' : '') + (step ? ' step="' + step + '"' : '') + '/><label' + (id ? ' for="' + id + '"' : '') + (value ? 'value="' + value + '"' : '') + '></label>';
                initRange(currentElement);
                break;
            default:
                break;
        }
        removeAttr(currentElement, 'id text form name value checked required src min max step');
    }
}

/*
create link element
@param
url: Dynamic URL for import system
type: string
*/
function createLink(url) {
    let link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', url);
    return link;
}

// multiple Add event listeners (element, events, function)
/* 
@param
el: element ej. button, link, etc.
events: string events ej. ('click load keyup') or ('click')
function function(){...}
*/
function onEventListener(el, events, func) {
    events = events.split(' ');
    if (events.length > 1) {
        for (let i = 0; i < events.length; i++) {
            el.addEventListener(events[i], func, false);
        }
    } else {
        el.addEventListener(events, func, false);
    }
}

/* 
function that valid a value within an array, and return true
@params
array: collection of data to be scanned
value: value to look for in the array
*/
function validateArray(array, value) {
    for (let i = 0; i <= array.length; i++) {
        let element = array[i];
        if (element === value) {
            return true;
        } else {
            return false;
        }
    }
}

// remove class for array
/* 
@params
array: collection of data to travel
target: class to remove
*/
function removeClass(array, target) {
    if (array.length > 0) {
        for (let i = 0; i < array.length; i++) {
            let element = array[i];
            if (element.classList.contains(target)) {
                element.classList.remove(target);
            }
        }
    }
}

/*
Function tha removes multiple attributes to an element.
@params
element: the objet DOM selected;
Array: string - List of attributes separated by space ej. 'id class value required'
*/
function removeAttr(el, array) {
    array = array.split(' ');
    for (let i = 0; i < array.length; i++) {
        let element = array[i];
        if (el.hasAttribute(element)) {
            el.removeAttribute(element);
        }
    }
}

// select all previous elements siblings
/* @param element - type: DOM objet */
function prevSiblings(target) {
    let siblings = [],
        n = target;
    if (n !== null && n !== undefined && n !== '') {
        while (n = n.previousElementSibling) {
            siblings.push(n);
        }
        return siblings;
    } else {
        return siblings;
    }
}

// select all next elements siblings
/* @param element - type: DOM objet */
function nextSiblings(target) {
    let siblings = [],
        n = target;
    if (n !== null && n !== undefined && n !== '') {
        while (n = n.nextElementSibling) {
            siblings.push(n);
        }
        return siblings;
    } else {
        return siblings;
    }
}

// save all previous and next elements siblings in array objet
/* @param element - type: DOM objet */
function siblings(target) {
    let previus = prevSiblings(target) || [],
        next = nextSiblings(target) || [];
    return previus.concat(next);
}

// fab, dropdown event listener
function showToggle(e) {
    e.stopPropagation();
    this.nextElementSibling.classList.toggle('is-visible');
}