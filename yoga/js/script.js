window.addEventListener('DOMContentLoaded', function () {

    'use strict';

    let tabContainer = document.querySelector('.info-header');
    let tab = document.querySelectorAll('.info-header-tab');
    let tabContent = document.querySelectorAll('.info-tabcontent');

    function hideAllTabContents() {
        for (let i = 0; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    function showTabContent(index) {
        tabContent[index].classList.remove('hide');
        tabContent[index].classList.add('show');
    }

    hideAllTabContents();
    showTabContent(0);

    tabContainer.addEventListener('click', function (event) {
        let target = event.target;

        if (target && target.classList.contains('info-header-tab')) {
            hideAllTabContents();
            
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    showTabContent(i);
                    return;
                }
            }
        }
    });

});