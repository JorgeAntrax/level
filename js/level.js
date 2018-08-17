/*
    the class Calendar create a calendar picker and added listener for controls of calendar
    @params
    object o {
        el: '#demo', // the Id container with class calendar-picker
        languaje: 'es | us', languaje for calendar component
    value: '20/2/2018', //default value calendar with the next format:  d/m/yyyy
    name: 'namedemo', // the name attribute for control input
    id: 'input123', // the id for control input
    style: 'danger', // style for the calendar
    classIconPrev: 'fa fa-angle-up', // the classes for the icon previus control
    classIconNext: 'fa fa-angle-down', // the classess for the icon next control
    classIconInput: 'fa fa-calendar', // classes for de icon toggle calendar
        iconPosition: 'left' // icon toggle position
        required: true, //if required input control
    }
*/
var Calendar = /** @class */ (function () {
    // create a template calendar and cached components
    function Calendar(o) {
        this.el = document.querySelector(o.el);
        this.el.innerHTML = "\n\t\t\t\t<field>\n\t\t\t\t\t<control class=\"is-icon-" + o.iconPosition + "\">\n\t\t\t\t\t\t<input" + (o.required ? ' required ' : ' ') + "type=\"text\" " + (this.el.hasAttribute('default-value') ? "value=\"" + this.el.getAttribute('default-value') + "\"" : '') + " class=\"input calendar-input" + (o.style ? " is-" + o.style : '') + "\"" + (o.name ? " name=\"" + o.name + "\"" : '') + (o.id ? " id=\"" + o.id + "\"" : '') + ">\n\t\t\t\t\t\t<icon class=\"calendar-toggle\"><i class=\"" + o.classIconInput + "\"></i></icon>\n\t\t\t\t\t</control>\n\t\t\t\t</field>\n\t\t\t\t<div class=\"calendar\">\n\t\t\t\t\t<div class=\"calendar-controls\">\n\t\t\t\t\t\t<div class=\"calendar-controls-month\">\n\t\t\t\t\t\t\t<span class=\"calendar-controls-item control-prev\"><i class=\"" + o.classIconPrev + "\"></i></span>\n\t\t\t\t\t\t\t<span class=\"calendar-controls-label\"></span>\n\t\t\t\t\t\t\t<span class=\"calendar-controls-item control-next\"><i class=\"" + o.classIconNext + "\"></i></span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<span class=\"calendar-label\"></span>\n\t\t\t\t\t\t<div class=\"calendar-controls-year\">\n\t\t\t\t\t\t\t<span class=\"calendar-controls-item control-prev\"><i class=\"" + o.classIconPrev + "\"></i></span>\n\t\t\t\t\t\t\t<span class=\"calendar-controls-label\"></span>\n\t\t\t\t\t\t\t<span class=\"calendar-controls-item control-next\"><i class=\"" + o.classIconNext + "\"></i></span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"calendar-grid\">\n\t\t\t\t\t\t<span class=\"calendar-grid-days\">" + (o.languaje != 'es' ? 'su' : 'd') + "</span>\n\t\t\t\t\t\t<span class=\"calendar-grid-days\">" + (o.languaje != 'es' ? 'm' : 'l') + "</span>\n\t\t\t\t\t\t<span class=\"calendar-grid-days\">" + (o.languaje != 'es' ? 'tu' : 'm') + "</span>\n\t\t\t\t\t\t<span class=\"calendar-grid-days\">" + (o.languaje != 'es' ? 'we' : 'mi') + "</span>\n\t\t\t\t\t\t<span class=\"calendar-grid-days\">" + (o.languaje != 'es' ? 'th' : 'j') + "</span>\n\t\t\t\t\t\t<span class=\"calendar-grid-days\">" + (o.languaje != 'es' ? 'f' : 'v') + "</span>\n\t\t\t\t\t\t<span class=\"calendar-grid-days\">" + (o.languaje != 'es' ? 'sa' : 's') + "</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t";
        this.input = this.el.querySelector('.calendar-input');
        this.toggle = this.el.querySelector('.calendar-toggle');
        this.labelMonth = this.el.querySelector('.calendar-controls-month .calendar-controls-label');
        this.labelYear = this.el.querySelector('.calendar-controls-year .calendar-controls-label');
        this.controlsMonth = this.el.querySelectorAll('.calendar-controls-month .calendar-controls-item');
        this.controlsYear = this.el.querySelectorAll('.calendar-controls-year .calendar-controls-item');
        this.grid = this.el.querySelector('.calendar-grid');
        this.label = this.el.querySelector('.calendar-label');
        this.style = o.style || 'light';
        this.date = new Date();
        this.init();
    }
    //this method configure all calendar parameters
    Calendar.prototype.init = function () {
        var hasValue = false;
        var val;
        this.el.classList.add("is-" + this.style);
        if (this.input.hasAttribute('value')) {
            val = this.input.value.split('/');
            hasValue = true;
        }
        Calendar.setDay(hasValue ? parseInt(val[0]) : this.date.getDate());
        Calendar.setMonth(hasValue ? parseInt(val[1]) : this.date.getMonth() + 1);
        Calendar.setYear(hasValue ? parseInt(val[2]) : this.date.getFullYear());
        Calendar.updateInput(this.input);
        Calendar.buildCalendar(this.el, this.grid, this.label, this.input, this.date);
        Calendar.updateMonth(this.labelMonth);
        Calendar.updateYear(this.labelYear);
        this.watchInput(this.el, this.toggle);
        this.watchMonths(this.controlsMonth);
        this.watchYear(this.controlsYear);
    };
    //this static method build the calendar using native class date()
    Calendar.buildCalendar = function (el, grid, label, input, date) {
        var mes = Calendar.getMonth - 1, anio = Calendar.getYear, forMes = 0, calendar = grid.parentElement, buttons = grid.querySelectorAll('.calendar-grid-button'), day, index, btn;
        date.setFullYear(anio, mes, 1);
        day = date.getDay();
        forMes = Calendar.getDays(mes);
        Calendar.updateLabel(label);
        if (buttons !== undefined) {
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].remove();
            }
        }
        for (index = 1; index <= forMes; index++) {
            btn = document.createElement('button');
            btn.setAttribute('is-icon', 'true');
            btn.classList.add('calendar-grid-button');
            btn.classList.add('is-rounded');
            if (index == Calendar.getDay) {
                btn.classList.add('is-active');
            }
            if (index < 10) {
                btn.innerText = '0' + index;
            }
            else {
                btn.innerText = index;
            }
            if (index == 1) {
                btn.style.gridColumnStart = day + 1;
            }
            grid.appendChild(btn);
        }
        buttons = grid.querySelectorAll('.calendar-grid-button');
        Calendar.watchCalendar(label, buttons, input, calendar);
    };
    //this method add the event click for the icon toggle
    /*
            @params
            el: parent calendar container with class contains .calendar
            toggle: element toggle for calendar component
    */
    Calendar.prototype.watchInput = function (el, toggle) {
        toggle.addEventListener('click', function () {
            el.querySelector('.calendar').classList.toggle('is-visible');
        }, false);
    };
    //this static method add event click for all buttons in to calendar-grid container
    /*
            @params
            label: the element selector is .calendar-label
            buttons: array with total buttons into grid container
            input: the element control input for update content
            calendar: the calendar container for toggle visibility
    */
    Calendar.watchCalendar = function (label, buttons, input, calendar) {
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function () {
                for (var i_1 = 0; i_1 < buttons.length; i_1++) {
                    buttons[i_1].classList.remove('is-active');
                }
                this.classList.add('is-active');
                Calendar.setDay(this.outerText);
                Calendar.updateLabel(label);
                Calendar.updateInput(input);
                calendar.classList.remove('is-visible');
            }, false);
        }
    };
    // this method  added events click for a control months and update calendar.
    /*
            @párams
            controls: [array] all elements with class contains .calendar-control-item into .calenar-control-month
    */
    Calendar.prototype.watchMonths = function (controls) {
        var _this = this;
        var _loop_1 = function (i) {
            controls[i].addEventListener('click', function () {
                if (controls[i].classList.contains('control-next')) {
                    Calendar.setMonth(Calendar.getMonth >= 12 ? 1 : Calendar.getMonth + 1);
                }
                else if (controls[i].classList.contains('control-prev')) {
                    Calendar.setMonth(Calendar.getMonth <= 1 ? 12 : Calendar.getMonth - 1);
                }
                Calendar.updateInput(_this.input);
                Calendar.updateMonth(_this.labelMonth);
                Calendar.buildCalendar(_this.el, _this.grid, _this.label, _this.input, _this.date);
            }, false);
        };
        for (var i = 0; i < controls.length; i++) {
            _loop_1(i);
        }
    };
    // this method  added events click for a control years and update calendar.
    /*
            @párams
            controls: [array] all elements with class contains .calendar-control-item into .calenar-control-year
    */
    Calendar.prototype.watchYear = function (controls) {
        var _this = this;
        var _loop_2 = function (i) {
            controls[i].addEventListener('click', function () {
                if (controls[i].classList.contains('control-next')) {
                    Calendar.setYear(Calendar.getYear + 1);
                }
                else if (controls[i].classList.contains('control-prev')) {
                    Calendar.setYear(Calendar.getYear - 1);
                }
                Calendar.updateInput(_this.input);
                Calendar.updateYear(_this.labelYear);
                Calendar.buildCalendar(_this.el, _this.grid, _this.label, _this.input, _this.date);
            }, false);
        };
        for (var i = 0; i < controls.length; i++) {
            _loop_2(i);
        }
    };
    /** this method return total days per month
     * @param mes get value type number
    */
    Calendar.getDays = function (mes) {
        if (mes == 0 || mes == 2 || mes == 4 || mes == 6 || mes == 7 || mes == 9 || mes == 11) {
            return 31;
        }
        else if (mes == 1) {
            return 28;
        }
        else {
            return 30;
        }
    };
    Object.defineProperty(Calendar, "getDay", {
        // this method return day
        get: function () {
            return this.day;
        },
        enumerable: true,
        configurable: true
    });
    // this method update day
    Calendar.setDay = function (value) {
        this.day = value;
    };
    Object.defineProperty(Calendar, "getMonth", {
        //this method return month
        get: function () {
            return this.month;
        },
        enumerable: true,
        configurable: true
    });
    //this method update month
    Calendar.setMonth = function (value) {
        this.month = value;
    };
    Object.defineProperty(Calendar, "getYear", {
        // this method return year
        get: function () {
            return this.year;
        },
        enumerable: true,
        configurable: true
    });
    //this method update year
    Calendar.setYear = function (value) {
        this.year = value;
    };
    //this method update the label day
    Calendar.updateLabel = function (el) {
        el.innerHTML = "" + this.getDay;
    };
    //this method update content input control
    Calendar.updateInput = function (el) {
        el.value = this.getDay + "/" + this.getMonth + "/" + this.getYear;
    };
    //this method update month
    Calendar.updateMonth = function (el) {
        switch (Calendar.languaje || 'es') {
            case 'es':
                el.innerHTML = meses_es[Calendar.getMonth - 1];
                break;
            case 'en':
                el.innerHTML = meses_en[Calendar.getMonth - 1];
                break;
        }
    };
    // this method update year
    Calendar.updateYear = function (el) {
        el.innerHTML = "" + Calendar.getYear;
    };
    return Calendar;
}());

