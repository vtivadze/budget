
'use strict';

let startBtn = document.getElementById('start');

let budgetValue = document.querySelector('.budget-value');
let dayBudgetValue = document.querySelector('.daybudget-value');
let levelValue = document.querySelector('.level-value');
let expensesValue = document.querySelector('.expenses-value');
let optionalExpensesValue = document.querySelector('.optionalexpenses-value');
let incomeValue = document.querySelector('.income-value');
let monthSavingsValue = document.querySelector('.monthsavings-value');
let yearSavingsValue = document.querySelector('.yearsavings-value');
    
let expensesItem = document.querySelectorAll('.expenses-item');

let expensesBtn = document.getElementsByTagName('button')[0];
let optionalExpensesBtn = document.getElementsByTagName('button')[1];
let countBudgetBtn = document.getElementsByTagName('button')[2];
    
let optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item');
    
let chooseIncome = document.querySelector('.choose-income');
let checkSavings = document.querySelector('.checksavings input');
let sumValue = document.querySelector('.choose-sum');
let percentValue = document.querySelector('.choose-percent');
let yearValue = document.querySelector('.year-value');
let monthValue = document.querySelector('.month-value');
let dayValue = document.querySelector('.day-value');

let appData = {
    budget: 0,
    expenses: {},
    optionalExpenses: {},
    income: [],
    timeData: '',
    savings: false,

    messages: {
        monthlyBudget: 'What is your budget for a month?',
        timeData: 'Enter date in format YYYY-MM-DD',
        emptyExpenseItem: 'Expense item is required',
        emptyExpenseAmount: 'Expense amount is required',
        chooseExpenses: 'Such obligatory expenses item already exists!',
        lowLevel: 'Minimal wealth level!',
        middleLevel: 'Middle wealth level!',
        highLevel: 'High wealth level!',
        errorLevel: 'An error has occured!',
    },

    defaults: {
        monthlyBudget: 'Enter positive number value',
        timeData: 'Format is obligatory',
    },

    settings: {
        decimalDigitCount: 2,
        expensesCount: expensesItem.length / 2,
        daysInMonth: 30,
        lowBoundary: 100,
        highBoundary: 2000,
        optExpensesCount: optionalExpensesItem.length,
        incomeDelimiter: ', ',
    },

    askMonthlyBudget: function () {
        let money = askForCorrectNumber(this.messages.monthlyBudget, this.defaults.monthlyBudget);
        money = + parseFloat(money).toFixed(this.settings.decimalDigitCount);

        appData.budget = money;
        budgetValue.textContent = money;
    },

    askTimeData: function () {
        let time = askForCorrectDate(this.messages.timeData, this.defaults.timeData);
        time = new Date(Date.parse(time));

        appData.timeData = time;
        yearValue.value = time.getFullYear();
        monthValue.value = time.toLocaleString('default', { month: 'long' });
        dayValue.value = time.getDate();
    },

    chooseExpenses: function () {
        let expenses = {};
        let sum = 0;
    
        for (let i = 0; i < this.settings.expensesCount; i++) {
            let item = expensesItem[i * 2].value;

            if (item == '') {
                alert(this.messages.emptyExpenseItem);
                return;
            }
        
            if (this.hasExpenseItem(expenses, item)) {
                alert(this.messages.chooseExpenses);
                return;
            }

            let amount = expensesItem[i * 2 + 1].value;

            if (amount == 0) {
                alert(this.messages.emptyExpenseAmount);
                return;
            }

            amount = + parseFloat(amount).toFixed(this.settings.decimalDigitCount);
            expenses[item] = amount;

            sum += amount;
        }
    
        appData.expenses = expenses;
        expensesValue.textContent = sum;
    },

    detectDayBudget: function () {
        let expensesSum = this.getExpensesSum();
        let budget = appData.budget - expensesSum;

        appData.moneyPerDay = Math.round( (budget / this.settings.daysInMonth) * 100 ) / 100;
        dayBudgetValue.textContent = appData.moneyPerDay;
    },

    getExpensesSum: function () {
        let expensesSum = 0;

        for (let item in this.expenses) {
            expensesSum += this.expenses[item];
        }

        return expensesSum;
    },

    detectLevel: function () {
        let moneyPerDay = appData.moneyPerDay;
    
        if (moneyPerDay < this.settings.lowBoundary) {
            levelValue.textContent = this.messages.lowLevel;
        } else if (moneyPerDay <= this.settings.highBoundary) {
            levelValue.textContent = this.messages.middleLevel;
        } else if (moneyPerDay > this.settings.highBoundary) {
            levelValue.textContent = this.messages.highLevel;
        } else {
            levelValue.textContent = this.messages.errorLevel;
        }

    },

    countSavings: function () {
        let sum = +sumValue.value,
            percent = + percentValue.value;

        let monthlyIncome = sum / 100 / 12 * percent;
        this.monthlyIncome = + parseFloat(monthlyIncome);
        monthSavingsValue.textContent = this.monthlyIncome.toFixed(this.settings.decimalDigitCount);

        let yearIncome = sum / 100 * percent;
        this.yearIncome = + parseFloat(yearIncome);
        yearSavingsValue.textContent = this.yearIncome.toFixed(this.settings.decimalDigitCount);
    },

    chooseOptExpenses: function () {
        for (let i = 0; i < this.settings.optExpensesCount; i++) {
            appData.optionalExpenses[i] = optionalExpensesItem[i].value;
            optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
        }
    },

    chooseIncome: function () {
        let income = chooseIncome.value;
        incomeValue.textContent = income;
        appData.income = income.split(appData.settings.incomeDelimiter);
    },

    hasExpenseItem: function (expenses, expenseName) {
        return expenses[expenseName] !== undefined;
    },

};

