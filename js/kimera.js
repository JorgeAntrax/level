/* modules and components saved in variables */
var acordeon = document.querySelectorAll('acordeon');
var body = document.querySelector('body');
var head = document.querySelector('head');
var checkbox = document.querySelectorAll('checkbox');
var dropdown = document.querySelectorAll('dropdown');
var dropmenu = document.querySelectorAll('dropmenu');
var radio = document.querySelectorAll('radio');
var fab = document.querySelectorAll('fab');
//let fabmenu: NodeListOf<Element> = document.querySelectorAll('fabmenu');
var navbar = document.querySelectorAll('navbar');
var modal = document.querySelectorAll('[modal]');
var range = document.querySelectorAll('range');
// let slideshow: NodeListOf<Element> = document.querySelectorAll('slideshow');
var tabs = document.querySelectorAll('tabs');
var tabsContent = document.querySelectorAll('tabs-content');
// initializes dynamic components
init('checkbox');
init('radio');
init('toggle');
init('process');
init('color');
init('logo');
init('range');
/* ================== Import system CSS ==================== */
var kmInclude = body.getAttribute('km-include'); //get attribute km-include
var PATH_URL = '//cdn.jsdelivr.net/npm/kimera@0.4.6/css/'; // path CDN
var includeCSS;
if (kmInclude) {
    includeCSS = ("base " + kmInclude).split(' ');
    var hasKimera = validateArray(includeCSS, 'kimera');
    var url_include = void 0;
    if (hasKimera) {
        url_include = PATH_URL + "kimera.min.css"; // url to file base.min.css
        head.appendChild(createLink(url_include));
    }
    else {
        for (var i = 0; i < includeCSS.length; i++) {
            url_include = "" + PATH_URL + includeCSS[i] + ".min.css";
            head.appendChild(createLink(url_include));
        }
    }
}
/* hides an element.
@param el: DOM element, classContain: class of the element */
function hideSelector(el, classContain) {
    if (el.length > 0) {
        for (var i = 0; i < el.length; i++) {
            var element = el[i];
            if (element.classList.contains(classContain)) {
                element.classList.remove(classContain);
            }
        }
    }
}
document.querySelector('body').onclick = function () {
    hideSelector(dropmenu, 'is-visible');
    hideSelector(fab, 'is-visible');
};
/* ================== FAB button event listener ===================== */
if (fab.length > 0) {
    for (var i = 0; i < fab.length; i++) {
        onEventListener(fab[i].querySelector('.is-toggle-fab'), 'click', showToggle);
    }
}
/* =============== Dropdown event listener ==================== */
if (dropdown.length > 0) {
    for (var i = 0; i < dropdown.length; i++) {
        onEventListener(dropdown[i].querySelector('.is-toggle-dropdown'), 'click', showToggle);
    }
}
/* ====================== Js modal with custom atribute ========================= */
if (modal.length > 0) {
    for (var i = 0; i < modal.length; i++) {
        onEventListener(modal[i], 'click', modalToggle);
        function modalToggle() {
            var modalId = this.getAttribute('modal');
            var el = document.querySelector(modalId);
            var modalClass = ['is-zoom-in', 'is-slide-up', 'is-slide-down'];
            var modalClassSub = ['zoom-in', 'slide-up', 'slide-down'];
            for (var j = 0; j < modalClass.length; j++) {
                if (el.classList.contains(modalClass[j]))
                    el.classList.toggle(modalClassSub[j]);
            }
            el.classList.toggle('is-visible');
        }
    }
}
/* =================== Navbar Js ======================= */
if (navbar.length > 0) {
    var el = document.querySelectorAll('.is-toggle-navbar');
    for (var i = 0; i < el.length; i++) {
        onEventListener(el[i], 'click', navToggle);
    }
    function navToggle() {
        this.parentNode.parentElement.querySelector('navmenu').classList.toggle('is-visible');
    }
}
/* =================== Js acordeon ===================== */
if (acordeon.length > 0) {
    var acordeonItem = document.querySelectorAll('acordeon-item');
    for (var i = 0; i < acordeonItem.length; i++) {
        onEventListener(acordeonItem[i], 'click', acordeonToggle);
    }
    /* shows, hides, and controls behavior module accordion */
    function acordeonToggle() {
        var contentAcordeon = this.parentNode.querySelectorAll('content');
        if (this.parentNode.hasAttribute('is-multiple')) {
            this.nextElementSibling.classList.toggle('is-visible');
        }
        else {
            for (var i = 0; i < contentAcordeon.length; i++) {
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
    var input = el.querySelector('input'), label = el.querySelector('label'), position = parseInt(window.getComputedStyle(input, null).getPropertyValue('width')) / 100;
    label.style.left = ((parseInt(input.value) * position) - 10) + "px";
    label.textContent = input.value;
    onEventListener(input, 'input mousedown', updateRange);
    /* update position the label floating, and the value of the element type range */
    function updateRange() {
        var position = parseInt(window.getComputedStyle(this, null).getPropertyValue('width')) / 100;
        this.nextElementSibling.style.left = ((this.value * position) - 10) + 'px';
        this.nextElementSibling.textContent = this.value;
    }
}
/* ====================== Tabs ========================== */
for (var i = 0; i < tabs.length; i++) {
    tabs[i].firstElementChild.classList.add("is-active");
}
for (var i = 0; i < tabsContent.length; i++) {
    tabsContent[i].firstElementChild.classList.add("is-active");
}
var tab = document.querySelectorAll('tab');
for (var i = 0; i < tab.length; i++) {
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
        var siblingsId = siblings(document.querySelector(id));
        removeClass(siblingsId, 'is-active');
        document.querySelector(id).classList.add('is-active');
    }
}
/*
initialized function for dinamic components.
@params
Supported components {checkbox, radio, color, process, toggle, range, logo}
type: string
*/
function init(component) {
    var element = document.querySelectorAll(component);
    for (var i = 0; i < element.length; i++) {
        var currentElement = element[i];
        var id = currentElement.id;
        var text = currentElement.getAttribute('text');
        var check = currentElement.getAttribute('checked');
        var require_1 = currentElement.getAttribute('required');
        var form = currentElement.getAttribute('form');
        var name_1 = currentElement.getAttribute('name');
        var value = currentElement.getAttribute('value');
        switch (component) {
            case 'checkbox':
            case 'radio':
                currentElement.innerHTML =
                    "<input type=\"" + component + "\"" + (id ? ' id="' + id + '"' : '') + (value ? ' value="' + value + '"' : '') + (form ? ' form="' + form + '"' : '') + (name_1 ? ' name="' + name_1 + '"' : '') + (check ? check : '') + (require_1 ? require_1 : '') + "/><label " + (id ? ' for="' + id + '"' : '') + ">" + (text ? text : '') + "</label>";
                break;
            case 'color':
                currentElement.innerHTML = '<input type="color"' + (id ? 'id="' + id + '"' : '') + (value ? 'value="' + value + '"' : '') + '/>';
                break;
            case 'process':
                currentElement.innerHTML = '<complete ' + (value ? 'value="' + value + '"' : '') + '></complete>';
                var querySelector = currentElement.querySelector('complete');
                querySelector.style.width = currentElement.getAttribute('value');
                break;
            case 'toggle':
                currentElement.innerHTML = '<input type="checkbox"' + (id ? ' id="' + id + '"' : '') + (form ? ' form="' + form + '"' : '') + (name_1 ? ' name="' + name_1 + '"' : '') + (check ? check : '') + ' ' + (require_1 ? require_1 : '') + '/><label' + (id ? ' for="' + id + '"' : '') + '></label>';
                break;
            case 'logo':
                var value_src = currentElement.getAttribute('src');
                currentElement.innerHTML = '<img ' + (value_src ? 'src="' + value_src + '"' : '') + '/>' + (text ? '<span>' + text + '</span>' : '');
                break;
            case 'range':
                var min = currentElement.getAttribute('min'), max = currentElement.getAttribute('max'), step = currentElement.getAttribute('step');
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
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', url);
    // link.rel = 'stylesheet';
    // link.href = url;
    return link;
}
// multiple Add event listeners (element, events, function)
/*
@param
el: element ej. button, link, etc.
events: string events ej. ('click load keyup') or ('click')
function function(){...}
*/
function onEventListener(el, eventsStr, func) {
    var events = eventsStr.split(' ');
    if (events.length > 1) {
        for (var i = 0; i < events.length; i++) {
            el.addEventListener(events[i], func, false);
        }
    }
    else {
        el.addEventListener(events[0], func, false);
    }
}
/*
function that valid a value within an array, and return true
@params
array: collection of data to be scanned
value: value to look for in the array
*/
function validateArray(array, value) {
    return array.indexOf(value) !== -1;
}
// remove class for array
/*
@params
array: collection of data to travel
target: class to remove
*/
function removeClass(array, target) {
    if (array.length > 0) {
        for (var i = 0; i < array.length; i++) {
            var element = array[i];
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
function removeAttr(el, attr) {
    var array = attr.split(' ');
    for (var i = 0; i < array.length; i++) {
        var element = array[i];
        if (el.hasAttribute(element)) {
            el.removeAttribute(element);
        }
    }
}
// select all previous elements siblings
/* @param element - type: DOM objet */
function prevSiblings(target) {
    var siblings = [], n = target;
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
function nextSiblings(target) {
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
function siblings(target) {
    var previus = prevSiblings(target) || [], next = nextSiblings(target) || [];
    return previus.concat(next);
}
/**fab, dropdown event listener*/
function showToggle(e) {
    e.stopPropagation();
    this.nextElementSibling.classList.toggle('is-visible');
}
/* Class for the listbox component */
var Listbox = /** @class */ (function () {
    /** Construct function
     * @params obj: array object
     {
            el: the id container component.
            hasTwoIcons: true or false -> this property add padding-left to the input element.
            iconToggleClass: 'fa fa-caret-down', // classes for icon toggle.
            iconLabelClass: 'fa fa-lock', //classes for icon left component.
            rounded: true // this property apply the class is-rounded for the input element
            name: //the name for the input element
            id: //id for the input element
    } */
    function Listbox(obj) {
        this.el = document.querySelector(obj.el);
        this.el.innerHTML += "<input " + (obj.name ? "name=\"" + obj.name + "\"" : '') + " " + (obj.id ? "id=\"" + obj.id + "\"" : '') + " type=\"text\" class=\"input " + (obj.rounded ? 'is-rounded' : '') + " " + (obj.hasTwoIcons ? 'padding-l-2' : '') + "\">\n\t\t\t\t<icon class=\"is-toggle-listbox\"><i class=\"" + obj.iconToggleClass + "\"></i></icon>\n\t\t\t\t" + (obj.iconLabelClass ? "<icon class=\"listbox-icon\"><i class=\"" + obj.iconLabelClass + "\"></i></icon>" : '');
        this.init();
    }
    /* the iit method, add the listeners for input and toggle icon elements */
    Listbox.prototype.init = function () {
        this.watch();
    };
    /* this method added interactivity for component listbox */
    Listbox.prototype.watch = function () {
        var _this = this;
        var input = this.el.querySelector('.input');
        var list = this.el.querySelector('list');
        var listItems = list.querySelectorAll('list-item');
        input.value = listItems[0].getAttribute('text');
        input.readOnly = true;
        listItems[0].classList.add('is-active');
        input.addEventListener('click', function () {
            list.classList.toggle('is-visible');
        }, false);
        var toggle = this.el.querySelector('.is-toggle-listbox');
        toggle.addEventListener('click', function () {
            list.classList.toggle('is-visible');
        }, false);
        var activo = 0;
        listItems.forEach(function (item) {
            item.addEventListener('click', function () {
                listItems.forEach(function (el) {
                    el.classList.remove('is-active');
                });
                item.classList.add('is-active');
                activo = item;
                list.classList.remove('is-visible');
                _this.update(input, activo);
            }, false);
        });
    };
    /** this method update the value property in the input element
     *
     * @param input the input element selected in DOM
     * @param activo the list-item element with class is-active */
    Listbox.prototype.update = function (input, activo) {
        input.value = activo.getAttribute('text');
    };
    return Listbox;
}());
