var myArgs;
var dictionarySymbolArray = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","X","Y","Z"];
var specialCaracters = ["!","@","#","$","^","&","%","*","(",")","+","=","-","[","]","\\","/","{","}","|",":","<",">","?",",",".",";"]
var lottery = {
    myNumbersArray:[], 
    myStarsArray:[],
    mySymbolArray:[],
    myNumbersArrayChecker : function() {
        var argNumberArray=myArgs.slice(0,myArgs.length-3);
        if(arrayRangeValidator(argNumberArray,1,99)==false){
            console.log("Number not in accepted range")
            return null;
            //return process.exit(22);
        }
        if(arrayRepeatValuesFinder(argNumberArray)==true){
            console.log("Repeated Number")
            return null;
            //return process.exit(22);
        }
        return lottery.myNumbersArray=argNumberArray.sort(function(a, b){return a-b});
    },
    myStarsChecker : function() {
        var argStarArray=myArgs.slice(7,myArgs.length-1);
        if(arrayRangeValidator(argStarArray,1,9)==false){
            console.log("Number not in accepted range")
            return null;
            //return process.exit(22);
        }
        if(arrayRepeatValuesFinder(argStarArray)==true){
            console.log("Repeated Star")
            return null;
            //return process.exit(22);
        }
        return lottery.myStarsArray=argStarArray.sort(function(a, b){return a-b});
    },
    myLetterChecker : function() {
        var argLetterArray=myArgs.slice(9,myArgs.length);
        if (arrayTypeofValidator(argLetterArray,"string")===false){
            console.log("10th position is not letter")
            return null;
            //return process.exit(22);
        }
        return lottery.mySymbolArray[0]=argLetterArray[0];
    },
    numberArray:[], 
    starsArray:[], 
    symbol:[],
    generateNumbers : function() {
        var number;
        for (i = 0; i < 7; i++) { 
            number=createNumber(1,99);
            lottery.numberArray.forEach(element => { 
                while(element===number)
                number=createNumber(1,99);
            });
            lottery.numberArray.push(number);
        }
        
    return lottery.numberArray.sort(function(a, b){return a-b});
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
      },
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
}
function arrayTypeofValidator(array,type) {
    var returner
    array.forEach(element => { 
    if(typeof element !== type)
        returner=false
    });
    if(returner===false)
        return false
    return true
}
function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
function arrayRepeatValuesFinder(array) {
    var setedArray=Array.from(new Set(array))
    if(array.length!==setedArray.length)
        return true
    return false
    
}
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
function argumentsChecker(){
    //myArgs = process.argv.slice(2); //slice first 2 arguments 
    myArgs = window.param;
    for (var i = 0; i < myArgs.length-1; i++) {
        myArgs[i]=parseInt(myArgs[i])
    }
    if (myArgs.length < 10){
        console.log("To few arguments, you need to input 10 values")
        return null//process.exit(22);
    }
    if (myArgs.length > 10){
        console.log("To many arguments, you need to input 10 values")
        return null//process.exit(22);
    }
}
function factorial(n){
    
    if(n == 0 || n == 1){
        return 1;
    
    }else{
        return n * factorial(n-1);
    }
}
function createNumber(min,max) {
    return Math.floor(Math.random() * (max - min) + min);
}
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
function myLotteryCaller(){
    document.getElementById('myTicketNumbers').innerHTML = "Your numbers: "+lottery.myNumbersArray;
    document.getElementById('myTicketStars').innerHTML = "Your stars: "+lottery.myStarsArray;
    document.getElementById('myTicketArray').innerHTML = "Your letter: "+lottery.mySymbolArray;
}
function lotteryCaller(){
    document.getElementById('winnerTicketNumbers').innerHTML = "Numbers drawn: "+lottery.numberArray ;
    document.getElementById('winnerTicketStars').innerHTML = "Stars drawn : "+lottery.starsArray ;
    document.getElementById('winnerTicketArray').innerHTML = "Letter drawn: "+lottery.symbol ;
}
function compareResults(){
    if (lottery.sameNumbersArray.length===0)
        document.getElementById('myWinsNumbers').innerHTML = "No winning Numbers";
    if (lottery.sameNumbersArray.length!=0)
        document.getElementById('myWinsNumbers').innerHTML = "Your winning Numbers are "+lottery.sameNumbersArray;
    if (lottery.sameStarsArray.length===0)
        document.getElementById('myWinsStars').innerHTML = "No winning Stars";
    if (lottery.sameStarsArray.length!=0)
        document.getElementById('myWinsStars').innerHTML = "Your winning Stars are "+lottery.sameStarsArray;
    if (lottery.sameLetterArray.length===0)
    document.getElementById('myWinsLetter').innerHTML = "No winning Letters";
    if (lottery.sameLetterArray.length!=0)
        document.getElementById('myWinsLetter').innerHTML = "Your winning Letter is "+lottery.sameLetterArray;

}
function oddsAnalysis(){
    var odds=oddscalculator(lottery.sameNumbersArray.length,99,7)*oddscalculator(lottery.sameStarsArray.length,9,2)*oddscalculator(lottery.sameLetterArray.length,24,1)*100
    document.getElementById('oddsNumbers').innerHTML = "with "+lottery.sameNumbersArray.length+" numbers";
    document.getElementById('oddsStars').innerHTML = "and "+lottery.sameStarsArray.length+" stars and";
    document.getElementById('oddsLetter').innerHTML = "and "+lottery.sameLetterArray.length+" letters are";
    document.getElementById('oddsTotal').innerHTML = "of "+round(odds,5)+"%";
}
function reset(){
    lottery.numberArray=[];
    lottery.starsArray=[];
    lottery.symbol=[];
    lottery.sameNumbersArray=[];
    lottery.sameStarsArray=[];
    lottery.sameLetterArray=[];
}
function debuger(enable){
    if(enable===true){
        console.log("-------------------------------");
        console.log("mynumber: "+lottery.myNumbersArray);
        console.log("mystars: "+lottery.myStarsArray);
        console.log("myletter: "+lottery.mySymbolArray);
        console.log("numbers: "+lottery.numberArray);
        console.log("stars: "+lottery.starsArray);
        console.log("letter: "+lottery.symbol);
        console.log("won numbers: "+lottery.sameNumbersArray);
        console.log("won stars: "+lottery.sameStarsArray);
        console.log("won letters: "+lottery.sameLetterArray);
        console.log("odds "+oddsAnalysis());
        console.log("-------------------------------");
    }
}
function main(){
    reset();
    var check1 = argumentsChecker();
    var check2=lottery.myNumbersArrayChecker();
    var check3=lottery.myStarsChecker();
    var check4=lottery.myLetterChecker();
    if(check1===null||check2===null||check3===null||check4===null){
        console.log("invalid arguments");
        reset();
        myArgs=0;
        window.param=[];
    }else{
        lottery.generateNumbers();
        lottery.generateStars();
        lottery.generateLetter()
        lottery.numbersCompare();
        lottery.starsCompare();
        lottery.letterCompare()
        document.getElementById("resultsWrap").style.display="inline";
        myLotteryCaller();
        lotteryCaller();
        compareResults();
        oddsAnalysis();
        debuger(true);
        reset();
        myArgs=0;
        window.param=[];
    }
}