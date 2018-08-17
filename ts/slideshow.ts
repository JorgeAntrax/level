class Slider {
    el: any;
    height: number;
    controls: boolean;
    nextControl: string;
    prevControl: string;
    autoplay: boolean;
    interval: number;

    constructor(object: any) {
        this.el = document.querySelector(object.el);
        this.height = parseInt(this.el.getAttribute('height'));
        this.controls = object.controls;
        this.nextControl = object.nextControl;
        this.prevControl = object.prevControl;
        this.autoplay = object.autoplay || false;
        this.interval = object.interval || 0;

        this.init();
    }

    init() {
        this.buildSliders();
    }

    buildSliders() {
        let $container: any = this.el.querySelector('sliders');
        let elSlider: any = this.el.querySelectorAll('slider');
        let slide: boolean, slideType: string;
        this.el.style.height = this.height + 'px';

        for (let i = 0; i < elSlider.length; i++) {
            elSlider[i].innerHTML += `
            ${elSlider[i].hasAttribute('src') ? `<img src='${elSlider[i].getAttribute('src')}'/>` : ''}${elSlider[i].hasAttribute('caption') ? `<div class="slider-caption">${elSlider[i].getAttribute('caption')}</div>` : ''}`;
				}

        if (this.el.hasAttribute('animation')) {
            let animate: string = this.el.getAttribute('animation');
            if (animate == 'slide') {
                slide = true;
                slideType = 'horizontal';
                console.log($container+elSlider.length);
                $container.style.minWidth = (elSlider.length * 100) + '%';
            }
            if (animate == 'slide-vertical') {
                slide = true;
                slideType = 'vertical';
                for (let i = 0; i < elSlider.length; i++) {
                    elSlider[i].style.height = this.height + 'px';
                }
                $container.style.minHeight = (elSlider.length * this.height) + '%';
            }
            if (animate == 'fade') {
                slide = false;
            }
        }
        if (this.controls) {
            this.el.innerHTML += `
						<span class="slider-control slider-prev">
							<icon class="is-medium"><i class="${this.nextControl}"></i></icon>
						</span>
						<span class="slider-control slider-next">
							<icon class="is-medium"><i class="${this.prevControl}"></i></icon>
						</span>
						`;
				}
				if (slide) {
						this.watchSlide(slideType);
				} else {
						this.watchFade();
				}
    }

    watchSlide(type: string) {
        let
            controls: NodeListOf<Element> = this.el.querySelectorAll('.slider-control'),
            slidersT: NodeListOf<Element> = this.el.querySelectorAll('slider'),
            container: any = this.el.querySelector('sliders'),
            sliders: number= slidersT.length,
            control: any = 0;
				if(this.autoplay) {
					control = this.autoPlay(this.interval,type);
				}

        for(let i = 0; i < controls.length; i++) {
            let btn: Element = controls[i];
            btn.addEventListener('click', () => {
                let ctrl: number = btn.classList.contains('slider-next') ? 1 : -1;
                if (type == 'horizontal') {
                    if (ctrl == 1) {
                        (control < (sliders - 1)) ? control++ : control = 0;
                        container.style.left = (control * -100) + '%';
                    } else {
                        (control == 0) ? control = sliders - 1: control--;
                        container.style.left = (control * -100) + '%';
                    }
                } else {
                    if (ctrl == 1) {
                        (control < (sliders - 1)) ? control++ : control = 0;
                        container.style.top = (control * -this.height) + 'px';
                    } else {
                        (control == 0) ? control = sliders - 1: control--;
                        container.style.top = (control * -this.height) + 'px';
                    }
                }
            }, false);
        }
		}
		
		autoPlay(interval: number, type: string) {
			let container: any = this.el.querySelector('sliders');
			let sliders: NodeListOf<Element> = container.querySelectorAll('slider');
			switch (type) {
				case 'horizontal':
					let control: number = 0;
					let cont1: number = sliders.length;
					setInterval(cont1 =>{
						(control < (cont1 - 1)) ? control++ : control = 0;
						container.style.left = (control * -100) + '%';
						return control;
					}, interval);
				break;
				case 'vertical':
					let control1: number = 0;
					let cont2: number = sliders.length;
					setInterval(cont2 =>{
						(control1 < (cont2 - 1)) ? control1++ : control1 = 0;
						container.style.top = (control1 * -this.height) + 'px';
						return control1;
					}, interval);
				break;
				default:
					let ctrl: number = 0;
					let cont: number = sliders.length;
					sliders[0].classList.add('is-active');
					setInterval(()=>{
						for (let i = 0; i < sliders.length; i++) {
							if(sliders[i].classList.contains('is-active')) {
								sliders[i].classList.remove('is-active');
								ctrl = i+1;
							}
						}
						if(ctrl < cont) {
							sliders[ctrl].classList.add('is-active');
						}else {
							ctrl = 0;
							sliders[ctrl].classList.add('is-active');
						}
					},interval);
					break;
			}
		}

    watchFade() {
        let
            controls: NodeListOf<Element> = this.el.querySelectorAll('.slider-control'),
            slidersT: NodeListOf<Element> = this.el.querySelectorAll('slider'),
            activo: number = 0;

				slidersT[activo].classList.add('is-active');
				
				if(this.autoplay) {
					this.autoPlay(this.interval, '');
				}

        for(let i = 0; i < controls.length; i++) {
            let btn: Element = controls[i];
            btn.addEventListener('click', () => {
                let ctrl: number = btn.classList.contains('slider-next') ? 1 : -1,
                    sliders: number = slidersT.length,
                    activo: number = 0;
                for (let i = 0; i < sliders; i++) {
                    if (slidersT[i].classList.contains('is-active')) {
                        activo = i;
                        slidersT[activo].classList.remove('is-active');
                        break;
                    }
                }
                if (ctrl == 1) {
                    activo++;
                    if (activo == slidersT.length) {
                        activo = 0;
                    }
                } else {
                    activo--;
                    if (activo < 0) {
                        activo = slidersT.length - 1;
                    }
                }
                slidersT[activo].classList.add('is-active');
            }, false);
        }
    }
}