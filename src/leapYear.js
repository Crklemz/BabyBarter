// Write a function that takes in a year and returns a boolean indicating if the year is a leap year. 
// Years that are divisible by 4 are leap years, but years that are divisible by 100 are not leap years, 
// but years that are divisible by 400 are leap years.

const leapYear = (year) => {

    if(year % 400 == 0) {
        return true;
    }
    if(year % 100 == 0) {
        return false;
    }
    if(year % 4 == 0) {
        return true;
    }
    return;
}

export default leapYear;