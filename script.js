'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

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

const displayMovements = (acc, sort = false) => {
  containerMovements.innerHTML = '';
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach((mov, i) => {
    const now = new Date(acc.movementsDates[i]);
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const date = `${now.getDate()}`.padStart(2, 0);
    const year = now.getFullYear();

    const displayDate = `${month} / ${date} / ${year}`;
    // console.log(mov);
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${
        mov > 0 ? 'deposit' : 'withdrawal'
      }">${i + 1} ${mov > 0 ? 'Deposit' : 'Withdrawal'}</div>
       <div class="movements__date">${displayDate}</div>
         <div class="movements__value">${mov.toFixed(2)}€</div>
           </div>
`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const createUserNames = accs => {
  accs.forEach(user => {
    user.username = user.owner
      .toLowerCase()
      .split(' ')
      .map(item => item[0])
      .join('');
  });
};

createUserNames(accounts);

const updateUi = acc => {
  displayMovements(acc);
  printBlance(acc);
  calcDisplaySummury(acc);
};

const printBlance = acc => {
  acc.blance = acc.movements.reduce((acc, cur) => {
    return acc + cur;
  }, 0);

  // console.log(blance);

  labelBalance.textContent = `${acc.blance.toFixed(2)}€`;
};

const calcDisplaySummury = acc => {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumIn.textContent = `${income} €`;

  const out = acc.movements
    // .filter(mov => mov < 0)
    .reduce((acc, cur) => cur < 0 && acc + cur, 0);
  labelSumOut.textContent = `${Math.abs(out)} €`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .filter(mov => mov >= 1)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)} €`;
};

// console.log(accounts);
let currentAccount;

btnLogin.addEventListener('click', e => {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = '100';
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();
    labelWelcome.textContent = `welcome to ${
      currentAccount.owner.split(' ')[0]
    }`;
    // Implement Date
    const now = new Date();
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const date = `${now.getDate()}`.padStart(2, 0);
    const year = now.getFullYear();
    const hours = now.getHours();
    const min = now.getMinutes();

    labelDate.textContent = `${month} / ${date} / ${year}, ${hours}:${min}`;

    updateUi(currentAccount);
  } else {
    containerApp.style.opacity = 0;
  }
  // console.log(typeof inputLoginPin.value);
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const reciveAcc = inputTransferTo.value;
  const transfer = accounts.find(acc => acc.username === reciveAcc);
  inputTransferAmount.value = '';
  inputTransferTo.value = '';
  if (
    amount > 0 &&
    transfer &&
    currentAccount?.blance >= amount &&
    currentAccount?.username !== transfer.username
  ) {
    currentAccount.movements.push(-amount);
    transfer.movements.push(amount);
    currentAccount.movementsDates.push(new Date());
    transfer.movementsDates.push(new Date());

    updateUi(currentAccount);
  }

  // transfer.movements.push(amount);
});

btnClose.addEventListener('click', e => {
  e.preventDefault();
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov > amount * 0.1)) {
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date());
    updateUi(currentAccount);
  }

  inputLoanAmount.value = '';
});

// console.log(accounts);

const deposit = depo => {
  return depo.filter(mov => mov > 0);
};

// console.log(deposit(account1.movements));

function withdrawal(withdr) {
  return withdr.filter(mov => mov < 0);
}

let sorted = false;

