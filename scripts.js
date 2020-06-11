'use strict';

let appData = {
    budget: 0,
    expenses: {},
    optionalExpenses: {},
    income: [],
    timeData: '',
    savings: true,
};

start();

alert( detectLevel() );

// chooseOptExpenses();

//  app functions
function start() {
    askMonthlyBudget();
    askTimeData();
    chooseExpenses();
    detectDayBudget();
    checkSavings();
}

function askMonthlyBudget() {
    const message = 'What is your budget for a month?';
    const defaultValue = 'Enter positive number value';

    let money;

    do {
        money = prompt(message, defaultValue);
    } while (!isCorrectNumber(money));

    appData.budget = + parseFloat(money).toFixed(2);
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

function chooseExpenses() {
    const expensesCount = 2;
    const message = 'Such obligatory expenses item already exists!';

    let expenses = {};
    let expenseItem;
    let expenseAmount;

    for (let i = 0; i < expensesCount; i++) {

        expenseItem = askExpenseItem(i);
    
        if (hasExpenseItem(expenses, expenseItem)) {
            alert(message);
            i--;
            continue;
        }
    
        expenseAmount = askExpenseAmount();
    
        expenses[expenseItem] = expenseAmount;
    
    }

    appData.expenses = expenses;
}

function detectDayBudget() {
    const daysInMonth = 30;

    appData.moneyPerDay = Math.round( (appData.budget / daysInMonth) * 100 ) / 100;

    alert('Daily budget: ' + appData.moneyPerDay);
}

function detectLevel() {
    const lowBoundary = 100;
    const highBoundary = 2000;

    const lowMessage = 'Minimal wealth level!';
    const middleMessage = 'Middle wealth level!';
    const highMessage = 'High wealth level!';

    const errorMessage = 'An error has occured!';

    let message;
    let moneyPerDay = appData.moneyPerDay;

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

function checkSavings() {
    if (appData.savings === true) {
        let save = askSaveAmount();
        let percent = askSavePercent();

        let monthlyIncome = save / 100 / 12 * percent;
        appData.monthlyIncome = + parseFloat(monthlyIncome).toFixed(2);

        alert('Montly income from your depostit is: ' + appData.monthlyIncome);
    }
}

function chooseOptExpenses() {
    const optExpensesCount = 3;

    for (let i = 1; i <= optExpensesCount; i++) {
        appData.optionalExpenses[i] = askOptExpenseItem();
    }
}


// secondary functions
function askExpenseItem(i) {
    const message = 'Enter obligatory expenses item name for this month:';

    let item;

    do {
        item = prompt(message);
    } while (!isCorrectString(item));

    return item;
}

function askExpenseAmount() {
    const message = 'How much will it cost for this month?';
    const defaultValue = 'Enter positive number value';

    let expenseAmount;

    do {
        expenseAmount = prompt(message, defaultValue);
    } while (!isCorrectNumber(expenseAmount));

    return + parseFloat(expenseAmount).toFixed(2);
}

function hasExpenseItem(expenses, expenseName) {
    return expenses[expenseName] !== undefined;
}

function askSaveAmount() {
    let message = 'How much does it your accumulations?';
    let defaultValue = 'Enter number value!';
    let amount;

    do {
        amount = prompt(message, defaultValue);
    } while ( !isCorrectNumber(amount) );

    return + parseFloat(amount).toFixed(2);
}

function askSavePercent() {
    let message = 'How much does it percent of your deposit?';
    let defaultValue = 'Enter number value';
    let percent;

    do {
        percent = prompt(message, defaultValue);
    } while ( !isCorrectNumber(percent) );

    return + parseFloat(percent).toFixed(2);
}

function askOptExpenseItem() {
    const message = 'What is your optional expence item?';
    let item;

    do {
        item = prompt(message);
    } while (!isCorrectString(item));

    return item;
}

// helper functions
function isCorrectNumber(data) {
    const minNumber = 0;
    const maxNumber = 5000;

    let isNumber = data !== null && data !== '' && !isNaN(data);
    if ( ! isNumber ) {
        alert('Enter number value!');
        return false;
    }

    let isCorrectNumber = data > minNumber && data < maxNumber;
    if ( ! isCorrectNumber ) {
        alert('Enter number between ' + minNumber + ' and ' + maxNumber + '!');
        return false;
    }

    return true;
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

