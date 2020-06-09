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
    let money;

    do {
        money = prompt('What is your budget for a month?', 'Enter number value');
    } while (isEmptyNumber(money));
    money = parseFloat(money);

    return money;
}

function getTimeDataFromUser() {
    let time;

    do {
        time = prompt('Enter date in format YYYY-MM-DD', 'Format is obligatory');
        console.log(time);
        console.log(hasCorrectTimeFormat(time));
    } while (!hasCorrectTimeFormat(time));

    return time;
}

function getExpensesFromUser() {
    const obligatoryExpensesCount = 2;

    let expenses = {};
    let obligatoryExpenseName;
    let obligatoryExpenseAmount;

    for (let i = 0; i < obligatoryExpensesCount; i++) {

        obligatoryExpenseName = getObligatoryExpenseNameFromUser(i);
    
        if (existsObligatoryExpenceName(expenses, obligatoryExpenseName)) {
            alert('Error: "' + obligatoryExpenseName + '" - such obligatory expenses item already exists!');
            i--;
            continue;
        }
    
        obligatoryExpenseAmount = getObligatoryExpenceAmountFromUser(obligatoryExpenseName);
    
        expenses[obligatoryExpenseName] = obligatoryExpenseAmount;
    
    }

    return expenses;
}

function getObligatoryExpenseNameFromUser(i) {
    let obligatoryExpenseName;
    let promptMessage;
    let another;

    another = i > 0 ? ' another ' : ' ';
    promptMessage = 'Enter' + another + 'obligatory expenses item name for this month:';

    do {
        obligatoryExpenseName = prompt(promptMessage, '');
    } while (!isNotEmptyString(obligatoryExpenseName));

    return obligatoryExpenseName;
}

function getObligatoryExpenceAmountFromUser(obligatoryExpenseName) {
    let obligatoryExpenseAmount;

    do {
        obligatoryExpenseAmount = prompt('How much will it cost ' + obligatoryExpenseName + ' for this month?', 'Enter number value');
    } while (isEmptyNumber(obligatoryExpenseAmount));

    return parseFloat(obligatoryExpenseAmount);
}

function existsObligatoryExpenceName(expenses, obligatoryExpenseName) {
    return expenses[obligatoryExpenseName] !== undefined;
}

function getDailyBudget(appData) {
    let dailyBudget;
    let budget = appData.budget;

    const daysInMonth = 30;

    dailyBudget = Math.round( (budget / daysInMonth) * 100 ) / 100;

    return dailyBudget;
}