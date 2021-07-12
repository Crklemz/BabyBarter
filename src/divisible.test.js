// Write a function that takes in a number and returns one of the following:

//     - If the number is divisible by 3, return "Fizz". 
//     - If the number is divisible by 5, return "Buzz". 
//     - If the number is divisible by both 3 and 5, return "FizzBuzz". 
//     - Otherwise, just return the number that was passed into the function.

import divisible from './divisible.js';

it('should return Fizz', () => {
    expect(divisible(6)).toBe('Fizz')
})

it('should return Buzz', () => {
    expect(divisible(10)).toBe('Buzz')
})

it('should return FizzBuzz', () => {
    expect(divisible(15)).toBe('FizzBuzz')
})

it('should return 2', () => {
    expect(divisible(2)).toBe(2)
})