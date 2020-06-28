(function () {
    'use strict';

    let appData = {
        budget: 0,
        expenses: {},
        optionalExpenses: {},
        income: [],
        timeData: '',
        savings: true,

        messages: {
            monthlyBudget: 'What is your budget for a month?',
            timeData: 'Enter date in format YYYY-MM-DD',
            chooseExpenses: 'Such obligatory expenses item already exists!',
            lowLevel: 'Minimal wealth level!',
            middleLevel: 'Middle wealth level!',
            highLevel: 'High wealth level!',
            errorLevel: 'An error has occured!',
            chooseIncome: 'List your additional income items (through commas)',
            expenseItem: 'Enter obligatory expenses item name for this month:',
            expenseAmount: 'How much will it cost for this month?',
            saveAmount: 'How much does it your accumulations?',
            savePercent: 'How much does it percent of your deposit?',
            optExpenseItem: 'What is your optional expense item?',
            incomeElse: 'May be something else?',
        },

        defaults: {
            monthlyBudget: 'Enter positive number value',
            timeData: 'Format is obligatory',
            expenseAmount: 'Enter positive number value',
            saveAmount: 'Enter number value!',
            savePercent: 'Enter number value',
            incomeElse: '',
            chooseIncome: '',
            expenseItem: '',
            optExpenseItem: '',
        },

        settings: {
            expensesCount: 2,
            daysInMonth: 30,
            lowBoundary: 100,
            highBoundary: 2000,
            optExpensesCount: 3,
            decimalDigitCount: 2,
        },
    
        askMonthlyBudget: function () {
            let money = askForCorrectNumber(this.messages.monthlyBudget, this.defaults.monthlyBudget);
            appData.budget = + parseFloat(money).toFixed(this.settings.decimalDigitCount);
        },
    
        askTimeData: function () {
            let time = askForCorrectDate(this.messages.timeData, this.defaults.timeData);
            appData.timeData = time;
        },
    
        chooseExpenses: function () {
            let expenses = {};
            let expenseItem;
            let expenseAmount;
        
            for (let i = 0; i < this.settings.expensesCount; i++) {
        
                expenseItem = this.askExpenseItem(i);
            
                if (this.hasExpenseItem(expenses, expenseItem)) {
                    alert(this.messages.chooseExpenses);
                    i--;
                    continue;
                }
            
                expenseAmount = this.askExpenseAmount();
                expenses[expenseItem] = expenseAmount;
            
            }
        
            appData.expenses = expenses;
        },
    
        detectDayBudget: function () {
            appData.moneyPerDay = Math.round( (appData.budget / this.settings.daysInMonth) * 100 ) / 100;
            alert('Daily budget: ' + appData.moneyPerDay);
        },
    
        detectLevel: function () {
            let moneyPerDay = appData.moneyPerDay;
        
            if (moneyPerDay < this.settings.lowBoundary) {
                return this.messages.lowLevel;
            } else if (moneyPerDay <= this.settings.highBoundary) {
                return this.messages.middleLevel;
            } else if (moneyPerDay > this.settings.highBoundary) {
                return this.messages.highLevel;
            } else {
                return this.messages.errorLevel;
            }

        },
    
        checkSavings: function () {
            if (appData.savings === true) {
                let save = this.askSaveAmount();
                let percent = this.askSavePercent();
        
                let monthlyIncome = save / 100 / 12 * percent;
                appData.monthlyIncome = + parseFloat(monthlyIncome).toFixed(this.settings.decimalDigitCount);
        
                alert('Montly income from your depostit is: ' + appData.monthlyIncome);
            }
        },
    
        chooseOptExpenses: function () {
            for (let i = 1; i <= this.settings.optExpensesCount; i++) {
                appData.optionalExpenses[i] = this.askOptExpenseItem();
            }
        },

        chooseIncome: function () {
            let items = askForCorrectString(this.messages.chooseIncome, this.defaults.chooseIncome);
            appData.income = items.split(', ');
            appData.income.push(askForCorrectString(this.messages.incomeElse, this.defaults.incomeElse));
            appData.income.sort();

            let alertMessage = 'Additional income methods: ';
            appData.income.forEach(function (value, index) {
                alertMessage += (index + 1) + '. ' + value + '; ';
            });
            alertMessage = alertMessage.slice(0, -2) + '.';
            alert(alertMessage);
        },
    
    
    
        askExpenseItem: function (i) {
            return askForCorrectString(this.messages.expenseItem, this.defaults.expenseItem);
        },
        
        askExpenseAmount: function () {
            let expenseAmount = askForCorrectNumber(this.messages.expenseAmount, this.defaults.expenseAmount);
            return + parseFloat(expenseAmount).toFixed(this.settings.decimalDigitCount);
        },

        hasExpenseItem: function (expenses, expenseName) {
            return expenses[expenseName] !== undefined;
        },

        askSaveAmount: function () {
            let amount = askForCorrectNumber(this.messages.saveAmount, this.defaults.saveAmount);
            return + parseFloat(amount).toFixed(this.settings.decimalDigitCount);
        },

        askSavePercent: function () {
            let percent = askForCorrectNumber(this.messages.savePercent, this.defaults.savePercent);
            return + parseFloat(percent).toFixed(this.settings.decimalDigitCount);
        },

        askOptExpenseItem: function () {
            let item = askForCorrectString(this.messages.optExpenseItem, this.defaults.optExpenseItem);
            return item;
        }
    };
    
    // start();
    
    // alert( appData.detectLevel() );
    
    // appData.chooseOptExpenses();
    // appData.chooseIncome();

    // console.log(appData);
    // console.log("Our progrom includs datas: ");
    // for (let data in appData) {
    //     console.log(data);
    // }
    
    //  app functions
    function start() {
        appData.askMonthlyBudget();
        appData.askTimeData();
        appData.chooseExpenses();
        appData.detectDayBudget();
        appData.checkSavings();
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
        const allowedStringLength = 200;
    
        return (
            typeof(data) === 'string' &&
            data !== '' &&
            data.length <= allowedStringLength
        );
    }

    function askForCorrectNumber(msg, def) {
        return askFor(msg, def, isCorrectNumber);
    }

    function askForCorrectDate(msg, def) {
        return askFor(msg, def, hasCorrectTimeFormat);
    }

    function askForCorrectString(msg, def) {
        return askFor(msg, def, isCorrectString);
    }

    function askFor(msg, def, check) {
        let dt;

        do {
            dt = prompt(msg, def);
        } while ( !check(dt) );

        return dt;

    }
    
}());


