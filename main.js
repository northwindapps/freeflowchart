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

        if (reservedWordsList.includes(token.replace('<>','').replace(' ',''))) {
            
            // token = token.replace(/\s/g, '').replace('<>','');
        
            //TODO
            if (token == 'if') {
                //regular expression if there is an  else after an if?
                tokenList.push(token);
                rwList.push(token);
                token ='';
            }

            if (token == 'else') {
                //regular expression if there is an  else after an if?
                tokenList.push(token);
                rwList.push(token);
                token ='';
            }

            if (token == 'endif') {
                //regular expression if there is an  else after an if?
                tokenList.push(token);
                token ='';
            }

            if (token == 'endflow') {
                tokenList.push(token);
                token='';
            }

            if (token == 'endprocess') {
                //regular expression if there is an  else after an if?
                tokenList.push('end');
                token ='';
            }

            if (token == 'then'){
                tokenList.push(token);
                token = '';
           }

           if (token == 'none'){
                tokenList.push(token);
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