// app logic
document.addEventListener('DOMContentLoaded', function () {
    expensesBtn.disabled = true;
    optionalExpensesBtn.disabled = true;
    countBudgetBtn.disabled = true;
});

startBtn.addEventListener('click', function () {
    appData.askTimeData();
    appData.askMonthlyBudget();

    expensesBtn.disabled = false;
    optionalExpensesBtn.disabled = false;
    countBudgetBtn.disabled = false;
});

expensesBtn.addEventListener('click', function () {
    appData.chooseExpenses();
});

optionalExpensesBtn.addEventListener('click', function () {
    appData.chooseOptExpenses();
});

countBudgetBtn.addEventListener('click', function () {
    if (appData.budget === 0 || appData.budget == undefined) {
        dayBudgetValue.textContent = 'There was an error!';
        alert('First count monthly budget!');
        return;
    }

    appData.detectDayBudget();
    appData.detectLevel();
});

chooseIncome.addEventListener('input', function () {
    appData.chooseIncome();
});

checkSavings.addEventListener('click', function () {
    appData.savings = !appData.savings;
});

sumValue.addEventListener('input', function () {
    if (appData.savings == true && +percentValue.value) {
        appData.countSavings();
    }
});

percentValue.addEventListener('input', function () {
    if (appData.savings == true && +sumValue.value) {
        appData.countSavings();
    }
});

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

// function isCorrectString(data) {
//     const allowedStringLength = 200;

//     return (
//         typeof(data) === 'string' &&
//         data !== '' &&
//         data.length <= allowedStringLength
//     );
// }

function askForCorrectNumber(msg, def) {
    return askFor(msg, def, isCorrectNumber);
}

function askForCorrectDate(msg, def) {
    return askFor(msg, def, hasCorrectTimeFormat);
}

// function askForCorrectString(msg, def) {
//     return askFor(msg, def, isCorrectString);
// }

function askFor(msg, def, check) {
    let dt;

    do {
        dt = prompt(msg, def);
    } while ( !check(dt) );

    return dt;

}



