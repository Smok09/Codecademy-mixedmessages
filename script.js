//Lottery generator. three sequences:
//1º :: 7 (unique) Numbers (range 1 to 99) 
//2º :: 2 (unique) Stars (range 1 to 9)
//3º :: 1 letter (range 1 to 25)
var myArgs;
var cars = ["Saab", "Volvo", "BMW"];
var numbers = [1, 1, 3];
function arrayTypeofValidator(array,type) {
    var returner
    array.forEach(element => { 
    if(typeof element !== type)
        returner=false
    });
    if(returner===false)
        return false
    return true
}//checks the elements typeof inside the array if one of them is diferent than the type provided the function returns false, else returns true
function arrayRepeatValuesFinder(array) {
    var setedArray=Array.from(new Set(array))
    if(array.length!==setedArray.length)
        return true
    return false
    
}
//returns true if there are repeated values in the function by converting the array to a set which only allow unique values then 
//convert back to array if I compare the length of this array with the original and the result is diferent we have repeated values
function arrayRangeValidator(array,min,max) {
    var returner
    array.forEach(element => { 
    if(element<min||element>max)
        returner=false
});
    if(returner===false)
        return false
    return true

}
//validates each value of the array by check if its inside the range provided, returns false if one is outside range else true
function argumentsChecker(){

myArgs = process.argv.slice(2); //slice first 2 arguments 
for (var i = 0; i < myArgs.length-1; i++) {
    myArgs[i]=parseInt(myArgs[i])
}

//myArgs[myArgs.length]=String(myArgs[myArgs.length])
if (myArgs.length < 10){
    console.log("To few arguments, you need to input 10 values")
    return process.exit(22);
}
if (myArgs.length > 10){
    console.log("To many arguments, you need to input 10 values")
    return process.exit(22);
}
}
//this function will validate the quantity of the arguments passed to the script if to few or to many the script will end 
function factorial(n){
    //base case
    if(n == 0 || n == 1){
        return 1;
    //recursive case
    }else{
        return n * factorial(n-1);
    }
}
//factorial function to use in oddscalculator
function createNumber(min,max) {
    return Math.floor(Math.random() * (max - min) + min);
}
//random number generator with range min to max
function oddscalculator(correctnumbers,max,attempts) {
        var numberD=max;
        if (correctnumbers===0){
            for (var i = max-1; i > max-attempts; i--) {
                numberD=numberD*(i);
            }
            return 1-(1/numberD)*factorial(attempts);
        }

        for (var i = max-1; i > max-correctnumbers; i--) {
            numberD=numberD*(i);
        }
        return (1/numberD)*factorial(correctnumbers);
}
//calculate the odds of the winning numbers the user had

var dictionarySymbolArray = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","X","Y","Z"];//array with the greek letters