var meses_es = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
var meses_en = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dec'];

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
var Listbox = /** @class */ (function () {
    function Listbox(obj) {
        this.el = document.querySelector(obj.el);
        this.el.innerHTML += "<input " + (obj.name ? "name=\"" + obj.name + "\"" : '') + " " + (obj.id ? "id=\"" + obj.id + "\"" : '') + " type=\"text\" class=\"input" + (obj.rounded ? ' is-rounded' : '') + (obj.hasTwoIcons ? ' padding-l-2' : '') + "\">\n\t\t\t\t<icon class=\"is-toggle-listbox\"><i class=\"" + obj.iconToggleClass + "\"></i></icon>\n\t\t\t\t" + (obj.iconLabelClass ? "<icon class=\"listbox-icon\"><i class=\"" + obj.iconLabelClass + "\"></i></icon>" : '');
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
        var listItems = this.el.querySelectorAll('list-item');
        input.value = listItems[0].hasAttribute('text') ? listItems[0].getAttribute('text') : listItems[0].getAttribute('value');
        input.readOnly = true;
        listItems[0].classList.add('is-active');
        input.addEventListener('click', function () {
            list.classList.toggle('is-visible');
        }, false);
        var toggle = this.el.querySelector('.is-toggle-listbox');
        toggle.addEventListener('click', function () {
            list.classList.toggle('is-visible');
        }, false);
        var activo;
        var _loop_1 = function (i) {
            listItems[i].addEventListener('click', function () {
                for (var j = 0; j < listItems.length; j++) {
                    if (listItems[j].classList.contains('is-active')) {
                        listItems[j].classList.remove('is-active');
                    }
                }
                listItems[i].classList.add('is-active');
                activo = listItems[i];
                list.classList.remove('is-visible');
                _this.update(input, activo);
            }, false);
        };
        for (var i = 0; i < listItems.length; i++) {
            _loop_1(i);
        }
    };
    /* * this method update the value property in the input element
     *
     * @param input the input element selected in DOM
     * @param activo the list-item element with class is-active */
    Listbox.prototype.update = function (input, activo) {
        input.value = activo.getAttribute('text');
    };
    return Listbox;
}());

