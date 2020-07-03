window.addEventListener('DOMContentLoaded', function () {

    'use strict';

    let tabContainerClass = '.info-header',
        tabClass = '.info-header-tab',
        tabContentClass = '.info-tabcontent';

    let timerContainerId = 'timer',
        hoursClass = '.hours',
        minutesClass = '.minutes',
        secondsClass = '.seconds',
        deadline = '2020-07-06';

    initiate();

    function initiate() {
        tabs(tabContainerClass, tabClass, tabContentClass);
        timer(timerContainerId, hoursClass, minutesClass, secondsClass, deadline);
    }

    function timer(timerContainerId, hoursClass, minutesClass, secondsClass, deadline) {
        let timerContainer = document.getElementById(timerContainerId);
        let hoursElement = timerContainer.querySelector(hoursClass);
        let minutesElement = timerContainer.querySelector(minutesClass);
        let secondsElement = timerContainer.querySelector(secondsClass);

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
            }

            return {
                milliseconds,
                seconds,
                minutes,
                hours,
            };
        }
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