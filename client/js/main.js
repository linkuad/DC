window.onload = function () {
    sliderBtn();
    slider();
}
let sliderSet = {
    page: 1,
    interval: 3 * 1000,
}

const sliderBtn = _ => {
    const categories = document.querySelector('.categoryItems').children;
    categories[0].style.backgroundPosition = 'left';
    categories[0].style.transition = sliderSet.interval / 1000 + 's';
    for (var i = 0; i < categories.length; i++) {
        categories[i].addEventListener('mouseover', function () {
            sliderSet.page = Array.prototype.indexOf.call(this.parentNode.children, this);
            for (var i = 0; i < categories.length; i++) {
                if (i == sliderSet.page) {
                    categories[sliderSet.page].style.backgroundPosition = 'left';
                    categories[sliderSet.page].style.transition = '0.5s';
                } else {
                    categories[i].style.backgroundPosition = 'right';
                    categories[i].style.transition = '0.5s';
                }
            }
            document.querySelector('.stackDetail').style.marginLeft = '-' + (sliderSet.page * 100) + '%';
        })
        categories[i].addEventListener('mouseout', function () {
            this.style.backgroundPosition = 'right';
            this.style.transition = sliderSet.interval / 1000 + 's';
        })
    }
}
const slider = _ => {
    const stack = document.querySelector('.stackDetail');
    const categories = document.querySelector('.categoryItems');
    stack.style.width = (stack.childElementCount * 100) + "%";
    let slide = setInterval(function () {
        stack.style.marginLeft = '-' + (sliderSet.page * 100) + '%';
        for (var i = 0; i < categories.children.length; i++) {
            if (i == sliderSet.page) {
                categories.children[sliderSet.page].style.backgroundPosition = 'left';
                categories.children[sliderSet.page].style.transition = sliderSet.interval / 1000 + 's';
            } else {
                categories.children[i].style.backgroundPosition = 'right';
                categories.children[i].style.transition = '0.5s';
            }
        }
        if (sliderSet.page == stack.childElementCount - 1) {
            sliderSet.page = 0;
        } else {
            sliderSet.page++;
        }
    }, sliderSet.interval)
    categories.addEventListener('mouseover', () => clearInterval(slide))
    categories.addEventListener('mouseout', slider);
}