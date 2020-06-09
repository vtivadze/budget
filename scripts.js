'use strict';

let money = askMonthlyBudget();
let time = askTimeData();

let appData = {
    budget: money,
    expenses: {},
    optionalExpenses: {},
    income: [],
    timeData: time,
    savings: false,
};

appData.expenses = askExpenses();
appData.moneyPerDay = getMoneyPerDay(appData);

alert('Daily budget: ' + appData.moneyPerDay);

console.log( getWealthLevel(appData.moneyPerDay) );


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

function askMonthlyBudget() {
    const message = 'What is your budget for a month?';
    const defaultValue = 'Enter positive number value';

    let money;

    do {
        money = prompt(message, defaultValue);
    } while (!isCorrectNumber(money));

    return parseFloat(money);
}

function askTimeData() {
    const message = 'Enter date in format YYYY-MM-DD';
    const defaultValue = 'Format is obligatory';

    let time;

    do {
        time = prompt(message, defaultValue);
    } while (!hasCorrectTimeFormat(time));

    return time;
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

    return expenses;
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

function getMoneyPerDay(appData) {
    let dailyBudget;
    let budget = appData.budget;

    const daysInMonth = 30;

    dailyBudget = Math.round( (budget / daysInMonth) * 100 ) / 100;

    return dailyBudget;
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