var Slider = /** @class */ (function () {
    function Slider(object) {
        this.el = document.querySelector(object.el);
        this.height = parseInt(this.el.getAttribute('height'));
        this.controls = object.controls;
        this.nextControl = object.nextControl;
        this.prevControl = object.prevControl;
        this.autoplay = object.autoplay || false;
        this.interval = object.interval || 0;
        this.init();
    }
    Slider.prototype.init = function () {
        this.buildSliders();
    };
    Slider.prototype.buildSliders = function () {
        var $container = this.el.querySelector('sliders');
        var elSlider = this.el.querySelectorAll('slider');
        var slide, slideType;
        this.el.style.height = this.height + 'px';
        for (var i = 0; i < elSlider.length; i++) {
            elSlider[i].innerHTML += "\n            " + (elSlider[i].hasAttribute('src') ? "<img src='" + elSlider[i].getAttribute('src') + "'/>" : '') + (elSlider[i].hasAttribute('caption') ? "<div class=\"slider-caption\">" + elSlider[i].getAttribute('caption') + "</div>" : '');
        }
        if (this.el.hasAttribute('animation')) {
            var animate = this.el.getAttribute('animation');
            if (animate == 'slide') {
                slide = true;
                slideType = 'horizontal';
                console.log($container + elSlider.length);
                $container.style.minWidth = (elSlider.length * 100) + '%';
            }
            if (animate == 'slide-vertical') {
                slide = true;
                slideType = 'vertical';
                for (var i = 0; i < elSlider.length; i++) {
                    elSlider[i].style.height = this.height + 'px';
                }
                $container.style.minHeight = (elSlider.length * this.height) + '%';
            }
            if (animate == 'fade') {
                slide = false;
            }
        }
        if (this.controls) {
            this.el.innerHTML += "\n\t\t\t\t\t\t<span class=\"slider-control slider-prev\">\n\t\t\t\t\t\t\t<icon class=\"is-medium\"><i class=\"" + this.nextControl + "\"></i></icon>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t\t<span class=\"slider-control slider-next\">\n\t\t\t\t\t\t\t<icon class=\"is-medium\"><i class=\"" + this.prevControl + "\"></i></icon>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t\t";
        }
        if (slide) {
            this.watchSlide(slideType);
        }
        else {
            this.watchFade();
        }
    };
    Slider.prototype.watchSlide = function (type) {
        var _this = this;
        var controls = this.el.querySelectorAll('.slider-control'), slidersT = this.el.querySelectorAll('slider'), container = this.el.querySelector('sliders'), sliders = slidersT.length, control = 0;
        if (this.autoplay) {
            control = this.autoPlay(this.interval, type);
        }
        var _loop_1 = function (i) {
            var btn = controls[i];
            btn.addEventListener('click', function () {
                var ctrl = btn.classList.contains('slider-next') ? 1 : -1;
                if (type == 'horizontal') {
                    if (ctrl == 1) {
                        (control < (sliders - 1)) ? control++ : control = 0;
                        container.style.left = (control * -100) + '%';
                    }
                    else {
                        (control == 0) ? control = sliders - 1 : control--;
                        container.style.left = (control * -100) + '%';
                    }
                }
                else {
                    if (ctrl == 1) {
                        (control < (sliders - 1)) ? control++ : control = 0;
                        container.style.top = (control * -_this.height) + 'px';
                    }
                    else {
                        (control == 0) ? control = sliders - 1 : control--;
                        container.style.top = (control * -_this.height) + 'px';
                    }
                }
            }, false);
        };
        for (var i = 0; i < controls.length; i++) {
            _loop_1(i);
        }
    };
    Slider.prototype.autoPlay = function (interval, type) {
        var _this = this;
        var container = this.el.querySelector('sliders');
        var sliders = container.querySelectorAll('slider');
        switch (type) {
            case 'horizontal':
                var control_1 = 0;
                var cont1 = sliders.length;
                setInterval(function (cont1) {
                    (control_1 < (cont1 - 1)) ? control_1++ : control_1 = 0;
                    container.style.left = (control_1 * -100) + '%';
                    return control_1;
                }, interval);
                break;
            case 'vertical':
                var control1_1 = 0;
                var cont2 = sliders.length;
                setInterval(function (cont2) {
                    (control1_1 < (cont2 - 1)) ? control1_1++ : control1_1 = 0;
                    container.style.top = (control1_1 * -_this.height) + 'px';
                    return control1_1;
                }, interval);
                break;
            default:
                var ctrl_1 = 0;
                var cont_1 = sliders.length;
                sliders[0].classList.add('is-active');
                setInterval(function () {
                    for (var i = 0; i < sliders.length; i++) {
                        if (sliders[i].classList.contains('is-active')) {
                            sliders[i].classList.remove('is-active');
                            ctrl_1 = i + 1;
                        }
                    }
                    if (ctrl_1 < cont_1) {
                        sliders[ctrl_1].classList.add('is-active');
                    }
                    else {
                        ctrl_1 = 0;
                        sliders[ctrl_1].classList.add('is-active');
                    }
                }, interval);
                break;
        }
    };
    Slider.prototype.watchFade = function () {
        var controls = this.el.querySelectorAll('.slider-control'), slidersT = this.el.querySelectorAll('slider'), activo = 0;
        slidersT[activo].classList.add('is-active');
        if (this.autoplay) {
            this.autoPlay(this.interval, '');
        }
        var _loop_2 = function (i) {
            var btn = controls[i];
            btn.addEventListener('click', function () {
                var ctrl = btn.classList.contains('slider-next') ? 1 : -1, sliders = slidersT.length, activo = 0;
                for (var i_1 = 0; i_1 < sliders; i_1++) {
                    if (slidersT[i_1].classList.contains('is-active')) {
                        activo = i_1;
                        slidersT[activo].classList.remove('is-active');
                        break;
                    }
                }
                if (ctrl == 1) {
                    activo++;
                    if (activo == slidersT.length) {
                        activo = 0;
                    }
                }
                else {
                    activo--;
                    if (activo < 0) {
                        activo = slidersT.length - 1;
                    }
                }
                slidersT[activo].classList.add('is-active');
            }, false);
        };
        for (var i = 0; i < controls.length; i++) {
            _loop_2(i);
        }
    };
    return Slider;
}());

