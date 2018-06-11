'use strict';
/* 
	the class Calendar create a calendar picker and added listener for controls of calendar
	@params
	object o {
		el: '#demo', // the Id container with class calendar-picker
		languaje: 'es | us', languaje for calendar component
    value: '20/2/2018', //default value calendar with the next format:  d/m/yyyy
    inputName: 'namedemo', // the name attribute for control input
    inputId: 'input123', // the id for control input
    style: 'danger', // style for the calendar
    classIconPrev: 'fa fa-angle-up', // the classes for the icon previus control
    classIconNext: 'fa fa-angle-down', // the classess for the icon next control
    classIconInput: 'fa fa-calendar', // classes for de icon toggle calendar
    iconPosition: 'left' // icon toggle position
	}
*/
class Calendar {
	static languaje: string;
	static year: any;
	static month: any;
	static day: any;
	el: Element;
	input: Element;
	toggle: Element;
	label: Element;
	grid: Element;
	controlsMonth: NodeListOf<Element>;
	controlsYear: NodeListOf<Element>;
	labelYear: Element;
	labelMonth: Element;
	value: Array<string>;
	// create a template calendar and cached components
	constructor(o: any) {
		this.el = document.querySelector(o.el);
		this.el.innerHTML = `
				<field>
					<control class="is-icon-${o.iconPosition}">
						<input type="text" class="input is-${o.style}" name="${o.inputName}" id="${o.inputId}">
						<icon class="toggle-calendar"><i class="${o.classIconInput}"></i></icon>
					</control>
				</field>
				<div class="calendar">
					<div class="calendar-controls">
						<div class="calendar-control-month">
							<span class="calendar-control-item control-prev"><i class="${o.classIconPrev}"></i></span>
							<span class="calendar-label-control"></span>
							<span class="calendar-control-item control-next"><i class="${o.classIconNext}"></i></span>
						</div>
						<span class="calendar-label"></span>
						<div class="calendar-control-year">
							<span class="calendar-control-item control-prev"><i class="${o.classIconPrev}"></i></span>
							<span class="calendar-label-control"></span>
							<span class="calendar-control-item control-next"><i class="${o.classIconNext}"></i></span>
						</div>
					</div>
					<div class="calendar-grid">
						<span class="label-grid-days">${o.languaje != 'es' ? 'su' : 'd'}</span>
						<span class="label-grid-days">${o.languaje != 'es' ? 'm' : 'l'}</span>
						<span class="label-grid-days">${o.languaje != 'es' ? 'tu' : 'm'}</span>
						<span class="label-grid-days">${o.languaje != 'es' ? 'we' : 'mi'}</span>
						<span class="label-grid-days">${o.languaje != 'es' ? 'th' : 'j'}</span>
						<span class="label-grid-days">${o.languaje != 'es' ? 'f' : 'v'}</span>
						<span class="label-grid-days">${o.languaje != 'es' ? 'sa' : 's'}</span>
					</div>
				</div>
			`;
		this.el.classList.add('is-' + o.style);
		this.value = o.value.split('/');
		this.input = this.el.querySelector('.input');
		this.toggle = this.el.querySelector('.toggle-calendar');
		this.labelMonth = this.el.querySelector('.calendar-control-month .calendar-label-control');
		this.labelYear = this.el.querySelector('.calendar-control-year .calendar-label-control');
		this.controlsMonth = this.el.querySelectorAll('.calendar-control-month .calendar-control-item');
		this.controlsYear = this.el.querySelectorAll('.calendar-control-year .calendar-control-item');
		this.grid = this.el.querySelector('.calendar-grid');
		this.label = this.el.querySelector('.calendar-label');
		this.init();
	}

	//this method configure all calendar parameters
	init() {
		this
		Calendar.setDay(parseInt(this.value[0]));
		Calendar.setMonth(parseInt(this.value[1]));
		Calendar.setYear(parseInt(this.value[2]));
		Calendar.buildCalendar(this.el, this.grid, this.label, this.input);

		this.watchInput(this.el, this.toggle);
		this.watchMonths(this.controlsMonth);
		this.watchYear(this.controlsYear);
		Calendar.updateInput(this.input);
		Calendar.updateMonth(this.labelMonth);
		Calendar.updateYear(this.labelYear);
	}

