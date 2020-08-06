/*jshint esversion: 6 */
window.addEventListener('DOMContentLoaded', function () {

    'use strict';

    let tabContainer = document.querySelector('.info-header'),
        tab = document.querySelectorAll('.info-header-tab'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    let hoursElement = document.querySelector('.hours'),
        minutesElement = document.querySelector('.minutes'),
        secondsElement = document.querySelector('.seconds');

    const deadline = '2020-07-06';

    let btnModalOpen = document.querySelector('.more'),
        modalWindow = document.querySelector('.overlay'),
        btnModalClose = document.querySelector('.popup-close'),
        infoContainer = document.querySelector('.info');

    initiate();

    function initiate() {
        tabs();
        timer();
        modal();
        sendFormData();
        slider();
    }   

    function timer() {
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

        tabContainer.addEventListener('click', (event) => {
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

    }

    function modal() {
        btnModalOpen.addEventListener('click', (event) => {
            callModalWindow(event.target);
        });

        infoContainer.addEventListener('click', (event) => {
            let target = event.target;

            if (target && target.classList.contains('description-btn')) {
                callModalWindow(target);
            }
        });

        btnModalClose.addEventListener('click', () => {
            modalWindow.style.display = 'none';
            btnModalOpen.classList.remove('more-splash');
            document.body.style.overflow = '';
        });

        function callModalWindow(btnOpen) {
            modalWindow.style.display = 'block';

            let statusMessage = modalWindow.querySelector('.status');
            if (statusMessage) {
                statusMessage.remove();
            }

            btnOpen.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        }
    }

    function sendFormData() {
        let statusMessage = document.createElement('div');
        statusMessage.classList.add('status');

        let form = document.getElementsByTagName('form');
        let input = [];

        for (let i = 0; i < form.length; i++) {
            input[i] = form[i].getElementsByTagName('input');

            form[i].addEventListener('submit', function() {formSubmitCallback(event, form[i], input[i], statusMessage);});
        }

        function formSubmitCallback(event, form, input, statusMessage) {
            event.preventDefault();
            form.appendChild(statusMessage);
    
            let formData = new FormData(form);
            let json = prepareFormDataToSend(formData);
            
            sendData(json, statusMessage, input);
        }

        function prepareFormDataToSend(formData) {
            let obj = {};
            formData.forEach(function(value, key) {
                obj[key] = value;
            });
            
            return JSON.stringify(obj);
        }

        function sendData(json, statusMessage, input) {
            let message =  {
                loading: 'Loading...',
                success: 'Thank you! Soon we\'ll connect to you!',
                failure: 'Something wrong...',
            };

            function postData(json) {
                return new Promise(function(resolve, reject) {
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

                    request.addEventListener('readystatechange', function() {
                        if (request.readyState < 4) {
                            resolve();
                        } else if (request.readyState === 4 && request.status === 200) {
                            resolve();
                        } else {
                            reject();
                        }
                    });

                    // request.send(formData);
                    request.send(json);

                });
            }

            postData(json, statusMessage)
                .then(() => statusMessage.innerHTML = message.loading)
                .then(() => statusMessage.innerHTML = message.success)
                .catch(() => statusMessage.innerHTML = message.failure)
                .then(clearFormInput(input));
        }

        function clearFormInput(input) {
            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        }

    }

    function slider() {
        let currentSliderId = 0,
            sliderStep = 1,
            sliderItems = document.querySelectorAll('.slider-item'),
            prev = document.querySelector('.prev'),
            next = document.querySelector('.next'),
            dotsWrapper = document.querySelector('.slider-dots'),
            dots = document.querySelectorAll('.dot');

        function showSlide() {
            if (currentSliderId > sliderItems.length -1) {
                currentSliderId = 0;
            }
            if (currentSliderId < 0) {
                currentSliderId = sliderItems.length - 1;
            }

            sliderItems.forEach(item => item.style.display = 'none');
            dots.forEach(item => item.classList.remove('dot-active'));

            sliderItems[currentSliderId].style.display = 'block';
            dots[currentSliderId].classList.add('dot-active');
        }

        function nextSlider(step) {
            currentSliderId += step;
            showSlide(); 
        }

        next.addEventListener('click', function() {
            nextSlider(sliderStep);
        });
        prev.addEventListener('click', function() {
            nextSlider(-sliderStep);
        });

        dotsWrapper.addEventListener('click', function(event) {

            for (let i = 0; i < dots.length; i++) {
                if (
                    event.target.classList.contains('dot') &&
                    dots[i] == event.target
                ) {
                    currentSliderId = i;
                    showSlide();
                }
            }

        });

        showSlide();
    }

    (function calculator() {
        let personsValue = document.querySelectorAll('.counter-block-input')[0],
            daysValue = document.querySelectorAll('.counter-block-input')[1],
            placeValue = document.getElementById('select'),
            totalValue = document.getElementById('total'),
            personSum = 0,
            daysSum = 0,
            placeSum = placeValue.value;

        function displayTotalSum() {
            let totalSum = +(personSum * daysSum * placeSum * 400);
            totalValue.innerHTML =  totalSum;
        }
        
        displayTotalSum();

        personsValue.addEventListener('change', function() {
            personSum = +this.value;
            displayTotalSum();
        });

        daysValue.addEventListener('change', function() {
            daysSum = +this.value;
            displayTotalSum();
        });

        placeValue.addEventListener('change', function() {
            placeSum = +this.value;
            displayTotalSum();
        });
    })();
    

    

    

    



});