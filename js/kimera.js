// funcion init que inicializar algunos compoenentes dinamicos

function init(component) {
    var element = document.querySelectorAll(component);

    for (var i = 0; i < element.length; i++) {
        var id = element[i].getAttribute('id'),
            text = element[i].getAttribute('text'),
            check = element[i].getAttribute('checked'),
            require = element[i].getAttribute('required'),
            form = element[i].getAttribute('form'),
            name = element[i].getAttribute('name'),
            value = element[i].getAttribute('value');

        switch (component) {
            case 'checkbox':
            case 'radio':
                element[i].innerHTML = '<input type="' + component + '"' + (id ? ' id="' + id + '"' : '') + (form ? ' form="' + form + '"' : '') + (name ? ' name="' + name + '"' : '') + (check ? check : '') + ' ' + (require ? require : '') + '/><label' + (id ? ' for="' + id + '"' : '') + '>' + (text ? text : '') + '</label>';
                break;
            case 'color':
                element[i].innerHTML = '<input type="color"' + (id ? 'id="' + id + '"' : '') + (value ? 'value="' + value + '"' : '') + '/>';
                break;
            case 'process':
                element[i].innerHTML = '<complete ' + (value ? 'value="' + value + '"' : '') + '></complete>';
                element[i].querySelector('complete').style.width = element[i].getAttribute('value');
                break;
            case 'toggle':
                element[i].innerHTML = '<input type="checkbox"' + (id ? ' id="' + id + '"' : '') + (form ? ' form="' + form + '"' : '') + (name ? ' name="' + name + '"' : '') + (check ? check : '') + ' ' + (require ? require : '') + '/><label' + (id ? ' for="' + id + '"' : '') + '></label>';
                break;
            case 'logo':
                var value_src = element[i].getAttribute('src');
                element[i].innerHTML = '<img ' + (value_src ? 'src="' + value_src + '"' : '') + '/>' + (text ? '<span>' + text + '</span>' : '');
                break;
            case 'range':
                var min = range[i].getAttribute('min'),
                    max = range[i].getAttribute('max'),
                    step = range[i].getAttribute('step');
                element[i].innerHTML = '<input type="' + component + '"' + (id ? ' id="' + id + '"' : '') + (min ? ' min="' + min + '"' : '') + (max ? ' max="' + max + '"' : '') + (step ? ' step="' + step + '"' : '') + '/><label' + (id ? ' for="' + id + '"' : '') + (value ? 'value="' + value + '"' : '') + '></label>';
                initRange(element[i]);
                break;
            default:
                break;
        }
        removeAttr(element[i], 'id text form name value checked required src min max step');
    }
}


// funcion que genera un elemento link que recibe la url como parametro.
function createLink(url) {
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', url);
    // retorna el elemento link creado con los atributos
    return link;
}

// multiple Event listeners (elemento, eventos, funcion)

function onEventListener(el, events, func) {
    events = events.split(' ');
    if (events.length > 1) {
        for (var i = 0; i < events.length; i++) {
            el.addEventListener(events[i], func, false);
        }
    } else {
        el.addEventListener(events, func, false);
    }
}

// funcion que valida si en un array hay determinado valor y retorna verdadero
function validateArray(array, value) {
    for (var i = 0; i <= array.length; i++) {
        if (array[i] === value) {
            return true;
        } else { return false; }
    }
}

// recibe como primer parametro un array, y como segundo parametro la clase a remover
function removeClass(n, target) {
    // si el arra es mayor a 0 entonces
    if (n.length > 0) {
        for (var i = 0; i < n.length; i++) {
            // si contene la clase pasada a target entonces
            if (n[i].classList.contains(target)) {
                n[i].classList.remove(target);
            }
        }
    }
}

function prevSiblings(target) {
    var siblings = [],
        n = target;
    if (n !== null && n !== undefined && n !== '') {
        while (n = n.previousElementSibling) siblings.push(n);
        return siblings;
    } else {
        return siblings;
    }
}

function nextSiblings(target) {
    var siblings = [],
        n = target;
    if (n !== null && n !== undefined && n !== '') {
        while (n = n.nextElementSibling) siblings.push(n);
        return siblings;
    } else {
        return siblings;
    }
}

