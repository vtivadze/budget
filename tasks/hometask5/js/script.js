let menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu-item'),
    title = document.getElementById('title'),
    adv = document.querySelector('.adv'),
    column = document.querySelectorAll('.column'),
    promptContainer = document.getElementById('prompt');

// 1
menu.insertBefore(menuItem[2], menuItem[1]);

// 2
let menuItemFifth = document.createElement('li');
menuItemFifth.classList.add('menu-item');
menuItemFifth.textContent = 'Пятый пункт';
menu.appendChild(menuItemFifth);

// 3
document.body.style.background = 'url(../img/apple_true.jpg)';

// 4
title.textContent = 'Мы продаем только подлинную технику Apple';

// 5
column[1].removeChild(adv);

// 6
let attitude = prompt('What is your attitude about Apple products?', '');
promptContainer.textContent = attitude;