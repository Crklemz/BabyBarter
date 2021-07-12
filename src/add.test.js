//test driven developement
//jest is in react-scripts package json

import sum from './add.js';

// add two itegers
test('Add 2 Integers', () => {
    expect(sum(1,2)).toBe(3);
})

//add decimals
test('Add Decimals', () => {
    expect(sum(0.5,0.75)).toBe(1.25)
})

//add negative
test('Add negative', () => {
    expect(sum(-1,2)).toBe(1);
})

//add string
test('Add string', () => {
    expect(sum('1',3)).toBe(4);
})

// //One number?
// test('Add ONE', () => {
//     expect(sum(1)).toBe(1);
// })

//Sring 'ten'
test('Add ten', () => {
    expect(sum(1,'ten')).toBe(NaN);
})


