$(window).on('load', function() {

  setTimeout(() => {
    $('.loader').hide();
  }, 500);  

  //Складывем меню в бургер и обратно 
  function menuCrop(menu) {
    const items = $(menu).children().first().children('li');
    const menuWidth = $(menu).outerWidth(true);
    const parentWidth = $(menu).parent().width();    
    const siblings = $(menu).siblings();
    const burger = $(menu).find('.burger'); 
    const burgerMenu = $(menu).find('.burger_menu');
    let siblingsWidth = 0;
    for(let sibling of siblings) {
      if($(sibling).is(":visible")) {
        siblingsWidth += $(sibling).outerWidth(true);
      }  
    }
    const maxMenuWidth = parentWidth - siblingsWidth - 20;
    if(menuWidth > maxMenuWidth) {
      $(items).last().attr('data-width', $(items).last().outerWidth(true));
      $(items).last().prependTo(burgerMenu);
      $(burger).addClass('active');
      if(items.length) {
        menuCrop(menu);
      }      
    } else if((maxMenuWidth - menuWidth >= $(burgerMenu).children().first().data('width') - 20)) {      
      $(burgerMenu).children().first().appendTo(menu.children().first());
      if($(burgerMenu).children().length === 0) {
        $(burger).removeClass('active');
      }
    }
    return;
  }

  menuCrop($('.header_menu'));

  //Открытие вложенных меню
  $('.header_menu-list > .header_submenu').mouseenter(function() {
    $(this).addClass('active');
  });

  $('.header_submenu').click(function() {
    $(this).toggleClass('active');
  });

  $('.header_menu .burger').mouseenter(function() {
    $(this).find('.popup-menu').addClass('active');
  });

  //Закрытие вложенных меню
  $('.header_menu-list > .header_submenu').mouseleave(function() {
    $(this).removeClass('active');
  });
  $('.header_menu .burger').mouseleave(function() {
    $(this).find('.popup-menu').removeClass('active');
  });

  //Открытие/закрытие sidebar
  $('.mobile_burger').click(function() {
    $('.mobile_burger .burger_icon').toggleClass('active');
    $('.mobile_sidebar').toggleClass('active');
    $('.submenu').removeClass('active');
  });

  //Открытие вложенных меню в sidebar
  $('.mobile_submenu').click(function(e) {
    if(e.target === e.currentTarget) {
      $(this).find('.submenu').addClass('active');
    }
  });

  //Открытие вложенных меню в sidebar
  $('.submenu_back').click(function() {
    $(this).closest('.submenu').removeClass('active')
  });

  //Активация анимации
  function animateActivate() {
    const elementsFind = $('.animate:not(.animated)');
    if(elementsFind.length) {
      $(elementsFind).each(function(index, element) {
        const parent = $(element).closest('.animate_parent');
        if(parent[0].getBoundingClientRect().top <= 0 || parent[0].getBoundingClientRect().bottom <= $(window).height()) {          
          $(element).addClass('animated');
        }
      });
    }
  }

  setTimeout(() => {
    animateActivate();  
  }, 500);
  

  // Переключение табов
  $('.tab').click(function() {
    $(this).closest('.tabs_container').find('.tab').removeClass('active');
    $(this).addClass('active');
    $(this).closest('.tabs_container').find('.tab_content').removeClass('active');
    $(this).closest('.tabs_container').find(`.tab_content[data-id="${$(this).data('tab')}"]`).addClass('active');
  });

  //Инициализация слайдера Инвентарь на главной
  if($('.inventory_slider').length) {
    tns({
      container: '.inventory_slider',
      items: 1,
      controls: true,
      nav: false,
      controlsContainer: '.inventory_slider-nav',
      gutter: 32,
      mouseDrag: true,
      responsive: {
        480: {
          items: 2,
          gutter: 32
        },
        800: {
          items: 3,
          gutter: 32
        },
        1300: {
          items: 4,
          gutter: 32
        }
      }
    });
  }

  //Инициализация слайдера Преимущества на главной
  if($('.advantages_slider').length) {
    tns({
      container: '.advantages_slider',
      items: 1,
      controls: true,
      nav: false,
      controlsContainer: '.advantages_slider-nav',
      gutter: 32,
      mouseDrag: true,
      responsive: {
        480: {
          items: 2,
          gutter: 32,
        },
        800: {
          items: 3,
          gutter: 32
        },
        1300: {
          items: 4,
          gutter: 32
        }
      }
    });
  }

  //Открываем/закрываем шаги в оформлении
  $('.step_number').click(function() {
    if($(this).closest('.registration_step').hasClass('active')) {
      $('.registration_step').removeClass('active');
    } else {
      $('.registration_step').removeClass('active');
      $(this).closest('.registration_step').addClass('active');
    }    
  });

  $('.step_content').click(function() {
    if($(this).closest('.registration_step').hasClass('active')) {
      $('.registration_step').removeClass('active');
    } else {
      $('.registration_step').removeClass('active');
      $(this).closest('.registration_step').addClass('active');
    } 
  });

  //Выстраиваем шаги по диагонали
  function diagonalSteps() {
    if($('.registration_content').length) { 
        if($(window).width() > 1120) {
        const countSteps = $('.registration_content').children().length - 1;
        const freeSpace = ($('.registration_content').width() - ($('.registration_content .step_number').width() * countSteps)) / countSteps + $('.registration_content .step_number').width();
        const steps = $('.registration_step');
        for(let i = 1; i < steps.length; i++) {  
          $(steps[i]).css('paddingLeft', freeSpace * i);        
          if($(steps[i]).innerWidth() >= $('.registration_content').width()) {
            $(steps[i]).addClass('registration_step__left');
            const newPadding = (freeSpace * i) - $(steps[i]).find('.step_content').width() - $(steps[i]).width();
            $(steps[i]).css('paddingLeft', newPadding);
          } else {
            $(steps[i]).removeClass('registration_step__left');
            $(steps[i]).css('paddingLeft', freeSpace * i); 
          }
        }
      } else {
        $('.registration_step').attr('style', '');
        $('.registration_step').removeClass('registration_step__left');
      }
    }
  }
  diagonalSteps();

  //Отрисовка рейтинга
  function drawRating() {
    $('.review_item-rating').each(function(index, element) {
      $(element).attr('style', '');
      $(element).width($(element).data('rating') * ($(element).width() / 5));
    });
  }
  setTimeout(() => {
    drawRating();
  }, 10);
  

  //Инициализация слайдера Отзывы
  if($('.reviews_slider').length) {
    tns({
      container: '.reviews_slider',
      items: 1,
      controls: true,
      nav: false,
      controlsContainer: '.reviews_slider-nav',
      gutter: 32,
      mouseDrag: true,
      responsive: {
        1024: {
          items: 2,
          gutter: 32
        }
      }
    });
  }

  //Инициализация слайдера наши работы
  if($('.work_slider').length) {
    $('.work_slider').each(function() {
      const tab = $(this).closest('[data-id]').data('id');
      tns({
        container: `[data-id="${tab}"] .work_slider`,
        items: 1,
        controls: true,
        nav: false,
        controlsContainer: `[data-id="${tab}"] .work_slider-nav`,
        gutter: 32,
        mouseDrag: true,
        responsive: {
          1024: {
            items: 2,
            gutter: 32
          }
        }
      });
    });    
  }

  $(window).scroll(function() {
    animateActivate();
  });

  $(window).resize(function() {
    menuCrop($('.header_menu'));
    diagonalSteps();
    drawRating();
  });

  ymaps.ready(init);
  function init(){
    var myMap = new ymaps.Map("map", {
      center: [56.174595, 37.508],
      zoom: 16,
      controls: []
    });
    myMap.behaviors.disable('scrollZoom');
    var placemark = new ymaps.Placemark([56.174595, 37.508894], {
      balloonContent: "Набережная улица, 10"
    }, {
        iconColor: '#ff0000'
    });
    myMap.geoObjects.add(placemark);
  }


  let bg = document.querySelectorAll('.fog');
  for (let i = 0; i < bg.length; i++){
    window.addEventListener('mousemove', function(e) { 
        let x = e.clientX / window.innerWidth;
        let y = e.clientY / window.innerHeight;     
        bg[i].style.transform = 'translate(-' + x * 50 + 'px, -' + y * 50 + 'px)';
    });    
  }

  let mask = document.querySelectorAll('.ski_mask');
  for (let i = 0; i < mask.length; i++){
    window.addEventListener('mousemove', function(e) { 
        let x = e.clientX / window.innerWidth;
        let y = e.clientY / window.innerHeight;     
        mask[i].style.transform = 'translate(-' + x * 50 + 'px, -' + y * 50 + 'px)';
    });    
  }

  $('[data-modal]').click(function() {
    const modal = $(this).data('modal');
    $('.overlay').addClass('active')
    $(`.modal[data-id="${modal}"]`).addClass('active');
  });

  $('.overlay').click(function() {
    $('.overlay').removeClass('active');
    $('.modal').removeClass('active');
  });

  $(document).keyup(function(e) {
    if (e.key === "Escape") {
      $('.overlay').removeClass('active');
      $('.modal').removeClass('active');
    }
  });

  $('.modal .close').click(function() {
    $('.overlay').removeClass('active');
    $('.modal').removeClass('active');
  });

  //Работа калькулятора
  // Переключение дней 
  $('.calculator_time > *').click(function() {
    $('.calculator_time > *').removeClass('active');
    $(this).addClass('active');
    if($(this).hasClass('button_time')) {
      $('.input_time').val('');
      $('.input_time').data('day', 0);
    }
    calculating();
  });

  $('.input_time').on('input', function() {
    if($(this).val() <= 0) {
      $(this).val('1');
    } else if($(this).val() > 30) {
      $(this).val('30');
    }
    $(this).data('day', $(this).val());
    calculating();
  })

  //Переключение количества инвентаря
  function autoWidthInput(input) {
    $(input).css('width', $(input).val().length * 11);
  }

  function checkActiveInput(input) {
    if($(input).val() > 0) {
      $(input).closest('.calculator_inventory-item').addClass('active');
    } else {
      $(input).closest('.calculator_inventory-item').removeClass('active');
    }
  }

  //Нажатие на плюс
  $('.calculator_inventory-plus').click(function() {
    const input = $(this).siblings('.calculator_inventory-number');
    const count = $(input).val();
    if(count < 99) {
      $(input).val(Number(count) + 1);
    }    
    autoWidthInput(input);
    checkActiveInput(input);
    calculating();
  });

  //Нажатие на минус
  $('.calculator_inventory-minus').click(function() {
    const input = $(this).siblings('.calculator_inventory-number');
    const count = $(input).val();
    if(count > 0) {
      $(input).val(Number(count) - 1);
    }
    autoWidthInput(input);
    checkActiveInput(input);
    calculating();
  });

  //Вешаем события на изменения инпута
  $('.calculator_inventory-number').each(function(index, item) {
    autoWidthInput(item);
    checkActiveInput(item);
    $(item).on('input', function() {
      const count = $(item).val();
      if(count < 99) {
        $(item).val(Number($(item).val()));
      } else {
        $(item).val(99);
      }
      autoWidthInput(item);
      checkActiveInput(item);
      calculating();
    });

    $(item).on('change', function() {
      if(!$(item).val().length) {
        $(item).val('0')
      } else {
        $(item).val(Number($(item).val())) 
      }
      autoWidthInput(item);
      checkActiveInput(item);
      calculating();
    });
  });

  //Подсчет итоговой суммы
  function calculating() {
    let result = 0;
    const days = Number($('.calculator_time .active').data('day'));    
    $('.calculator_inventory-number').each(function(index, item) {
      if($(item).val() > 0) {
        const sumOfDay = days <= 7 ? Number($(item).data(`${days}`)) : Math.round(Number($(item).data('7')) / 7 * days);
        result += sumOfDay * $(item).val();
      }      
    });

    if(isNaN(result)) {
      result = 0;
    }
    $('.calculator_sum').text(formatNumber(result));
  }

  function formatNumber(number) {
    return String(number).split('').reverse().map((item, index) => ((index + 1) % 3) ? item : ' ' + item).reverse().join('');
  }

  //Открытие/закрытие вопросов
  $('.faq-item').click(function() {
    const open = $(this).hasClass('active');
    $('.faq-item').removeClass('active');
    if(!open) {
      $(this).addClass('active');
    }
  });

  //Скрытие лишних пунктов пагинации
  if($('.pagination_items').length) {
    $('.pagination_items').each(function() {
      const activeIndex = $(this).find('.pagination_item').index($('.pagination_item.active'));
      const paginationLength = $(this).find('.pagination_item').length;      
      $(this).find('.pagination_item').each(function(index, element) {    
        if ((activeIndex === 0 && index > 3) || (activeIndex == 1 && index > 3)) {          
          $(element).hide();
        } else if (activeIndex === paginationLength-1 && index < paginationLength - 4) {
          $(element).hide();
        } else if ((activeIndex > 1 && activeIndex < paginationLength-1) && (index < activeIndex - 2 || index > activeIndex + 1)) {
          $(element).hide();
        }
      });
    });
  }

  //Инициализация слайдера галерея на детальной странице блога
  if($('.detail_slider').length) {
    tns({
      container: '.detail_slider',
      items: 1,
      controls: true,
      nav: false,
      controlsContainer: '.detail_slider-nav',
      gutter: 32,
      mouseDrag: true,
      responsive: {
        668: {
          items: 2,
          gutter: 32
        }
      }
    });
  }

  //Подкраска наведенного столбца в ценах
  $('.prices_col:not(:first-child)').on('mouseenter', function() {
    const col = $(this).index()
    $('.prices_row').each(function(i, row) {
      $(row).find(`.prices_col:nth-child(${col + 1})`).addClass('price_hover');
    });
  });

  $('.prices_col:not(:first-child)').on('mouseleave', function() {
    const col = $(this).index()
    $('.prices_row').each(function(i, row) {
      $(row).find(`.prices_col:nth-child(${col + 1})`).removeClass('price_hover');
    });
  });

  //Открытие/закрытие цен мобильного прайса
  $('.prices_head').click(function() {
    const hasActive = $(this).closest('.prices_section').hasClass('active');
    $('.prices_section').removeClass('active');
    if(!hasActive) {
      $(this).closest('.prices_section').addClass('active');
    }
  });

  //Инициализация слайдера галерея в модальном окне
  if($('.gallery_slider').length) {
    tns({
      container: '.gallery_slider',
      items: 1,
      controls: true,
      nav: false,
      controlsContainer: '.gallery_slider-nav',
      gutter: 32,
      mouseDrag: true,
      responsive: {
        668: {
          items: 2,
          gutter: 32
        }
      }
    });
  }
});