window.addEventListener('DOMContentLoaded', function () {

    'use strict';

    let tabContainerClass = '.info-header',
        tabClass = '.info-header-tab',
        tabContentClass = '.info-tabcontent';

    initiate();

    function initiate() {
        tabs(tabContainerClass, tabClass, tabContentClass);
    }

    function tabs(tabContainerClass, tabClass, tabContentClass) {
        let tabContainer = document.querySelector(tabContainerClass);
        let tab = document.querySelectorAll(tabClass);
        let tabContent = document.querySelectorAll(tabContentClass);

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

            if (target && target.classList.contains(tabClass)) {
                hideAllTabContents();
                
                for (let i = 0; i < tab.length; i++) {
                    if (target == tab[i]) {
                        showTabContent(i);
                        return;
                    }
                }
            }
        });

    }

});