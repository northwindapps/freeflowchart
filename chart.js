window.addEventListener('DOMContentLoaded', function() {
    console.log('DOM is loaded')

    // var addProcessBtn = document.querySelector('#addprocess');
    // var addBranchBtn = document.querySelector('#addbranch');
    // var addIfelseBtn = document.querySelector('#addif');
    // var addLineBtn = document.querySelector('#addline');
    // var addLaneBtn = document.querySelector('#addlane');
    // var substractLaneBtn = document.querySelector('#substractlane');
    var mainUL = document.querySelector('#main');
    var ulIdx = 0;
    
    // addProcessBtn.addEventListener("click", ()=>{ addProcess();});
    // addLineBtn.addEventListener("click", ()=>{ addLine();});
    // addLaneBtn.addEventListener("click", ()=>{ addLane();});
    // substractLaneBtn.addEventListener("click", ()=>{ substractLane();});
    // addBranchBtn.addEventListener("click", ()=>{
    //     addBranch();
    // });
    // addIfelseBtn.addEventListener("click", ()=>{ addIfelse(x=90);});
    // addIfelseBtn.addEventListener("click", ()=>{ addIfelse(x=0);});



    //
    //
    var ta = null;
    var str = '';
    var elementLaneInfo = [];
    var reservedWordsList = ['if','else','endif','end','process','process2','<>','endflow','then', ' '];
    var srcAry = ['if', 'do you have pasta? ','italian','endif','if', 'do you have rice?', 'Chinese', 'endif', 'if', 'beans', 'English', 'endif','', '  ', 'if', '  do you have pasta source?', 'then Italian ', 'else', '  ', 'go to Chinese Place ', 'end', 'if', 'you are a vegitalian', 'arabiata is a choice for you','none','none','none','else','you like meat source','none','none','none','endif','done','endflow'];
    //if do you have pasta? <>else <>go to Mcdonalds <>end <>if do you have pasta source? <>then Italian <>end <>else <>go to Chinese Place <>end <><>
	const values = JSON.parse(sessionStorage.getItem("src"));
	console.log('welcome back',values);
    parseValue(values);

    async function parseValue(ary){
        // tokenList = [];
        // rwList = [];
        var statuscode = [0,1,2,3];//none if ifelse then
        var status = 0;
        var filtered = [];
        var reserved = [];
        var currentLane = 0;
        for (let index = 0; index < ary.length; index++) {
            var str = ary[index].replace(/\s/g, '');
            if (str!='') {
                filtered.push(ary[index]);
                if (reservedWordsList.includes(ary[index].replace('<>','').replace(' ',''))) {
                    reserved.push(ary[index].replace('<>','').replace(' ',''));
                }
            }
        }
        
        console.log(filtered);
        var lanes = checkTotalLanes(filtered);
        var finalLane = lanes;
        console.log(lanes);
        console.log(elementLaneInfo);
        // for (let h = 0; h < finalLane; h++) {
            for (let index = 0; index < filtered.length; index++) {
                console.log(filtered[index]);
       
                    
                switch (filtered[index]) {
                    case 'if':
                        // if (elementLaneInfo[index] == h) {
                            var index2 = index+1;
                            var nextIsThen = false;
                            while(index2<filtered.length){
                                if (filtered[index2] == 'then') {
                                    nextIsThen = true;
                                    break;
                                }
                                if (filtered[index2] == 'else') {
                                    nextIsThen = false;
                                    break;
                                }
                                index2+=1;
                            }
                            if (nextIsThen) {
                                await addIfthen(x=0,baseline=elementLaneInfo[index],body=filtered[index+1]);
                            }else{
                                await addIfelse(x=0,baseline=elementLaneInfo[index],body=filtered[index+1]);
                            }
                            filtered[index+1] = '';
                            status = 1;
                        // }
                        break;
        
                    case 'then':
                        // if (elementLaneInfo[index] == h+1) {
                            //process
                            status = 3;
                            if (filtered[index+1]) {
                                var query = ".branch" + String(ulIdx) + " .d";
                                allDiamonds = document.querySelectorAll(query);
                                addProcess(x=0,baseline=elementLaneInfo[index],filtered[index+1],status=status);
                            }
                            // addLine();
                            filtered[index+1] = '';
                            status = 1;
                        // }
                        break;
                    case 'else':
                        // if (elementLaneInfo[index] == h) {
                            status = 2;
                            console.log('status2?');
                            console.log(filtered[index+1]);
                        // }
                        break;
                    // case 'endif':
                    //     status = 0;
                    //     await endIfElse();
                    //     break;
                    case 'endflow':
                        // if (elementLaneInfo[index] == h) {
                            status = 0;
                            await endFlow();
                        // }
                        break;
                    case 'endif':
                        // if (elementLaneInfo[index] == h) {
                            if (status == 2) {
                                //iflane 
                                addLine(status=0);
                                console.log("endifel");
                                addLine(x=0,baseline=elementLaneInfo[index]+1,status = 2);
                                endIfel();
                                addLine(status=0);
                            }   
                            status = 0;
                        // }
                        break;    
                    default:
                        //process
                        if (filtered[index] && status == 0) {
                            // if (elementLaneInfo[index] == h) {
                                addProcess(x=0,baseline=elementLaneInfo[index],filtered[index],status=0);
                            // }
                        }

                        if (filtered[index] && status == 1) {
                            // if (elementLaneInfo[index] == h) {
                                addProcess(x=0,baseline=elementLaneInfo[index],filtered[index],status=1);
                            // }
                        }

                        if (filtered[index] && status == 2) {
                            // if (elementLaneInfo[index] == h+1) {
                                addProcess(x=0,baseline=elementLaneInfo[index],filtered[index],status=2);
                            // }
                        }               
                        break;
                
            }
            // }
        }    
    }
    
    function addLane() {
        ulIdx += 1;
        console.log(ulIdx);
    }

    function substractLane() {
        ulIdx -= 1;
        console.log(ulIdx);
    }

    function addLine(x=0,baseline=0,status=0) {
        var query = ".branch" + String(baseline) + " ul";
        var theBranchUL = document.querySelector(query);
       

        var li2 = document.createElement("li");
        li2.setAttribute("class", "half");
        li2.innerHTML = '<div class="line"></div>';
        if (status == 2) {
            li2.setAttribute("class", "half abs");
            var query0 = ".branch" + String(baseline) + " ul";
            var elses = document.querySelector(query0);
            var last = elses;
            console.log('test');
            console.log(query0);
            console.log(last.lastChild.style.left);
            console.log(last.lastChild.offsetWidth);

            var parsedWidth = parseInt(last.lastChild.offsetWidth);
            var str = (last.lastChild.style.left).replace('px','');
            var parsed = parseInt(str);
            li2.style.left = `${parsed + parsedWidth}px`;   
        }
        theBranchUL.appendChild(li2);
        // console.log(li2);
         
    }

    function addBranch(baseUlIdx = 0) {
        var li = document.createElement("li");
        li.setAttribute("class", "branch " + "branch" + baseUlIdx); 
        li.innerHTML = '<ul></ul>';
        mainUL.appendChild(li);
        console.log('branch');
        console.log(baseUlIdx);
    }

    function addProcess(x=0,baseline=h,body='',status=0) {
        // var theBranchUL = document.querySelectorAll(".branch"+ ulIdx-1 +" ul");
        var query = ".branch" + String(baseline) + " ul";
        var theBranchUL = document.querySelector(query);
        var isFirstElment = false;
        if (!theBranchUL){
            addBranch(x = baseline);
            theBranchUL = document.querySelector(query);
            isFirstElment = true;
        }
        console.log("222?");
        console.log(status);
        if (status == 0 || status == 1) {
            var li = document.createElement("li");
            if (isFirstElment) {
                li.innerHTML = '<p class="process">'+`${body}`+'</p>';
            }else{
                li.innerHTML = '<p class="process">'+`${body}`+'</p><div class="arrow"></div>';
            }
            if (x!=0) {
                li.style.left=`${x}px`;    
            }
            theBranchUL.appendChild(li);
            var liLine = document.createElement("li");
            liLine.setAttribute("class", "half"); 
            liLine.innerHTML = '<div class="line"></div>';
            if (x!=0) {
                liLine.style.left=`${x}px`;    
            }
            theBranchUL.appendChild(liLine);  
        }else if(status == 2){
            //else part
            console.log("222?");
        
            var li = document.createElement("li");
            li.setAttribute("class", "abs"); 
            li.innerHTML = '<p class="process">'+`${body}`+'</p><div class="arrow"></div>';

         

            var query0 = ".branch" + String(baseline) + " ul";
            var elses = document.querySelector(query0);
            var last = elses;
            console.log('test');
            console.log(query0);
            console.log(last.lastChild.style.left);
            console.log(last.lastChild.offsetWidth);

            var parsedWidth = parseInt(last.lastChild.offsetWidth);
            var str = (last.lastChild.style.left).replace('px','');
            var parsed = parseInt(str);
            li.style.left = `${parsed + parsedWidth}px`; 
            theBranchUL.appendChild(li);

           

            var liLine = document.createElement("li");
            liLine.setAttribute("class", "half abs"); 
            liLine.innerHTML = '<div class="line"></div>';

            liLine.style.left = `${parsed + parsedWidth + 220.0}px`;
            theBranchUL.appendChild(liLine);  
        }else if(status == 3){
            //then part
            baseline -= 1;
            var li = document.createElement("li");
            li.setAttribute("class", "abs"); 
            li.innerHTML = '<p class="process">'+`${body}`+'</p><div class="arrow-down"></div>';

            var query2 = ".branch" + String(baseline) + " .half";
            liHalfs = document.querySelectorAll(query2);
            console.log(liHalfs);
            var query3 = ".branch" + String(baseline) + " .process";
            plis = document.querySelectorAll(query3);
            var query4 = ".branch" + String(baseline) + " .d";
            allDiamonds = document.querySelectorAll(query4);
            console.log(allDiamonds);

            var query5 = ".branch" + String(baseline) + " .line";
            lis = document.querySelectorAll(query5);
            // if (x!=0) {
            //     x -= 90;
            //     li.style.left=`${x}px`;    
            // }
            var val = plis.length * 220.0 + (allDiamonds.length-1) * 220.0 + (liHalfs.length-1) * 110.0; 
            li.style.left=`${val}px`;    
            theBranchUL.appendChild(li);
        }
        
        console.log('process');
    }

    function endIfel(x=0,baseline=ulIdx,body='',status=0) {
        // var theBranchUL = document.querySelectorAll(".branch"+ ulIdx-1 +" ul");
        var query = ".branch" + String(baseline) + " ul";
        var theBranchUL = document.querySelector(query);
        var isFirstElment = false;
        if (!theBranchUL){
            addBranch(x = baseline);
            theBranchUL = document.querySelector(query);
            isFirstElment = true;
        }
        

      
            var li = document.createElement("li");
            li.setAttribute("class", "endifel"); 
            li.innerHTML = '<div class="rect"></div><div class="circle"></div>';   
            theBranchUL.appendChild(li);
        
            //
            
        console.log('process');
    }


    function addIfelse(x=0,baseline = ulIdx, body=''){
        var query = ".branch" + String(baseline) + " ul";
        var theBranchUL = document.querySelector(query);

        if (!theBranchUL){
            addBranch(x = baseline);
            theBranchUL = document.querySelector(query);
        }
       
        
        //TODO calculate ifel left px 
        var query2 = ".branch" + String(baseline) + " .half";
        liHalfs = document.querySelectorAll(query2);
        console.log(liHalfs);
        var query3 = ".branch" + String(baseline) + " .process";
        plis = document.querySelectorAll(query3);
        var query4 = ".branch" + String(baseline) + " .d";
        allDiamonds = document.querySelectorAll(query4);
        console.log(allDiamonds);

        var query5 = ".branch" + String(baseline) + " .line";
        lis = document.querySelectorAll(query5);

        var val = plis.length * 220.0 + liHalfs.length * 110.0 + allDiamonds.length * 220.0 + 110.0;

        console.log(plis.length);
        console.log(liHalfs.length);
        console.log(val);


        //switch to else part
        query = ".branch" + String(baseline+1) + " ul";
        theBranchUL = document.querySelector(query);
        if (!theBranchUL){
            addBranch(x = baseline+1);
            theBranchUL = document.querySelector(query);
        }
        var li = document.createElement("li");
        li.setAttribute("class", "abs"); 
        li.innerHTML = '<div class="ifel"></div>';
        li.style.left=`${val}px`; 
        theBranchUL.appendChild(li);

        //back to if part
        query = ".branch" + String(baseline) + " ul";
        theBranchUL = document.querySelector(query);
        var diamond = document.createElement("li");
        diamond.setAttribute("class", "d"); 
        diamond.innerHTML = '<div class="diamond"><p class="d-body">'+`${body}`+'</p></div><span class="y">yes</span><span class="n">no</span>';
        theBranchUL.appendChild(diamond);
        console.log('process');

        var liLine = document.createElement("li");
        liLine.setAttribute("class", "half"); 
        liLine.innerHTML = '<div class="line"></div>';
        theBranchUL.appendChild(liLine);
    }

    function addIfthen(x=0,baseline = ulIdx, body=''){
        var query = ".branch" + String(baseline) + " ul";
        var theBranchUL = document.querySelector(query);

        if (!theBranchUL){
            addBranch(x = baseline);
            theBranchUL = document.querySelector(query);
        }

         //if part
         query = ".branch" + String(baseline) + " ul";
         theBranchUL = document.querySelector(query);
         var diamond = document.createElement("li");
         diamond.setAttribute("class", "d"); 
         diamond.innerHTML = '<div class="diamond"><p class="d-body">'+`${body}`+'</p></div><span class="n">yes</span>';
         if (x!=0) {
            //  diamond.style.left=`${x}px`;    
         }
         theBranchUL.appendChild(diamond);
         console.log('process');
 
         var liLine = document.createElement("li");
         liLine.setAttribute("class", "half"); 
         liLine.innerHTML = '<div class="line"></div>';
         if (x!=0) {
            //  liLine.style.left=`${x}px`;    
         }
         theBranchUL.appendChild(liLine);
       
        
        //TODO calculate ifel left px 
        var query2 = ".branch" + String(baseline) + " .half";
        liHalfs = document.querySelectorAll(query2);
        console.log(liHalfs);
        var query3 = ".branch" + String(baseline) + " .process";
        plis = document.querySelectorAll(query3);
        var query4 = ".branch" + String(baseline) + " .d";
        allDiamonds = document.querySelectorAll(query4);
        console.log(allDiamonds);

        var query5 = ".branch" + String(baseline) + " .line";
        lis = document.querySelectorAll(query5);

        //diamond half
        var val = 0.0;
        val = (liHalfs.length-1)*110.0 + plis.length*220.0 + (allDiamonds.length-1)*220.0 + 110.0;
        // val = 180.0 * plis.length;
        // val += 110.0 * liHalfs.length;
        // val += 180.0 * (lis.length - liHalfs.length); 
        console.log(plis.length);
        console.log(liHalfs.length);
        console.log(val);


        //switch to else part
        query = ".branch" + String(baseline+1) + " ul";
        theBranchUL = document.querySelector(query);
        if (!theBranchUL){
            addBranch(x = baseline+1);
            theBranchUL = document.querySelector(query);
        }
        var li = document.createElement("li");
        li.setAttribute("class", "abs"); 
        li.innerHTML = '<div class="ifthen"></div>';
        
        //relative
        if (x!=0 && val > 0) {
            // li.style.left=`${x+val}px`;    
        }
        else if (val > 0) {
            console.log(val);
            // li.style.left=`${x+val}px`;    
        }

        

        li.style.left=`${val}px`; 
        theBranchUL.appendChild(li);

        return val;
    }

    function endFlow(x=0,baseline=ulIdx,status=0) {
        // var theBranchUL = document.querySelectorAll(".branch"+ ulIdx-1 +" ul");
        var query = ".branch" + String(baseline) + " ul";
        var theBranchUL = document.querySelector(query);
        var li = document.createElement("li");
        li.setAttribute("class", "half"); 
        li.innerHTML = '<div class="endprocess"><div class="arrow"></div></div>';
        if (x!=0) {
            li.style.left=`${x}px`;    
        }
        theBranchUL.appendChild(li);
    }

    function checkTotalLanes(filtered){
        var lane = 0;
        var maxLane = 2;
        for (let index = 0; index < filtered.length; index++) {
            switch (filtered[index]) {
                case 'if':
                    lane += 1;
                    break;
                case 'then':
                    lane += 1;
                    break;
                case 'else':
                    lane += 1;
                    break;
                case 'endflow':
                    break;
                case 'endif':
                    if (maxLane < lane) {
                        maxLane = lane;
                    }
                    lane = 0;
                    break;    
                default:
                    break;
            }
            var elementlane = lane - 1;
            if (elementlane < 0) {
                elementlane = 0;
            }
            elementLaneInfo.push(elementlane);
        }
        return maxLane;
    }
});