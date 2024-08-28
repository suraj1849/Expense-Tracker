const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const list = document.getElementById('list');
const form = document.getElementById('form');
const description = document.getElementById('description');
const amount = document.getElementById('amount');
const date = document.getElementById('date');
const type = document.getElementById('type');

let transactions = [];

// Add new transaction
function addTransaction(e) {
    e.preventDefault();

    if (description.value.trim() === '' || amount.value.trim() === '' || date.value.trim() === '') {
        alert('Please fill in all fields');
    } else {
        const transaction = {
            id: generateID(),
            description: description.value,
            amount: +amount.value,
            date: date.value,
            type: type.value
        };

        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        description.value = '';
        amount.value = '';
        date.value = '';
    }
}

// Generate random ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// Add transaction to DOM
function addTransactionDOM(transaction) {
    const sign = transaction.type === 'expense' ? '-' : '+';
    const item = document.createElement('li');

    item.classList.add(transaction.type === 'expense' ? 'expense' : 'income');

    item.innerHTML = `
        ${transaction.description} <span>${sign}$${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
}

// Remove transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateValues();
    init();
}

// Update the balance, income, and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.type === 'income' ? transaction.amount : -transaction.amount);

    const totalIncome = transactions
        .filter(transaction => transaction.type === 'income')
        .reduce((acc, transaction) => acc + transaction.amount, 0)
        .toFixed(2);

    const totalExpense = transactions
        .filter(transaction => transaction.type === 'expense')
        .reduce((acc, transaction) => acc + transaction.amount, 0)
        .toFixed(2);

    const netBalance = (totalIncome - totalExpense).toFixed(2);

    income.innerText = `$${totalIncome}`;
    expense.innerText = `$${totalExpense}`;
    balance.innerText = `$${netBalance}`;
}

// Initialize the application
function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

form.addEventListener('submit', addTransaction);
