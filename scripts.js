'use strict';

let appData = {
    budget: 0,
    expenses: {},
    optionalExpenses: {},
    income: [],
    timeData: '',
    savings: false,
};

start();

alert('Daily budget: ' + appData.moneyPerDay);
console.log( getWealthLevel(appData.moneyPerDay) );

//  app functions
function start() {
    askMonthlyBudget();
    askTimeData();
    askExpenses();
    calcMoneyPerDay();
}

function askMonthlyBudget() {
    const message = 'What is your budget for a month?';
    const defaultValue = 'Enter positive number value';

    let money;

    do {
        money = prompt(message, defaultValue);
    } while (!isCorrectNumber(money));

    appData.budget = parseFloat(money);
}

function askTimeData() {
    const message = 'Enter date in format YYYY-MM-DD';
    const defaultValue = 'Format is obligatory';

    let time;

    do {
        time = prompt(message, defaultValue);
    } while (!hasCorrectTimeFormat(time));

    appData.timeData = time;

}

function askExpenses() {
    const expensesCount = 2;
    const message = 'Such obligatory expenses item already exists!';

    let expenses = {};
    let expenseName;
    let expenseAmount;

    for (let i = 0; i < expensesCount; i++) {

        expenseName = askExpenseName(i);
    
        if (hasExpenseName(expenses, expenseName)) {
            alert(message);
            i--;
            continue;
        }
    
        expenseAmount = askExpenseAmount();
    
        expenses[expenseName] = expenseAmount;
    
    }

    appData.expenses = expenses;
}

function askExpenseName(i) {
    const message = 'Enter obligatory expenses item name for this month:';

    let expenseName;

    do {
        expenseName = prompt(message);
    } while (!isCorrectString(expenseName));

    return expenseName;
}

function askExpenseAmount() {
    const message = 'How much will it cost for this month?';
    const defaultValue = 'Enter positive number value';

    let expenseAmount;

    do {
        expenseAmount = prompt(message, defaultValue);
    } while (!isCorrectNumber(expenseAmount));

    return parseFloat(expenseAmount);
}

function hasExpenseName(expenses, expenseName) {
    return expenses[expenseName] !== undefined;
}

function calcMoneyPerDay() {
    const daysInMonth = 30;

    appData.moneyPerDay = Math.round( (appData.budget / daysInMonth) * 100 ) / 100;
}

function getWealthLevel(moneyPerDay) {
    const lowBoundary = 100;
    const highBoundary = 2000;

    const lowMessage = 'Minimal wealth level!';
    const middleMessage = 'Middle wealth level!';
    const highMessage = 'High wealth level!';

    const errorMessage = 'An error has occured!';

    let message;

    if (moneyPerDay < lowBoundary) {
        message = lowMessage;
    } else if (moneyPerDay <= highBoundary) {
        message = middleMessage;
    } else if (moneyPerDay > highBoundary) {
        message = highMessage;
    } else {
        message = errorMessage;
    }

    return message;
}

// helper functions
function isCorrectNumber(data) {
    const minNumber = 0;
    const maxNumber = 5000;

    let isNumber = data !== null && data !== '' && !isNaN(data);
    let isCorrectNumber = data > minNumber && data < maxNumber;

    return isNumber && isCorrectNumber;
}

function hasCorrectTimeFormat(time) {
    const timeFormat = '^20[0-9]{2}-(0[0-9]{1}|1[0-2]{1})-([0-2]{1}[0-9]{1}|3[0-1]{1})$';
    const regexpTime = RegExp(timeFormat);

    return regexpTime.test(time);
}

function isCorrectString(data) {
    const allowedStringLength = 50;

    return (
        typeof(data) === 'string' &&
        data !== '' &&
        data.length <= allowedStringLength
    );
}

