'use strict';

let money = getMonthlyBudgetFromUser();
let time = getTimeDataFromUser();

let appData = {
    budget: money,
    expenses: {},
    optionalExpenses: {},
    income: [],
    timeData: time,
    savings: false,
};

appData.expenses = getExpensesFromUser();

alert( getDailyBudget(appData) );


function isEmptyNumber(data) {
    return data === null || data === '' || isNaN(data);
}

function hasCorrectTimeFormat(time) {
    const timeFormat = '^20[0-9]{2}-(0[0-9]{1}|1[0-2]{1})-([0-2]{1}[0-9]{1}|3[0-1]{1})$';
    const regexpTime = RegExp(timeFormat);

    return regexpTime.test(time);
}

function isNotEmptyString(data) {
    return typeof data === 'string' && data !== '';
}

function getMonthlyBudgetFromUser() {
    const message = 'What is your budget for a month?';
    const defaultValue = 'Enter number value';

    let money;

    do {
        money = prompt(message, defaultValue);
    } while (isEmptyNumber(money));
    money = parseFloat(money);

    return money;
}

function getTimeDataFromUser() {
    const message = 'Enter date in format YYYY-MM-DD';
    const defaultValue = 'Format is obligatory';

    let time;

    do {
        time = prompt(message, defaultValue);
    } while (!hasCorrectTimeFormat(time));

    return time;
}

function getExpensesFromUser() {
    const expensesCount = 2;
    const message = 'Such obligatory expenses item already exists!';

    let expenses = {};
    let expenseName;
    let expenseAmount;

    for (let i = 0; i < expensesCount; i++) {

        expenseName = getExpenseNameFromUser(i);
    
        if (existsObligatoryExpenceName(expenses, expenseName)) {
            alert(message);
            i--;
            continue;
        }
    
        expenseAmount = getExpenceAmountFromUser();
    
        expenses[expenseName] = expenseAmount;
    
    }

    return expenses;
}

function getExpenseNameFromUser(i) {
    const message = 'Enter obligatory expenses item name for this month:';
    const defaultValue = 'Number is required';

    let expenseName;

    do {
        expenseName = prompt(message, defaultValue);
    } while (!isNotEmptyString(expenseName));

    return expenseName;
}

function getExpenceAmountFromUser() {
    const message = 'How much will it cost for this month?';
    const defaultValue = 'Enter number value';

    let expenseAmount;

    do {
        expenseAmount = prompt(message, defaultValue);
    } while (isEmptyNumber(expenseAmount));

    return parseFloat(expenseAmount);
}

function existsObligatoryExpenceName(expenses, expenseName) {
    return expenses[expenseName] !== undefined;
}

function getDailyBudget(appData) {
    let dailyBudget;
    let budget = appData.budget;

    const daysInMonth = 30;

    dailyBudget = Math.round( (budget / daysInMonth) * 100 ) / 100;

    return dailyBudget;
}