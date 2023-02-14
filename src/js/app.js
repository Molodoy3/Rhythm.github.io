import Swiper, { Pagination, Controller, Thumbs } from 'swiper';

window.onload = function () {

    const imageSlider = document.querySelector('.image-slider-customers');
    const textSlider = document.querySelector('.text-slider-customers');
    const infoSlider = document.querySelector('.info-client-customers');

    if (imageSlider && textSlider && infoSlider) {
        const textSwiper = new Swiper(textSlider, {
            modules: [Controller],
            wrapperClass: 'text-slider-customers__wrapper',
            slideClass: 'text-slider-customers__slide',
            direction: 'horizontal',
            observer: true,
            observeParents: true,
            observeSlideChildren: true,
            loop: true,
            slidesPerView: 1,
            speed: 800,
            spaceBetween: 50,
            allowTouchMove: false,
            autoHeight: true,
        });

        const infoSwiper = new Swiper(infoSlider, {
            modules: [Pagination, Controller, Thumbs],
            wrapperClass: 'info-client-customers__wrapper',
            slideClass: 'info-client-customers__body',
            direction: 'horizontal',
            observer: true,
            observeParents: true,
            observeSlideChildren: true,
            loop: true,
            slidesPerView: 1,
            speed: 800,
            spaceBetween: 50,
            autoHeight: true,
            pagination: {
                el: '.slider-customrers__navigation',
                clickable: true
            },
            thumbs: {
                swiper: {
                    el: imageSlider,
                    modules: [Thumbs],
                    el: '.image-slider-customers',
                    wrapperClass: 'image-slider-customers__wrapper',
                    slideClass: 'image-slider-customers__slide',
                    direction: 'horizontal',
                    observer: true,
                    observeParents: true,
                    observeSlideChildren: true,
                    slidesPerView: 1,
                    speed: 800,
                    spaceBetween: 50,
                    allowTouchMove: false,
                    autoHeight: true,
                }
            }
        });

        infoSwiper.controller.control = textSwiper;
        textSwiper.controller.control = infoSwiper;
    }

    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY) {
            header.classList.add('scroll');
        }
        window.addEventListener('scroll', function (e) {
            if (window.scrollY) {
                header.classList.add('scroll');
            } else {
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
        if (targetElement.closest('[data-goto]')) {
            if(targetElement.closest('.menu__link')){
                document.querySelector('.menu__body').classList.remove('open');
                document.querySelector('.menu__icon').classList.remove('active');
                document.body.classList.remove('lock');
            }
            const link = targetElement.closest('[data-goto]');
            const goToBlock = document.querySelector(link.dataset.goto);
            if (goToBlock) {
                let goToBlockValue = goToBlock.getBoundingClientRect().top + scrollY;
                const header = document.querySelector('.header');
                if (header) {
                    goToBlockValue -= header.offsetHeight;
                }
                window.scrollTo({
                    top: goToBlockValue,
                    behavior: "smooth"
                });
                e.preventDefault();
            }
        }
    }

    const brands = document.querySelector('.brands');
    if (brands && !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
        .test(navigator.userAgent))) {

        const brandsRow = document.querySelector('.brands__items');
        const brandsItems = document.querySelectorAll('.brands__item');

        const speed = brands.dataset.speed;

        let positionX = 0;
        let coordXprocent = 0;

        function setMouseGalleryStyle() {
            let brandsItemsWidth = 0;
            brandsItems.forEach(element => {
                brandsItemsWidth += element.offsetWidth;
            });

            const brandsDifferent = brandsItemsWidth - brands.offsetWidth;
            const distX = Math.floor(coordXprocent - positionX);

            positionX = positionX + (distX * speed);
            let position = brandsDifferent / 200 * positionX;

            brandsRow.style.cssText = `transform: translate3d(${position}px,0,0);`;
            /*  console.log(coordXprocent); */

            if (Math.abs(distX) > 0) {
                requestAnimationFrame(setMouseGalleryStyle);
            } else {
                brands.classList.remove('init');
            }
        }
        brands.addEventListener("mousemove", function (e) {
            const brandsWidth = brands.offsetWidth;

            const coordX = e.pageX - brandsWidth / 2;
            coordXprocent = coordX / brandsWidth * 200;
            if (!brands.classList.contains('init')) {
                requestAnimationFrame(setMouseGalleryStyle);
                brands.classList.add('init');
            }
        });
    } else {
        brands.classList.add('mobile');
    }

    const animItems = document.querySelectorAll('.anim-item');
    if (animItems.length > 0) {
        window.addEventListener('scroll', animOnScroll);
        function animOnScroll() {
            for (let index = 0; index < animItems.length; index++) {
                const animItem = animItems[index];
                const animItemHeight = animItem.offsetHeight;
                const animItemOffset = offset(animItem).top;
                const animStart = 4;

                let animItemPoint = window.innerHeight - animItemHeight / animStart;
                if (animItemHeight > window.innerHeight) {
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                }

                if ((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight)) {
                    animItem.classList.add('active');
                } else {
                    if (!animItem.classList.contains('anim-no-hide')) {
                        animItem.classList.remove('active');
                    }

                }
            }
        }
        function offset(el) {
            const rect = el.getBoundingClientRect(),
                scrollLeft = window.scrollX || document.documentElement.scrollLeft,
                scrollTop = window.scrollY || document.documentElement.scrollTop;
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
        }
        setTimeout(() => {
            animOnScroll();
        }, 300);
    }
}