var lottery = {
    myNumbersArray:[], 
    myStarsArray:[],
    mySymbolArray:[],
    //arrays for the user input, will be filled after the argumentsChecker(), myNumbersArrayChecker(), myStarsChecker() and myGreekLetterChecker() functions validate the input
    myNumbersArrayChecker : function() {
        var argNumberArray=myArgs.slice(0,myArgs.length-3); //slice first 7 elements of the arguments provided to the script into new array
        if(arrayRangeValidator(argNumberArray,1,99)==false){
            console.log("Number not in accepted range")
            return process.exit(22);
        }
        if(arrayRepeatValuesFinder(argNumberArray)==true){
            console.log("Repeated Number")
            return process.exit(22);
        }
        return lottery.myNumbersArray=argNumberArray.sort(function(a, b){return a-b});
        //sorts in ascending order and saves the validated array into the proper array inside the object 
    },
    myStarsChecker : function() {
        var argStarArray=myArgs.slice(7,myArgs.length-1);
        if(arrayRangeValidator(argStarArray,1,9)==false){
            console.log("Number not in accepted range")
            return process.exit(22);
        }
        if(arrayRepeatValuesFinder(argStarArray)==true){
            console.log("Repeated Star")
            return process.exit(22);
        }
        return lottery.myStarsArray=argStarArray.sort(function(a, b){return a-b});
    },
    myLetterChecker : function() {
        var argLetterArray=myArgs.slice(9,myArgs.length);
        if (arrayTypeofValidator(argLetterArray,"string")===false){
            console.log("10th position is not letter")
            return process.exit(22);
        }
        return lottery.mySymbolArray[0]=argLetterArray[0];
    },
    numberArray:[], 
    starsArray:[], 
    symbol:[],
    generateNumbers : function() {
        var number;//placeholder variable to hold the new number
        for (i = 0; i < 7; i++) { 
            number=createNumber(1,99);//create new number with range 1 to 99
            lottery.numberArray.forEach(element => { 
                while(element===number)
                number=createNumber(1,99);
            });//compare new number with all elements while truthy generate new placeholder number until falsy  
            lottery.numberArray.push(number);//push number to array
        }//7 iterations of the number generation and push to array 
        
    return lottery.numberArray.sort(function(a, b){return a-b});//return array with ascending sorting
      },
    generateStars  : function() {
        var number;
        for (i = 0; i < 2; i++) {
            number=createNumber(1,9);
            lottery.starsArray.forEach(element => {
                while(element===number)
                    number=createNumber(1,9);
                });
            lottery.starsArray.push(number);
        }
    return lottery.starsArray.sort(function(a, b){return a-b});
      },//similar as above function but with 2 iterations of number generation with range of 1 to 9
    generateLetter  : function() {
        var letter=createNumber(0, 24);
        letter=dictionarySymbolArray[letter]
        lottery.symbol.push(letter);
        return lottery.symbol[0];
        },
    sameNumbersArray:[],
    sameStarsArray:[],
    sameLetterArray:[],
    numbersCompare  : function() {
        lottery.numberArray.forEach(element1 => {
            lottery.myNumbersArray.forEach(element2 => {
                if (element1===element2)
                    lottery.sameNumbersArray.push(element1);
        });
    });
    return lottery.sameNumbersArray;
    },
    starsCompare  : function() {
        lottery.starsArray.forEach(element1 => {
            lottery.myStarsArray.forEach(element2 => {
                if (element1===element2)
                    lottery.sameStarsArray.push(element1);
        });
    });
    return lottery.sameStarsArray;
    },
    letterCompare  : function() {
        lottery.symbol.forEach(element1 => {
            lottery.mySymbolArray.forEach(element2 => {
                if (element1===element2)
                    lottery.sameLetterArray.push(element1);
        });
    });
    return lottery.sameLetterArray;
    },
};// Object with Arrays for user and script lottery numbers, arrays for the numbers the user and the script have in common and functions to populate those arrays

function myLotteryCaller(){
    console.log("...............................");
    console.log("Your numbers are: "+lottery.myNumbersArrayChecker());
    console.log("Your stars are: "+lottery.myStarsChecker());
    console.log("Your letter is: "+lottery.myLetterChecker());
}
function lotteryCaller(){
    console.log("...............................");
    console.log("The winner numbers are "+lottery.generateNumbers());
    console.log("The winner stars are "+lottery.generateStars());
    console.log("The winner letter is " +lottery.generateLetter());
}
function compareResults(){
    console.log("...............................");//Output of what the script generated
    lottery.numbersCompare();
    lottery.starsCompare();
    lottery.letterCompare()
    if (lottery.sameNumbersArray.length===0)
        console.log("You dont have winning Numbers");
    if (lottery.sameNumbersArray.length!=0)
        console.log("Your winning numbers are: "+lottery.sameNumbersArray);
    if (lottery.sameStarsArray.length===0)
        console.log("You dont have winning Stars");
    if (lottery.sameStarsArray.length!=0)
        console.log("Your winning stars are: "+lottery.sameStarsArray);
    if (lottery.sameLetterArray.length===0)
        console.log("You dont have winning Letter");
    if (lottery.sameLetterArray.length!=0)
        console.log("Your winning Letter is: "+lottery.sameLetterArray);
}
function oddsAnalysis(){
    var odds=oddscalculator(lottery.sameNumbersArray.length,99,7)*oddscalculator(lottery.sameStarsArray.length,9,2)*oddscalculator(lottery.sameLetterArray.length,24,1)*100
    console.log("...............................");//Output of what the user and the script have in common
    console.log("The chances of winning "+lottery.sameNumbersArray.length+" number(s) and "+lottery.sameStarsArray.length+" star(s) and "+lottery.sameLetterArray.length+" letter(s) are "
    +odds+"%");
    console.log("...............................");//Output of the winnings odds the user got
}
argumentsChecker();
myLotteryCaller();
lotteryCaller();
compareResults();
oddsAnalysis();