btnSort.addEventListener('click', e => {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

// Frist withdrawl

// const fristWithdrawal = account1.movements.find(item => item < 0);
// console.log(fristWithdrawal);

// const fristWithdrawal = withdrawal => {
//   return withdrawal.find(item => item < 0);
// };

// console.log(fristWithdrawal(account1.movements));

// console.log(accounts);

// const account = accounts.find(acc => acc.owner === 'Sarah Smith');
// console.log(account);

// console.log(withdrawal(account1.movements));

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// Arr slice

// const arr = ['a', 'b', 'c', 'd', 'e'];

// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-1));
// console.log(arr.slice(-2));
// console.log(arr.slice(1, -2));

/////////////////////////////////////////////////////////

// Arr splice

// console.log(arr.splice(2));
// console.log(arr);
// console.log(arr.splice(-1));
// console.log(arr);

///////////////////////////////////////////////////////

// // Reverser Method

// const arr2 = ['f', 'g', 'h', 'i', 'j'];
// console.log(arr2.reverse());
// console.log(arr2);

//////////////////////////////////////////////////////

// // Concat Method

// const letter = arr.concat(arr2);
// console.log(letter);
// console.log([...arr, ...arr2]);

////////////////////////////////////////////////////////
// // Join
// const letter = arr.concat(arr2);
// console.log(letter.join(' % '));

////////////////////////////////////////////////////

// // at method

// const arr = [1, 3, 4];

// console.log(arr.at(2));

// ForEach Loop

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
//   // console.log(movement);
//   if (movement > 0) {
//     console.log(`you are deposit ${movement} tk`);
//   } else {
//     console.log(`yor are withdraw ${Math.abs(movement)} tk`);
//   }
// }

// console.log('-------foreach--------');

// movements.forEach((movement, i, array) => {
//   // console.log(array);
//   if (movement > 0) {
//     console.log(`Movement ${i + 1} you are deposit ${movement} tk`);
//   } else {
//     console.log(`Movement ${i + 1} yor are withdraw ${Math.abs(movement)} tk`);
//   }
// });

// Array Chelleange 1

// const checkDogs = (dogsJulia, dogsKate) => {
//   const copy = dogsJulia.slice(1, -2);
//   // console.log(copy);
//   const allData = dogsJulia.concat(dogsKate);
//   // console.log(allData);
//   allData.forEach((age, i) => {
//     const ages =
//       age >= 3
//         ? `Dog number ${i + 1} is an adult, and is ${age} years old`
//         : `Dog number ${i + 1} is still a puppy`;
//     console.log(ages);
//   });

//   // const ages = allData.map((age, i) => {
//   //   return age >= 3
//   //     ? `Dog number ${i + 1} is an adult, and is ${age} years old`
//   //     : `Dog number ${i + 1} is still a puppy`;
//   // });

//   // return ages;
// };

// console.log(checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]));

// Coding chellege 2

// const calcAverageHumanAge = ages => {
//   const humanages = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   console.log(humanages);
//   const filter = humanages.filter(age => age >= 18);
//   console.log(filter);
//   const average = filter.reduce((acc, cur) => {
//     return (acc * cur) / 100;
//   }, filter[0]);

//   console.log(average);
// };

// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

// calcAverageHumanAge([3, 5, 6]);

// Find Method

// const a = {
//   value: 'hello',
// };

// const b = {
//   value: 'world',
// };

// console.log(a + b);

// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat());

// //////////////////////////////////////////////////////////////////////////

// Array practrice

// const bankDepositSum = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .filter(mov => mov > 0)
//   .reduce((acc, cur) => acc + cur, 0);

// console.log(bankDepositSum);

// // Reduce method create object

// const { deposits, withdrawals } = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (sum, cur) => {
//       // cur > 0 ? (sum.deposits += cur) : (sum.withdrawals += cur);
//       sum[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
//       return sum;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );

// console.log(deposits, withdrawals);

// // Convert  title case

// const convertTitleCase = title => {
//   const exceptions = ['a', 'an', 'the', 'and', 'but', 'or', 'on', 'with', 'am'];
//   return title
//     .toLowerCase()
//     .split(' ')
//     .map(word =>
//       exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
//     )
//     .join(' ');
// };

// console.log(convertTitleCase('hello i am RONY'));

//////////////////////////////////////////////////////////////////////////////////////////

// const dogFood = dogs => {
//   dogs.forEach(dog => (dog.recommendedFood = dog.weight ** 0.75 * 28));

//   const sarah = dogs.find(dog => dog.owners.some(value => value === 'Sarah'));

//   sarah.curFood > sarah.recommendedFood
//     ? console.log('its eating too much')
//     : console.log('its eating too little');

//   const ownersEatTooMuch = [];
//   const ownersEatTooLittle = [];

//   dogs.map(dog =>
//     dog.curFood > dog.recommendedFood
//       ? ownersEatTooMuch.push(dog.owners)
//       : ownersEatTooLittle.push(dog.owners)
//   );

//   // ownersEatTooMuch.flat();

//   return dogs;
// };

// const dog = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] },
// ];

// console.log(dogFood(dog));
// // console.log(dog);

// create a date

// const now = new Date();
// console.log(now);
