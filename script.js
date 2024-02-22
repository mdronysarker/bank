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

const displayMovements = movements => {
  containerMovements.innerHTML = '';
  movements.forEach((mov, i) => {
    // console.log(mov);
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${
        mov > 0 ? 'deposit' : 'withdrawal'
      }">${i + 1} ${mov > 0 ? 'Deposit' : 'Withdrawal'}</div>
       <div class="movements__date">2 days ago</div>
         <div class="movements__value">${mov}€</div>
           </div>
`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

const printBlance = mov => {
  const blance = mov.reduce((acc, cur) => {
    return acc + cur;
  }, 0);

  // console.log(blance);

  labelBalance.textContent = `${blance}€`;
};

printBlance(account1.movements);

const calcDisplaySummury = movements => {
  const income = movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumIn.textContent = `${income} €`;

  const out = movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumOut.textContent = `${Math.abs(out)} €`;

  const interest = movements
    .filter(mov => mov > 0)
    .map(mov => (mov * 1.2) / 100)
    .filter(mov => mov >= 1)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumInterest.textContent = `${interest} €`;
};

calcDisplaySummury(account1.movements);

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
// console.log(accounts);

const deposit = depo => {
  return depo.filter(mov => mov > 0);
};

// console.log(deposit(account1.movements));

function withdrawal(withdr) {
  return withdr.filter(mov => mov < 0);
}

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
