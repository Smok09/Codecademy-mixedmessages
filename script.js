//Lottery generator. three sequences:
//1º :: 7 (unique) Numbers (range 1 to 99) 
//2º :: 2 (unique) Stars (range 1 to 9)
//3º :: 1 greek leter 
var myArgs;

function argumentsChecker(){
myArgs = process.argv.slice(2); //slice first 2 arguments 
for (var i = 0; i < myArgs.length; i++) {
    myArgs[i]=parseInt(myArgs[i])
}
if (myArgs.length < 10){
    console.log("To few arguments, you need to input 10 values")
    return process.exit(22);
}
if (myArgs.length > 10){
    console.log("To many arguments, you need to input 10 values")
    return process.exit(22);
}
}
function factorial(n){
    //base case
    if(n == 0 || n == 1){
        return 1;
    //recursive case
    }else{
        return n * factorial(n-1);
    }
}
function createNumber(min,max) {
    return Math.floor(Math.random() * (max - min) + min);
  }//base function that creates a random number with a range of a to b
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

var dictionaryGreekSymbolArray = ["α","β","γ","δ","ε","ζ","η","θ","ι","κ","λ","μ","ν","ξ","ο","π","ρ","ς","τ","υ","φ","χ","ψ","ω"];//array with the greek letters
var lottery = {
    myNumbersArray:[], 
    myStarsArray:[],
    myGreekSymbolArray:[], 
    myNumbersArrayChecker : function() {
        var argNumberArray=myArgs.slice(0,myArgs.length-3); //slice fist 7 elements to get into new array 
        argNumberArray.forEach(element => { 
            if(element<1||element>99){
                console.log("Number not in proper range, first 7 digits must be in the range of 1 and 99")
                return process.exit(22);
            }
            var sorted_arr = argNumberArray.slice().sort();
            for (var i = 0; i < sorted_arr.length - 1; i++) {
                if (sorted_arr[i + 1] === sorted_arr[i]) {
                    console.log("Repeated Number")
                    return process.exit(22);
                }
            }

        });
        return lottery.myNumbersArray=argNumberArray.sort(function(a, b){return a-b});
    },
    myStarsChecker : function() {
        var argStarArray=myArgs.slice(7,myArgs.length-1);
        argStarArray.forEach(element => { 
            if(element<1||element>9){
                console.log("Star not in proper range, 8th and 9th digits must be in the range of 1 and 9")
                return process.exit(22);
            }
            var sorted_arr = argStarArray.slice().sort();
            for (var i = 0; i < sorted_arr.length - 1; i++) {
                if (sorted_arr[i + 1] === sorted_arr[i]) {
                    console.log("Repeated Star")
                    return process.exit(22);
                }
                
            }
        });
        return lottery.myStarsArray=argStarArray.sort(function(a, b){return a-b});
    },
    myGreekLetterChecker : function() {
        var argGreekArray=myArgs.slice(9,myArgs.length);
        argGreekArray[0]=argGreekArray[0]-1;
        if(argGreekArray[0]<0||argGreekArray[0]>23){
            console.log("Letter not in proper range, 10th digits must be in the range of 1 and 24")
            return process.exit(22);
        }
        lottery.myGreekSymbolArray[0]=argGreekArray[0];
        return dictionaryGreekSymbolArray[lottery.myGreekSymbolArray];
    },
    numberArray:[], 
    starsArray:[], 
    greekSymbol:[],
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
    generateGreekletter  : function() {
        var number=createNumber(0, 23);
        lottery.greekSymbol.push(number);
        return dictionaryGreekSymbolArray[lottery.greekSymbol];
        },
    sameNumbersArray:[],
    sameStarsArray:[],
    sameGreekLetterArray:[],
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
    greekLetterCompare  : function() {
        lottery.greekSymbol.forEach(element1 => {
            lottery.myGreekSymbolArray.forEach(element2 => {
                if (element1===element2)
                    lottery.sameGreekLetterArray.push(element1);
        });
    });
    return lottery.sameGreekLetterArray;
    },
};// Object with user inputs, generated numbers and compare functions
argumentsChecker();
console.log("...............................");
console.log("Your numbers are: "+lottery.myNumbersArrayChecker());
console.log("Your stars are: "+lottery.myStarsChecker());
console.log("Your greek letter is: "+lottery.myGreekLetterChecker());
console.log("...............................");//Output of what the user sent
console.log("The winner numbers are "+lottery.generateNumbers());
console.log("The winner stars are "+lottery.generateStars());
console.log("The winner greek letter is " +lottery.generateGreekletter());
console.log("...............................");//Output of what the script generated
lottery.numbersCompare();
lottery.starsCompare();
lottery.greekLetterCompare()
if (lottery.sameNumbersArray.length===0)
    console.log("You dont have winning Numbers");
if (lottery.sameNumbersArray.length!=0)
    console.log("Your winning numbers are: "+lottery.sameNumbersArray);
if (lottery.sameStarsArray.length===0)
    console.log("You dont have winning Stars");
if (lottery.sameStarsArray.length!=0)
    console.log("Your winning stars are: "+lottery.sameStarsArray);
if (lottery.sameGreekLetterArray.length===0)
    console.log("You dont have winning Greek Letter");
if (lottery.sameGreekLetterArray.length!=0)
    console.log("Your winning Greek Letter is: "+dictionaryGreekSymbolArray[lottery.sameGreekLetterArray]);
console.log("...............................");//Output of what the user and the script have in common
console.log("The chances of winning "+lottery.sameNumbersArray.length+" number(s) and "+lottery.sameStarsArray.length+" star(s) and "+lottery.sameGreekLetterArray.length+" letter(s) are "
+oddscalculator(lottery.sameNumbersArray.length,99,7)*oddscalculator(lottery.sameStarsArray.length,9,2)*oddscalculator(lottery.sameGreekLetterArray.length,24,1)*100+"%");
console.log("...............................");//Output of the winnings odds the user got
