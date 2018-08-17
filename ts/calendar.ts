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

class Calendar {
	style: string;
	date: Date;
	static languaje: string;
	static year: number;
	static month: number;
	static day: number;
	el: Element;
	input: Element;
	toggle: Element;
	label: Element;
	grid: Element;
	controlsMonth: NodeListOf<Element>;
	controlsYear: NodeListOf<Element>;
	labelYear: Element;
	labelMonth: Element;

	// create a template calendar and cached components
	constructor(o: any) {
		this.el = document.querySelector(o.el);
		this.el.innerHTML = `
				<field>
					<control class="is-icon-${o.iconPosition}">
						<input${o.required ? ' required ' : ' '}type="text" ${this.el.hasAttribute('default-value') ? `value="${this.el.getAttribute('default-value')}"` : ''} class="input calendar-input${o.style ? ` is-${o.style}` : ''}"${o.name ? ` name="${o.name}"` : ''}${o.id ? ` id="${o.id}"` : ''}>
						<icon class="calendar-toggle"><i class="${o.classIconInput}"></i></icon>
					</control>
				</field>
				<div class="calendar">
					<div class="calendar-controls">
						<div class="calendar-controls-month">
							<span class="calendar-controls-item control-prev"><i class="${o.classIconPrev}"></i></span>
							<span class="calendar-controls-label"></span>
							<span class="calendar-controls-item control-next"><i class="${o.classIconNext}"></i></span>
						</div>
						<span class="calendar-label"></span>
						<div class="calendar-controls-year">
							<span class="calendar-controls-item control-prev"><i class="${o.classIconPrev}"></i></span>
							<span class="calendar-controls-label"></span>
							<span class="calendar-controls-item control-next"><i class="${o.classIconNext}"></i></span>
						</div>
					</div>
					<div class="calendar-grid">
						<span class="calendar-grid-days">${o.languaje != 'es' ? 'su' : 'd'}</span>
						<span class="calendar-grid-days">${o.languaje != 'es' ? 'm' : 'l'}</span>
						<span class="calendar-grid-days">${o.languaje != 'es' ? 'tu' : 'm'}</span>
						<span class="calendar-grid-days">${o.languaje != 'es' ? 'we' : 'mi'}</span>
						<span class="calendar-grid-days">${o.languaje != 'es' ? 'th' : 'j'}</span>
						<span class="calendar-grid-days">${o.languaje != 'es' ? 'f' : 'v'}</span>
						<span class="calendar-grid-days">${o.languaje != 'es' ? 'sa' : 's'}</span>
					</div>
				</div>
			`;
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
	init() {
		let hasValue: boolean = false;
		let val: Array<string>;
		this.el.classList.add(`is-${this.style}`);

		if(this.input.hasAttribute('value')) {
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
	}



	//this static method build the calendar using native class date()
	static buildCalendar(el: Element, grid: Element, label: Element, input: Element, date: Date) {
		let
			mes: any = Calendar.getMonth - 1,
			anio: any = Calendar.getYear,
			forMes: number = 0,
			calendar: Element = grid.parentElement,
			buttons: NodeListOf<Element> = grid.querySelectorAll('.calendar-grid-button'),
			day: number, index: number, btn: any;

		date.setFullYear(anio, mes, 1);
		day = date.getDay();

		forMes = Calendar.getDays(mes);


		Calendar.updateLabel(label);

		if (buttons !== undefined) {
			for (let i = 0; i < buttons.length; i++) {
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
			} else {
				btn.innerText = index;
			}
			if (index == 1) {
				btn.style.gridColumnStart = day + 1;
			}
			grid.appendChild(btn);
		}

		buttons = grid.querySelectorAll('.calendar-grid-button');
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
			buttons[i].addEventListener('click', function () {
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
			controls[i].addEventListener('click', () => {
				if (controls[i].classList.contains('control-next')) {
					Calendar.setMonth(Calendar.getMonth >= 12 ? 1 : Calendar.getMonth + 1);
				} else if (controls[i].classList.contains('control-prev')) {
					Calendar.setMonth(Calendar.getMonth <= 1 ? 12 : Calendar.getMonth - 1);
				}
				Calendar.updateInput(this.input);
				Calendar.updateMonth(this.labelMonth);
				Calendar.buildCalendar(this.el, this.grid, this.label, this.input, this.date);
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
				Calendar.buildCalendar(this.el, this.grid, this.label, this.input, this.date);
			}, false);
		}
	}

	/** this method return total days per month
	 * @param mes get value type number
	*/

	static getDays(mes: number): any {
		if (mes == 0 || mes == 2 || mes == 4 || mes == 6 || mes == 7 || mes == 9 || mes == 11) {
			return 31;
		} else if (mes == 1) {
			return 28;
		} else {
			return 30;
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
		el.innerHTML = `${this.getDay}`;
	}

	//this method update content input control
	static updateInput(el: any) {
		el.value = `${this.getDay}/${this.getMonth}/${this.getYear}`;
	}

	//this method update month
	static updateMonth(el: Element) {
		switch (Calendar.languaje || 'es') {
			case 'es':
				el.innerHTML = meses_es[Calendar.getMonth - 1];
				break;
			case 'en':
				el.innerHTML = meses_en[Calendar.getMonth - 1];
				break;
		}
	}

	// this method update year
	static updateYear(el: Element) {
		el.innerHTML = `${Calendar.getYear}`;
	}
}