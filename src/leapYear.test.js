// Write a function that takes in a year and returns a boolean indicating if the year is a leap year. 
// Years that are divisible by 4 are leap years, but years that are divisible by 100 are not leap years, 
// but years that are divisible by 400 are leap years.

import leapYear from './leapYear.js';

it('should return true', () => {
    expect(leapYear(2024)).toBe(true);
})

it('should return true', () => {
    expect(leapYear(2000)).toBe(true);
})

it('should return false', () => {
    expect(leapYear(1900)).toBe(false);
})
