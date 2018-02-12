	var body = $('body');

/* ===================== Variable con path de archivos .min.css ================== */

	var PATH_CSS = 'https://cdn.jsdelivr.net/npm/kimera@0.4.2/css/';
	var url_include;

/* ================== Condicional para importacion CSS ==================== */

	var include_css = body.attr('km-include');
	if (include_css != null) {
		include_css = body.attr('km-include').split(' ');
		$('head').prepend('<link rel="stylesheet" id="core-kimera" href="'+PATH_CSS+'base.min.css">');
		for (var i = 0; i < include_css.length; i++) {
			if (include_css[i] === 'kimera') {
				$('head').find('#core-kimera').remove();
			}
			url_include = '<link rel="stylesheet" href="'+PATH_CSS+include_css[i]+'.min.css">';
			$('head').append(url_include);
		}
	}

$(document).ready(function(){
/* =================== Componentes y modulos almacenados en variables =====================*/

	var acordeon = $('acordeon');
	var dropdown = $('dropdown');
	var close_button = $('close');
	var checkbox = $('checkbox');
	var form_color = $('color');
	var radio = $('radio');
	var dropmenu = dropdown.find('dropmenu:not(.is-visible)');
	var fab = $('fab');
	var fabmenu = $('fabmenu');
	var navbar_logo = $('logo');
	var navbar_fix = $('navbar[fixed]'); 
	var modal_toggle = $('[modal]');
	var process_bar = $('process');
	var range = $('range');
	var slideshow = $('slideshow');
	var slides = slideshow.find('slides');
	var slide_next = slideshow.find('.next-slide');
	var slide_prev = slideshow.find('.previus-slide');
	var cont_slide = slides.find('picture');
	var tabs = $('tabs');
	var tabs_content = $('tabs-content');
	var toggle_button = $('toggle');


/* ============== Js tabs kimera ================= */

	tabs.find(':first-of-type').addClass('is-active');
	tabs_content.find('tab-content:first-of-type').addClass('is-visible');

	tabs.on('click','tab', function(){
		var tab_active = $(this);
		var tab_container = tab_active.attr('data-id');
		tab_active.addClass('is-active').siblings().removeClass('is-active');
		$(tab_container).addClass('is-visible').siblings().removeClass('is-visible');
	});

/* =================== Js checkbox & radio Kimera ===================== */
	
	checkbox.each(created);
	radio.each(created);
	form_color.each(created);
	process_bar.each(created);
	range.each(created);
	toggle_button.each(created);
	navbar_logo.each(created);

  
/* ================== Js Fab buttons floating ===================== */

	fab.on('click','.is-toggle-fab', function(e){
		e.stopPropagation();
		$(this).siblings('fabmenu').toggleClass('is-visible');
		$(this).parents('body').on('click', function(){
			fabmenu.removeClass('is-visible');
		});
	});

/* ====================== Js modal with custom atribute ========================= */

	modal_toggle.on('click', function(){
		var modal_id = $(this).attr('modal');
		if ($(modal_id).hasClass('is-zoom-in')) {
			$(modal_id).toggleClass('is-visible zoom-in');
		}
		else if ($(modal_id).hasClass('is-slide-up')) {
			$(modal_id).toggleClass('is-visible slide-up');
		}
		else if ($(modal_id).hasClass('is-slide-down')) {
			$(modal_id).toggleClass('is-visible slide-down');
		}
		else {
			$(modal_id).toggleClass('is-visible');
		}
	});

/* ====================== Progress bar ========================= */

	/* function for get progress bar */
	function getProgress() {
		var progress_value = $(this).attr('value');
		return progress_value;
	}

/* ========================== Dropdown ========================= */

	dropdown.on('click','.is-toggle-dropdown', function(e){
		e.stopPropagation();
		$(this).siblings('dropmenu').toggleClass('is-visible');
		$(this).parents().on('click', function(){
			dropmenu.removeClass('is-visible');
		});
	});

/* ========================= Js range control ============================== */
$('range').on('mousedown mousemove','[type="range"]', function(){
	var label = $(this).siblings('label');
	var value_range = $(this).val();
	label.css('left', (value_range - 4)+'%').text(value_range);
});

/* =================== Navbar Js ======================= */

$('navbar').on('click','.is-toggle-navbar', function(){
	$(this).parent().siblings('navmenu').toggleClass('is-visible');
});

/* =================== Js acordeon ===================== */

	acordeon.on('click','acordeon-item', function(e){
		e.stopPropagation();
		$(this).parent().attr('is-multiple') ? $(this).next('content').toggleClass('is-visible')
		:	$(this).next('content').toggleClass('is-visible').siblings('content').removeClass('is-visible');
	});
	body.on('click', function(){
		acordeon.find('content').removeClass('is-visible');
	});

/* ================================================ */
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
});

function created() {
	var element_name = $(this).get(0).localName;
	var id = $(this).attr('id');
  var text = $(this).attr('text');

  var check = $(this).attr('checked');
  var require = $(this).attr('required');
  var form = $(this).attr('form');
  var name = $(this).attr('name');
  var value = $(this).attr('value'); // de input color and process bar used
  if (element_name === 'checkbox' || element_name === 'radio') {
  	$(this).append('<input type="'+ element_name +'"' + ( id ? ' id="' + id + '"' : '') + ( form ? ' form="' + form + '"' : '') + ( name ? ' name="' + name + '"' : '') + ( check ? check : '') + ' ' + ( require ? require : '') +'/><label' + ( id ? ' for="' + id + '"' : '') + '>' + ( text ? text : '') + '</label>');
  } else if (element_name === 'color') {
  	$(this).append('<input type="color"'+ (id ? 'id="' + id + '"' : '') + ( value ? 'value="' + value + '"' : '' ) + '/>');
  } else if (element_name === 'process') {
  	$(this).append('<complete ' + (value ? 'value="' + value + '"' : '') + '></complete>');
  	$(this).find('complete').css('width', getProgress);
  } else if (element_name === 'range') {
  	var range_step = $(this).attr('step');
  	var range_min = $(this).attr('min');
  	var range_max = $(this).attr('max');
  	$(this).append('<input type="'+ element_name +'"' + ( id ? ' id="' + id + '"' : '') + ( form ? ' form="' + form + '"' : '') + ( name ? ' name="' + name + '"' : '') + ( value ? 'value="' + value + '"' : '') + ' ' + ( range_max ? 'max="' + range_max + '"' : '') + ' ' + ( range_min ? 'min="' + range_min + '"' : '') + ' ' + ( range_step ? 'step="' + range_step + '"' : '') +'/><label' + ( id ? ' for="' + id + '"' : '') + '>' + ( value ? + value + '' : '') + '</label>');
  	$(this).find('label').css('left', (value - 4)+'%');
  } else if (element_name === 'toggle') {
  	$(this).append('<input type="checkbox"' + ( id ? ' id="' + id + '"' : '') + ( form ? ' form="' + form + '"' : '') + ( name ? ' name="' + name + '"' : '') + ( check ? check : '') + ' ' + ( require ? require : '') +'/><label' + ( id ? ' for="' + id + '"' : '') + '></label>');
  } else if (element_name === 'logo') {
  	var value_src = $(this).attr('src');
  	$(this).append('<img ' + (value_src ? 'src="' + value_src + '"' : '') + '/>' + (text ? '<span>'+text+'</span>' : ''));
  	$(this).removeAttr('src');
  }
  $(this).removeAttr('id text checked required form name');
}