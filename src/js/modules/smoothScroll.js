// data-goto = ".class/#id"; (для ссылки и боьлшше ниче не надо, кайф)
const links = document.querySelectorAll('.menu__link[data-goto]');
if (links.length > 0) {
    links.forEach(link => {
        link.addEventListener("click", onMemuLinkClick);
    });

    function onMemuLinkClick(e) {
        const link = e.target;
        if (link.dataset.goto && document.querySelector(link.dataset.goto)) {
            const gotoBlock = document.querySelector(link.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
} 
