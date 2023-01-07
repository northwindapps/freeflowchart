var ta = null;
var ta2 = null;
var str = '';
var reservedWordsList = ['if','else','endif','endprocess','endflow','none','then'];
let tokenList = [];
let rwList = [];
var token = '';
var readChars = '';

function getSrc () {
var src = ta.value.replace(/\n\r?/g, ' <>');
src = src + '<>';
getValue(src)
console.log(src);
}

function getSrc2 () {
    var src = ta2.value.replace(/\n\r?/g, ' <>');
    src = src + '<>';
    getValue(src)
    console.log(src);
    }

function getValue(data){
    tokenList = [];
    rwList = [];

    for(let key of Object.values(data)){
        // console.log(str);
        //todo if special symbols[,{} ()]

        if (reservedWordsList.includes(token.replace('<>','').replace(/\s+/g,''))) {
            newtoken = token.replace(/\s/g, '').replace('<>','');
            // newtoken = token.replace('<>','').replace(/\s+/g,'X');

            console.log(newtoken);
            //TODO
            if (newtoken == 'if') {
                //regular expression if there is an  else after an if?
                tokenList.push(newtoken);
                rwList.push(newtoken);
                token ='';
            }

            if (newtoken == 'else') {
                //regular expression if there is an  else after an if?
                tokenList.push(newtoken);
                rwList.push(newtoken);
                token ='';
            }

            if (newtoken == 'endif') {
                //regular expression if there is an  else after an if?
                tokenList.push(newtoken);
                token ='';
            }

            if (newtoken == 'endflow') {
                tokenList.push(newtoken);
                token='';
            }

            if (newtoken == 'endprocess') {
                //regular expression if there is an  else after an if?
                tokenList.push('end');
                token ='';
            }

            if (newtoken == 'then'){
                tokenList.push(newtoken);
                token = '';
           }

           if (newtoken == 'none'){
                tokenList.push(newtoken);
                token = '';
           }

           
           
    
            
        }

        token = token.concat('',key);
        readChars = readChars.concat('',key);

        if(token.includes('<>')){
            //<'br'> not working 
                //what should i do?
            // console.log(token.replace(/\s/g, '').replace('<>',''));
            token = token.replace('<>','');
            tokenList.push(token);
            token ='';
        }
        

    }
    console.log(tokenList);
    console.log(readChars);
    sessionStorage.setItem("src", JSON.stringify(tokenList));
    window.location.href = './chart.html';
}


window.onload = function() {
    ta = document.querySelector("#ta");
    ta2 = document.querySelector("#ta2");
    
    // your code 
    console.log('welcome back');


    
};