	//this static method build the calendar using native class date()
	static buildCalendar(el: Element, grid: Element, label: Element, input: Element) {
		let
			fecha: any = new Date(),
			mes: any = Calendar.getMonth - 1,
			anio: any = Calendar.getYear,
			forMes: number = 0,
			calendar: Element = grid.parentElement,
			buttons: NodeListOf<Element> = grid.querySelectorAll('button'),
			day: number, index: number, btn: any;

		fecha.setFullYear(anio, mes, 1);
		day = fecha.getDay();

		if (mes == 0 || mes == 2 || mes == 4 || mes == 6 || mes == 7 || mes == 9 || mes == 11) {
			forMes = 31;
		} else if (mes == 1) {
			forMes = 28;
		} else {
			forMes = 30;
		}


		Calendar.updateLabel(label);

		if (buttons !== undefined) {
			for (let i = 0; i < buttons.length; i++) {
				buttons[i].remove();
			}
		}

		for (index = 1; index <= forMes; index++) {
			btn = document.createElement('button');
			btn.classList.add('is-rounded');
			if (index == Calendar.getDay) {
				btn.classList.add('is-active');
			}
			if (index < 10) {
				btn.innerText = '0' + index;
			} else {
				btn.innerText = index;
			}
			if (index == 0) {
				btn.style.gridColumnStart = day + 1;
			}
			grid.appendChild(btn);
		}

		buttons = grid.querySelectorAll('button');
		Calendar.watchCalendar(label, buttons, input, calendar);
	}

	//this method add the event click for the icon toggle
	/* 
		@params
		el: parent calendar container with class contains .calendar
		toggle: element toggle for calendar component
	*/
	watchInput(el: Element, toggle: Element) {
		toggle.addEventListener('click', function () {
			el.querySelector('.calendar').classList.toggle('is-visible');
		}, false);
	}

	//this static method add event click for all buttons in to calendar-grid container
	/*
		@params
		label: the element selector is .calendar-label
		buttons: array with total buttons into grid container
		input: the element control input for update content
		calendar: the calendar container for toggle visibility
	*/
	static watchCalendar(label: Element, buttons: NodeListOf<Element>, input: Element, calendar: Element) {
		for (let i = 0; i < buttons.length; i++) {
			buttons[i].addEventListener('click', function() {
				for (let i = 0; i < buttons.length; i++) {
					buttons[i].classList.remove('is-active');
				}
				this.classList.add('is-active');
				Calendar.setDay(this.outerText);
				Calendar.updateLabel(label);
				Calendar.updateInput(input);
				calendar.classList.remove('is-visible');
			}, false);

		}
	}

	// this method  added events click for a control months and update calendar.
	/*
		@párams
		controls: [array] all elements with class contains .calendar-control-item into .calenar-control-month
	*/

	watchMonths(controls: NodeListOf<Element>) {

		for (let i = 0; i < controls.length; i++) {
			controls[i].addEventListener('click', ()=> {
				if (controls[i].classList.contains('control-next')) {
					Calendar.setMonth(Calendar.getMonth >= 12 ? 1 : Calendar.getMonth + 1);
				} else if (controls[i].classList.contains('control-prev')) {
					Calendar.setMonth(Calendar.getMonth <= 1 ? 12 : Calendar.getMonth - 1);
				}
				Calendar.updateInput(this.input);
				Calendar.updateMonth(this.labelMonth);
				Calendar.buildCalendar(this.el, this.grid, this.label, this.input);
			}, false);	
		}
	}

	// this method  added events click for a control years and update calendar.
	/*
		@párams
		controls: [array] all elements with class contains .calendar-control-item into .calenar-control-year
	*/

	watchYear(controls: NodeListOf<Element>) {
		for (let i = 0; i < controls.length; i++) {
			controls[i].addEventListener('click', () => {
				if (controls[i].classList.contains('control-next')) {
					Calendar.setYear(Calendar.getYear + 1);
				} else if (controls[i].classList.contains('control-prev')) {
					Calendar.setYear(Calendar.getYear - 1);
				}
				Calendar.updateInput(this.input);
				Calendar.updateYear(this.labelYear);
				Calendar.buildCalendar(this.el, this.grid, this.label, this.input);
			}, false);
		}
	}

	// this method return day

	static get getDay() {
		return this.day;
	}

	// this method update day

	static setDay(value: number) {
		this.day = value;
	}

	//this method return month

	static get getMonth() {
		return this.month;
	}

	//this method update month

	static setMonth(value: number) {
		this.month = value;
	}

	// this method return year

	static get getYear() {
		return this.year;
	}

	//this method update year

	static setYear(value: number) {
		this.year = value;
	}

	//this method update the label day

	static updateLabel(el: Element) {
		el.innerHTML = this.getDay;
	}

	//this method update content input control

	static updateInput(el: any) {
		el.value = `${this.getDay}/${this.getMonth}/${this.getYear}`;
	}

	//this method update month

	static updateMonth(el: Element) {
		let meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
		if (Calendar.languaje != 'es') {
			meses[0] = 'jan';
			meses[11] = 'dec';
		}
		el.innerHTML = meses[Calendar.getMonth - 1];
	}

	// this method update year

	static updateYear(el: Element) {
		el.innerHTML = Calendar.getYear;
	}
}