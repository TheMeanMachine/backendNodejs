
'use strict'


//Edited from 340CT assignment submission https://github.coventry.ac.uk/340CT-1920SEPJAN/machina2

/**
 * Function to check a given string to ensure alphanumical or has symbols: ,."!?\'-
 *
 * @name checkWord
 * @author A.M
 * @param test The string to test
 * @throws If string does not match requirements
 * @returns true
 *
 */
exports.checkWord = (string, name) => {
    const regex = new RegExp('^[a-zA-Z0-9 ,."!?\'\-]*$')
    if(!this.checkStringExists(string) || !regex.test(string)) {
        throw new Error(`Must supply ${name}`)
    }
    
    return true
}

/**
 * Function to check an ID
 *
 * @name checkID
 * @author A.M
 * @param ID the ID to check
 * @param name the name to use in error messages
 * @throws if ID is undefined, null or not a number
 * @returns true if successful
 */
exports.checkID = (ID, name) => {
    if(ID === undefined || ID === null || isNaN(ID)) {
        throw new Error(`Must supply ${name}`)
    }
    return true
}

/**
 * Function to check if string exists
 *
 * @name checkStringExists
 * @author A.M
 * @param test the test to check
 * @param name the name to use in error messages
 * @throws if test is null, undefined or length is 0
 * @returns true if successful
 */
exports.checkStringExists = (test, name) => {
    if(test === null || test === undefined || test.length === 0) {
        if(name){
            throw new Error(`Must supply ${name}`)
        }else{
            return false
        }
    }
    return true
}

/**
 * Function to take a date and convert to mySQL format
 * @author A.M
 * @param {string} dateString date to convert in YYYY-MM-DD format
 */
exports.convertDate = (dateString)=>{
    var strArr = dateString.split('-');//Split array by '-'
    var result = new Date(strArr[0], strArr[1] - 1, strArr[2]); 
    return result;
}

/**
 * Function to check email based on regex
 * @author A.M
 * @param {string} email
 * @returns {boolean} true if email is correct
 */
exports.checkEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(email).toLowerCase())) throw new Error('Must supply email');

    return true
}