function siblings(target) {
    var previus = prevSiblings(target) || [],
        next = nextSiblings(target) || [];
    return previus.concat(next);
}

// funcion para los eventos fab, dropdown
function showToggle(e) {
    e.stopPropagation();
    this.nextElementSibling.classList.toggle('is-visible');
}


// oculta un selector al hacer click en el body
function hideSelector(el, classContain) {
    if (el.length > 0) {
        for (var i = 0; i < el.length; i++) {
            // si contiene la clase is-visible se la quita
            if (el[i].classList.contains(classContain)) {
                el[i].classList.remove(classContain);
            }
        }
    }
}

// recibe el elemento al cual se le removera un atributo parametro : el
// recibe un array de atributos separados por coma, ejemplo: 'value id class data-*'
function removeAttr(el, array) {
    array = array.split(' ');
    for (var i = 0; i < array.length; i++) {
        if (el.hasAttribute(array[i])) {
            el.removeAttribute(array[i]);
        }
    }
}


/* módulos y componentes alamacenados en variebles */

var acordeon = document.querySelectorAll('acordeon');
var body = document.querySelector('body'); //elemento body
var head = document.querySelector('head'); //elemento head almacenado
var close_button = document.querySelectorAll('close');
var checkbox = document.querySelectorAll('checkbox');
var dropdown = document.querySelectorAll('dropdown');
var dropmenu = document.querySelectorAll('dropmenu');
var form_color = document.querySelectorAll('color');
var radio = document.querySelectorAll('radio');
var fab = document.querySelectorAll('fab');
var fabmenu = document.querySelectorAll('fabmenu');
var navbar = document.querySelectorAll('navbar');
var modal = document.querySelectorAll('[modal]');
var process_bar = document.querySelectorAll('process');
var range = document.querySelectorAll('range');
var slideshow = document.querySelectorAll('slideshow');
var slides = document.querySelectorAll('slides');
var slide_next = document.querySelectorAll('.next-slide');
var slide_prev = document.querySelectorAll('.previus-slide');
var cont_slide = document.querySelectorAll('slides picture');
var tabs = document.querySelectorAll('tabs');
var tabsContent = document.querySelectorAll('tabs-content');
var toggle_button = document.querySelectorAll('toggle');

/* ================== Sistema de importación CSS ==================== */

var includeCSS = body.getAttribute('km-include'); //obtener atributo km-include
var Path = '//cdn.jsdelivr.net/npm/kimera@0.4.4/css/'; // path CDN

if (includeCSS != undefined) {
    includeCSS = ('base ' + includeCSS).split(' ');
    var haskimera = validateArray(includeCSS, 'kimera');
    var url_include, link;

    if (haskimera) {
        url_include = Path + 'kimera.min.css'; // url del archivo base.min.css
        link = createLink(url_include); //amcenamiento del link generado
        head.appendChild(link);
    } else {
        // ciclo que recorre el array includeCSS e inserta un lemento link por cada valor
        for (var i = 0; i < includeCSS.length; i++) {
            url_include = Path + includeCSS[i] + '.min.css'; // reestructuración de path CDN
            link = createLink(url_include); //creacion del link mediante la funcion createLink
            head.appendChild(link);
        }
    }
}

// inicializa estos componentes creados dinamicamente
init('checkbox');
init('radio');
init('toggle');
init('process');
init('color');
init('logo');
init('range');

document.querySelector('body').onclick = function() {
    hideSelector(dropmenu, 'is-visible');
    hideSelector(fab, 'is-visible');
};
/* ================== Js Fab buttons floating ===================== */
// si hay fab button
if (fab.length > 0) {
    // se añade la escuhca del click
    for (var i = 0; i < fab.length; i++) {
        onEventListener(fab[i].querySelector('.is-toggle-fab'), 'click', showToggle);
    }
}

/* =============== Dropdown ==================== */
// si hay drodown
if (dropdown.length > 0) {
    // Se añade la escucha addEventListener al toggle-dropdown
    for (var i = 0; i < dropdown.length; i++) {
        onEventListener(dropdown[i].querySelector('.is-toggle-dropdown'), 'click', showToggle);
    }
}

/* ====================== Js modal with custom atribute ========================= */

