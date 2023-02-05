/* import * as functions from './modules/functions.js'; //импорт всех функций */
/* import Swiper, { Navigation, Pagination } from 'swiper'; //импорт свайпера */
/* import delegationClick from './modules/script.js';
functions.isWebp(); //запуск функции определения поддержки webp */

window.onload = function(){
    const header = document.querySelector('.header');
    if(header){
        if(window.scrollY){
            header.classList.add('scroll');
        }
        window.addEventListener('scroll', function(e){
            if(window.scrollY){
                header.classList.add('scroll');
            } else{
                header.classList.remove('scroll');
            }
        })
    }

    document.addEventListener('click', documentActions)
    function documentActions(e) {
        const targetElement = e.target;



        
        //Меню бургер
        if (targetElement.closest('.menu__icon')) {
            targetElement.closest('.menu__icon').classList.toggle('active');
            document.querySelector('.menu__body').classList.toggle('open');
            document.body.classList.toggle('lock');
        }
        //Плавный скролл навигации
/*         if (targetElement.closest('[data-goto]')){
            const link = targetElement.closest('[data-goto]');
            const goToBlock = document.querySelector(link.dataset.goto);
            if(goToBlock){
                let goToBlockValue = goToBlock.getBoundingClientRect().top + scrollY;
                const header = document.querySelector('.header');
                if(header){
                    goToBlockValue -= header.offsetHeight;
                }
                window.scrollTo({
                    top: goToBlockValue,
                    behavior: "smooth"
                });
                e.preventDefault();
            }
        } */
    }
}