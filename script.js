'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovment = function (movements,sort=false) {

  containerMovements.innerHTML = '';

  const movs=sort? movements.slice().sort((a,b)=>a-b):movements;
  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1}deposit</div>
    <div class="movements__value">${mov}€</div>
  </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// in here we are going to add balance to accounts to use it in the operations
const calcDisplayBalance = function (acc) {
  // acc.balance xoman addy akain bo accountakan xoyan nyana
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur);

  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  const intr = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int > 1;
    })
    .reduce((acc, cur) => acc + cur, 0);
  labelSumInterest.textContent = intr + '€';
};

const updateUi = function (currentAccount) {
  //display movments
  displayMovment(currentAccount.movements);

  //display balance
  calcDisplayBalance(currentAccount);

  //display summary
  calcDisplaySummary(currentAccount);
};

let currentAccount;
btnLogin.addEventListener('click', e => {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  // console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI Message
    labelWelcome.textContent = `Welcome ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 1;

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUi(currentAccount);
  }
});

// transfer to and amount
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const reciverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferTo.blur();

  if (
    amount > 0 &&
    reciverAcc &&
    reciverAcc?.userName !== currentAccount.userName &&
    currentAccount.balance >= amount
  ) {
    currentAccount.movements.push(-amount);
    reciverAcc.movements.push(amount);
    updateUi(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  
  
  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
    ) {
      
      const index=accounts.findIndex(acc=>acc.userName===currentAccount.userName)
      
      //we need to delete current account from an array for that 
      
      accounts.splice(index,1);
      
      //Hide UI
      
      containerApp.style.opacity=0
      
    
    }
  else{
    
  }
  //clearing inputs 
  inputCloseUsername.value = inputClosePin.value = '';
});



btnLoan.addEventListener('click',function(e){
  e.preventDefault();
  const amount =Number(inputLoanAmount.value)
  if(amount>0 && currentAccount.movements.some(mov=> mov>=amount*0.1)){
    //Add movement 
    currentAccount.movements.push(amount)
    updateUi(currentAccount)
  }
  inputLoanAmount.value=""
})

let sort=false
btnSort.addEventListener('click',function(e){
  e.preventDefault();
  displayMovment(currentAccount.movements,!sort)
  sort=!sort
})
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// const juliasData = [3, 5, 2, 12, 7];
// const correctData = juliasData.slice(1, -2);
// const kataData = [4, 1, 15, 8, 3];

// const Both = [...correctData, ...kataData];

// const checkDogs = function (data) {
//   console.log(data);
//   data.forEach((item, i) => {
//     if (item <= 3) {
//       console.log(`The dog of number ${i + 1} is still popy`);
//     } else if (item > 3) {
//       console.log(`The dog of number ${i + 1} is adult`);
//     }
//   });
// };

// checkDogs(Both);

const createUserName = function (accs) {
  accs.forEach((acc, i) => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUserName(accounts);

// const deposit = movements.filter(mov => mov > 0);
// const withdrawals = movements.filter(mov => mov < 0);

// const balance = movements.reduce((acc, cur) => acc + cur, 0);

// const movements2 = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const max = movements.reduce((acc, mov) => {
//   console.log(acc, mov);
//   if (acc > mov) return acc;
//   else {
//     return mov;
//   }
// }, movements[0]);

// ****************** Challenge2**************

const calcAverageHumanAge = data => {
  const averrage = data
    .map(item => (item <= 2 ? item * 2 : 16 + item * 4))
    .filter((item, i, arr) => item > 18)
    .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
};

const test = [5, 2, 4, 1, 15, 8, 3];

calcAverageHumanAge(test);

// Challegnae 3 use chaining in second challenge

const erroToUsd = 1.1;
const totalDeposit = movements
  .filter(mov => mov > 0)
  .map(mov => mov * erroToUsd)
  .reduce((acc, mov) => acc + mov, 0);

// console.log(totalDeposit);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

const overAllBalance=accounts.flatMap(acc=>acc.movements).reduce((acc,curr)=>acc+curr,0)


//return <0 A,B keep order does not sort
//return >0 B<A Swich order does sort
movements.sort((a,b)=>{
  if(a>b){
    return 1 //any positive number accending ==== keep order
  }
  if(a<b){
    return -1 // any negative number  deccending ==== swich order 
  }

})

console.log(movements);