window.addEventListener('DOMContentLoaded', function () {

    'use strict';

    initiate();

    function initiate() {
        tabs();
        timer();
        modal();
    }   

    function timer() {
        let timerContainer = document.getElementById('.timer'),
            hoursElement = document.querySelector('.hours'),
            minutesElement = document.querySelector('.minutes'),
            secondsElement = document.querySelector('.seconds'),
            deadline = '2020-07-06';

        let timerIntervalId = setInterval(updateTimer, 1000);

        function updateTimer() {
            let timeData = getRemainingTimeData(deadline);

            setTime(timeData);

            if (timeData.milliseconds <= 0) {
                clearInterval(timerIntervalId);
            }
        }

        function setTime(timeData) {
            hoursElement.textContent = timeData.hours;
            minutesElement.textContent = timeData.minutes;
            secondsElement.textContent = timeData.seconds;
        }

        function getRemainingTimeData(deadline) {
            let seconds = '00';
            let minutes = '00';
            let hours = '00';

            let milliseconds = Date.parse(deadline) - Date.parse(new Date());

            if (milliseconds > 0) {
                seconds = Math.floor(milliseconds / 1000) % 60;
                minutes = Math.floor(milliseconds / 1000 / 60) % 60;
                hours = Math.floor(milliseconds / 1000 / 60 / 60);

                seconds = seconds < 10 ? '0' + seconds : seconds;
                minutes = minutes < 10 ? '0' + minutes : minutes;
                hours = hours < 10 ? '0' + hours : hours;
            }

            return {
                milliseconds,
                seconds,
                minutes,
                hours,
            };
        }
    }

    function tabs() {
        let tabContainer = document.querySelector('.info-header'),
            tab = document.querySelectorAll('.info-header-tab'),
            tabContent = document.querySelectorAll('.info-tabcontent');

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

    function modal() {
        let btnModalOpen = document.querySelector('.more'),
            modalWindow = document.querySelector('.overlay'),
            btnModalClose = document.querySelector('.popup-close');

        btnModalOpen.addEventListener('click', function() {
            modalWindow.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });

        btnModalClose.addEventListener('click', function() {
            modalWindow.style.display = 'none';
            btnModalOpen.classList.remove('more-splash');
            document.body.style.overflow = '';
        });
    }



});