//si hay un elemento con el atributo modal
if (modal.length > 0) {
    for (var i = 0; i < modal.length; i++) {
        // se añade el evento onclick
        onEventListener(modal[i], 'click', modalToggle);

        function modalToggle() {
            // extraigo el id del modal
            var modalId = this.getAttribute('modal');
            // selecciono la ventana modal que tiene el id extraido
            var el = document.querySelector(modalId);
            //array con clases de los efectos
            var modalClass = ['is-zoom-in', 'is-slide-up', 'is-slide-down'];
            var modalClassSub = ['zoom-in', 'slide-up', 'slide-down'];

            // si tiene alguna clase del arra modalClass añado elefecto del array modalClassSub
            for (var j = 0; j < modalClass.length; j++) {
                if (el.classList.contains(modalClass[j])) el.classList.toggle(modalClassSub[j]);
            }
            // toggle de la clase visible
            el.classList.toggle('is-visible');
        }
    }
}
/* =================== Navbar Js ======================= */

// si hay navbar
if (navbar.length > 0) {
    // guarda el elemento toggle
    var el = document.querySelectorAll('.is-toggle-navbar');
    for (var i = 0; i < el.length; i++) {
        // añade un evento
        onEventListener(el[i], 'click', navToggle);
    }
    // funcion local del evento
    function navToggle() {
        this.parentNode.parentElement.querySelector('navmenu').classList.toggle('is-visible');
    }
}

/* =================== Js acordeon ===================== */

//si hay acordeones
if (acordeon.length > 0) {
    //captura los items
    var acordeonItem = document.querySelectorAll('acordeon-item');
    //se les agrega el evento click
    for (var i = 0; i < acordeonItem.length; i++) {
        onEventListener(acordeonItem[i], 'click', acordeonToggle);
    }

    //funcion que da interacción
    function acordeonToggle() {
        var contentAcordeon = this.parentNode.querySelectorAll('content');
        //si tiene el atributo is-multiple
        if (this.parentNode.hasAttribute('is-multiple')) {
            //permite varios item abiertos
            this.nextElementSibling.classList.toggle('is-visible');
        } else {
            // remueve la clase is-visible a los content
            for (var i = 0; i < contentAcordeon.length; i++) {
                contentAcordeon[i].classList.remove('is-visible');
            }
            this.nextElementSibling.classList.toggle('is-visible');
        }
    }
}

/* ======================== range =========================== */

// funcion que inicializa el input range
function initRange(el) {
    var input = el.querySelector('input'),
        label = el.querySelector('label'),
        position = parseInt(window.getComputedStyle(input, null).getPropertyValue('width')) / 100;

    label.style.left = ((input.value * position) - 10) + 'px';
    label.textContent = input.value;

    //Se añade el evento input y mousedown
    onEventListener(input, 'input mousedown', updateRange);

    function updateRange() {
        var position = parseInt(window.getComputedStyle(this, null).getPropertyValue('width')) / 100;
        this.nextElementSibling.style.left = ((this.value * position) - 10) + 'px';
        this.nextElementSibling.textContent = this.value;
    }
}

/* ====================== Tabs ========================== */

/* Asigna al primer elemento del contenedor tabs la clase is-active */
for (var i = 0; i < tabs.length; i++) {
    tabs[i].firstElementChild.classList.add("is-active");
}
/* Asigna al primer elemento del contenedor tabs-content la clase is-active */
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
//recibe como parametro un elemento unico utilizado con querySelector
function showContentTab(id) {
    // si no esta vacio entonces
    if (id !== null) {
        var siblingsId = siblings(document.querySelector(id)); //guarda a sus hermanos en un array
        removeClass(siblingsId, 'is-active'); //remueve la clase is-active de los elementos de un array
        document.querySelector(id).classList.add('is-active');
    }
}

/* ====================== Slider ======================== */
/*
var islide = 1;
var spos = 0;
slides.css({
    'width': (cont_slide.length*100)+'%'
});

slide_next.on('click', function(){
    if(islide<cont_slide.length) {
        spos = spos-100;
        slides.css({
            'left': spos+'%'
        });
        islide+=1;
    }
});

slide_prev.on('click', function(){
    islide-=1;
    if(spos<0) {
        spos = spos+100;
        slides.css({
            'left': spos+'%'
        });
    }
});*/