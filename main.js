var ta = null;
var ta2 = null;
var str = '';
var reservedWordsList = ['if','else','endif','endthen','endflow','none','then','endprocess','endelse','none'];
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

function getSrc3 () {
    var src = ta3.value.replace(/\n\r?/g, ' <>');
    src = src + '<>';
    getValue(src)
    console.log(src);
    }

function getValue(data){
    tokenList = [];
    rwList = [];

    for(let key of Object.values(data)){
        if (reservedWordsList.includes(token.replace('<>','').replace(/\s+/g,''))) {
            newtoken = token.replace(/\s/g, '').replace('<>','');
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

            if (newtoken == 'endthen') {
                //regular expression if there is an  else after an if?
                tokenList.push('endthen');
                token ='';
            }

            if (newtoken == 'endprocess') {
                //regular expression if there is an  else after an if?
                tokenList.push('endprocess');
                token ='';
            }

            if (newtoken == 'endelse') {
                //regular expression if there is an  else after an if?
                tokenList.push(newtoken);
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
    console.log('welcome back'); 
};