/* All components saved in variables */
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
var btn_ripple = document.querySelectorAll('button, .button');
var burger = document.querySelectorAll('burger');
var ellipsis = document.querySelectorAll('ellipsis');
// initializes dynamic components
init('checkbox');
init('radio');
init('toggle');
init('process');
init('color');
init('logo');
init('range');
/* ================== Import system CSS ==================== */
var lvInclude = body.getAttribute('@include'); //get attribute @include
var PATH_URL = '//cdn.jsdelivr.net/npm/level-css-framework@0.5.5/css/'; // path CDN
var includeCSS;
if (lvInclude) {
    includeCSS = ("base " + lvInclude).split(' ');
    var hasLevel = validateArray(includeCSS, 'level');
    var url_include = void 0;
    if (hasLevel) {
        url_include = PATH_URL + "level.min.css"; // url to file base.min.css
        head.appendChild(createLink(url_include));
    }
    else {
        for (var i = 0; i < includeCSS.length; i++) {
            url_include = "" + PATH_URL + includeCSS[i] + ".min.css";
            head.appendChild(createLink(url_include));
        }
    }
    body.removeAttribute('@include');
}
/** add template in toggle icon burger and ellipsis */
if (burger) {
    for (var i = 0; i < burger.length; i++) {
        burger[i].innerHTML = '<span></span><span></span><span></span>';
        burger[i].addEventListener('click', function () {
            this.classList.toggle('is-active');
        }, false);
    }
}
if (ellipsis) {
    for (var i = 0; i < ellipsis.length; i++) {
        ellipsis[i].innerHTML = '<span></span><span></span><span></span>';
        ellipsis[i].addEventListener('click', function () {
            this.classList.toggle('is-active');
        }, false);
    }
}
/** Add ripple effect for al buttons elements*/
if (btn_ripple) {
    for (var i = 0; i < btn_ripple.length; i++) {
        btn_ripple[i].innerHTML += "<div class=\"ripple-container\"><span class=\"ripple-effect\"></span></div>";
        btn_ripple[i].addEventListener('click', function (e) {
            e.stopPropagation();
            var ripple = this.querySelector('.ripple-effect');
            var parent = this.querySelector('.ripple-container');
            var offset = this.getBoundingClientRect();
            ripple.style.top = e.clientY - offset.top + "px";
            ripple.style.left = e.clientX - offset.left + "px";
            ripple.classList.add('ripple-active');
            setTimeout(function () {
                ripple.classList.remove('ripple-active');
            }, 2000);
        }, false);
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
body.onclick = function () {
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
    }
}
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
/**
 * Add a listener toggle button in navbar and  controll the sticky navbar on scroll
*/
if (navbar.length > 0) {
    var el = document.querySelectorAll('.is-toggle-navbar');
    for (var i = 0; i < el.length; i++) {
        onEventListener(el[i], 'click', navToggle);
    }
    var _loop_1 = function (i) {
        if (navbar[i].hasAttribute('on-sticky')) {
            var data_1 = navbar[i].getAttribute('on-sticky').split(': ');
            window.addEventListener('scroll', function () {
                if (window.scrollY > parseInt(data_1[1])) {
                    if (data_1[0] == 'top') {
                        navbar[i].classList.add('is-fixed-top');
                    }
                    else {
                        navbar[i].classList.add('is-fixed-bottom');
                    }
                }
                else {
                    if (navbar[i].classList.contains('is-fixed-top')) {
                        navbar[i].classList.remove('is-fixed-top');
                    }
                    else if (navbar[i].classList.contains('is-fixed-bottom')) {
                        navbar[i].classList.remove('is-fixed-bottom');
                    }
                }
            }, false);
        }
    };
    for (var i = 0; i < navbar.length; i++) {
        _loop_1(i);
    }
}
function navToggle() {
    this.parentNode.parentElement.querySelector('navmenu').classList.toggle('is-visible');
}
/* =================== Js acordeon ===================== */
if (acordeon.length > 0) {
    var acordeonItem = document.querySelectorAll('acordeon-item');
    for (var i = 0; i < acordeonItem.length; i++) {
        onEventListener(acordeonItem[i], 'click', acordeonToggle);
    }
}
/* shows, hides, and controls behavior module accordion */
function acordeonToggle() {
    var contentAcordeon = this.parentNode.querySelectorAll('content');
    if (this.parentNode.hasAttribute('multiple')) {
        this.nextElementSibling.classList.toggle('is-visible');
    }
    else {
        for (var i = 0; i < contentAcordeon.length; i++) {
            contentAcordeon[i].classList.remove('is-visible');
        }
        this.nextElementSibling.classList.toggle('is-visible');
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
}
function tabToggle() {
    removeClass(siblings(this), 'is-active');
    this.classList.add("is-active");
    showContentTab(this.getAttribute('data-id'));
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
        var require = currentElement.getAttribute('required');
        var form = currentElement.getAttribute('form');
        var name_1 = currentElement.getAttribute('name');
        var value = currentElement.getAttribute('value');
        switch (component) {
            case 'checkbox':
            case 'radio':
                currentElement.innerHTML =
                    "<input type=\"" + component + "\"" + (id ? " id=\"" + id + "\"" : '') + (value ? " value=\"" + value + "\"" : '') + (form ? " form=\"" + form + "\"" : '') + (name_1 ? " name=\"" + name_1 + "\"" : '') + (check ? ' checked' : '') + (require ? ' required' : '') + "/><label " + (id ? " for=\"" + id + "\"" : '') + ">" + (text ? text : '') + "</label>";
                break;
            case 'color':
                currentElement.innerHTML =
                    "<input type=\"color\" " + (id ? " id=\"" + id + "\"" : '') + (value ? " value=\"" + value + "\"" : '') + "/>";
                break;
            case 'process':
                currentElement.innerHTML = "<complete" + (value ? " value=\"" + value + "\"" : '') + "></complete>";
                var querySelector = currentElement.querySelector('complete');
                querySelector.style.width = currentElement.getAttribute('value');
                break;
            case 'toggle':
                currentElement.innerHTML = "<input type=\"checkbox\" " + (id ? " id=\"" + id + "\"" : '') + (form ? " form=\"" + form + "\"" : '') + (name_1 ? " name=\"" + name_1 + "\"" : '') + (check ? ' checked' : '') + (require ? ' required' : '') + "/><label " + (id ? " for=\"" + id + "\"" : '') + " ></label>";
                break;
            case 'logo':
                var value_src = currentElement.getAttribute('src');
                currentElement.innerHTML = "<img " + (value_src ? " src=\"" + value_src + "\"" : '') + "/>" + (text ? "<span>" + text + "</span>" : '');
                break;
            case 'range':
                var min = currentElement.getAttribute('min');
                var max = currentElement.getAttribute('max');
                var step = currentElement.getAttribute('step');
                currentElement.innerHTML = "<input type=\"" + component + "\" " + (id ? " id=\"" + id + "\"" : '') + (min ? " min=\"" + min + "\"" : '') + (max ? " max=\"" + max + "\"" : '') + (step ? " step=\"" + step + "\"" : '') + "/><label " + (id ? " for=\"" + id + "\"" : '') + (value ? " value=\"" + value + "\"" : '') + "></label>";
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
