window.addEventListener('DOMContentLoaded', function() {
    console.log('DOM is loaded')

    var addProcessBtn = document.querySelector('#addprocess');
    var addBranchBtn = document.querySelector('#addbranch');
    var addIfelseBtn = document.querySelector('#addif');
    var addLineBtn = document.querySelector('#addline');
    var addLaneBtn = document.querySelector('#addlane');
    var substractLaneBtn = document.querySelector('#substractlane');
    var mainUL = document.querySelector('#main');
    var ulIdx = 0;
    
    addProcessBtn.addEventListener("click", ()=>{ addProcess();});
    addLineBtn.addEventListener("click", ()=>{ addLine();});
    addLaneBtn.addEventListener("click", ()=>{ addLane();});
    substractLaneBtn.addEventListener("click", ()=>{ substractLane();});
    addBranchBtn.addEventListener("click", ()=>{
        addBranch();
    });
    // addIfelseBtn.addEventListener("click", ()=>{ addIfelse(x=90);});
    addIfelseBtn.addEventListener("click", ()=>{ addIfelse(x=0);});



    //
    //
    var ta = null;
    var str = '';
    var reservedWordsList = ['if','else','endif','end','process','process2','<>', ' '];
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
        for (let index = 0; index < ary.length; index++) {
            var str = ary[index].replace(/\s/g, '');
                    if (str!='') {
    
                        filtered.push(ary[index]);
                    }
        }
        
        console.log(filtered);
        for (let index = 0; index < filtered.length; index++) {
            console.log(filtered[index]);
            switch (filtered[index]) {
                case 'if':
                    await addIfelse(x=0,baseline=ulIdx,body=filtered[index+1]);
                    filtered[index+1] = '';
                    status = 1;
                    break;
    
                case 'then':
                    //process
                    status = 3;
                    if (filtered[index+1]) {
                        var query = ".branch" + String(ulIdx) + " .d";
                        allDiamonds = document.querySelectorAll(query);
                        addProcess(x=90*allDiamonds.length,baseline=ulIdx+1,filtered[index+1],status=status);
                    }
                    addLine();
                    status = 1;

                    break;
                // case 'else':
                //     status = 2;
                //     break;
                // case 'endif':
                //     status = 0;
                //     await endIfElse();
                //     break;
                case 'endflow':
                    status = 0;
                    await endFlow();
                    break;
                
                // case 'end':
                //     if (status == 2) {
                //         await endProcess2();	
                //     }else if(status == 1){
                //         await endProcess1();
                //     }else{
                //         await endProcess();
                //     }
                    
                //     break;
                
                // case ' ':
                
                //     break;
                // default:
                //     var str = filtered[index].replace(/\s/g, '');
                //     if (str!='') {
                //         if (status == 2) {
                //             if (str == 'none') {
                //                 console.log(str);
                //                 await addProcess2Empty(filtered[index]);
    
                //             }else{
                //                 await addProcess2(filtered[index]);
                //             }
                //         }else if(status == 1){
                //             if (str == 'none') {
                //                 console.log(str);
                //                 await addProcess1Empty(filtered[index]);		
                //             }else{
                //                 await addProcess1(filtered[index]);
                //             }
                            
                //         }else{
                //             await addProcess(filtered[index]);
                //         }
                //     }
                //     break;
                default:
                    //process
                    if (filtered[index] && status == 0) {
                        addProcess(x=0,baseline=ulIdx,filtered[index]);
                    }
                    
                    break;
            }
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

    function addLine(x=0,baseline=ulIdx) {
        var query = ".branch" + String(baseline) + " ul";
        var theBranchUL = document.querySelector(query);
        var li = document.createElement("li");
        li.innerHTML = '<div class="line"></div>';
        if (x!=0) {
            li.style.left=`${x}px`;    
        }
        theBranchUL.appendChild(li);

        var li2 = document.createElement("li");
        li2.setAttribute("class", "half");
        li2.innerHTML = '<div class="line"></div>';
        if (x!=0) {
            li2.style.left=`${x}px`;    
        }
        // theBranchUL.appendChild(li2);
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

    function addProcess(x=0,baseline=ulIdx,body='',status=0) {
        // var theBranchUL = document.querySelectorAll(".branch"+ ulIdx-1 +" ul");
        var query = ".branch" + String(baseline) + " ul";
        var theBranchUL = document.querySelector(query);
        var li = document.createElement("li");
        li.innerHTML = '<p class="process">'+`${body}`+'</p><div class="arrow"></div>';
        if (x!=0) {
            li.style.left=`${x}px`;    
        }
        theBranchUL.appendChild(li);
    
        if (status != 3) {
            var liLine = document.createElement("li");
            liLine.setAttribute("class", "half"); 
            liLine.innerHTML = '<div class="line"></div>';
            if (x!=0) {
                liLine.style.left=`${x}px`;    
            }
            theBranchUL.appendChild(liLine);    
        }
        
        console.log('process');
    }

    function addIfelse(x=0,baseline = ulIdx, body=''){
        var query = ".branch" + String(baseline) + " ul";
        var theBranchUL = document.querySelector(query);

        if (!theBranchUL){
            addBranch(x = baseline);
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

        var val = 0.0;

        // val = 180.0 * plis.length;
        // val += 90.0 * liHalfs.length;
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
        li.innerHTML = '<div class="ifel"></div>';
        
        //relative
        if (x!=0 && val > 0) {
            li.style.left=`${x+val}px`;    
        }
        else if (val > 0) {
            console.log(val);
            li.style.left=`${x+val}px`;    
        }
        val = allDiamonds.length * 90.0;
        li.style.left=`${val}px`; 
        theBranchUL.appendChild(li);

       

        //back to if part
        query = ".branch" + String(baseline) + " ul";
        theBranchUL = document.querySelector(query);
        var diamond = document.createElement("li");
        diamond.setAttribute("class", "d"); 
        diamond.innerHTML = '<div class="diamond"><p class="d-body">'+`${body}`+'</p></div>';
        if (x!=0) {
            diamond.style.left=`${x}px`;    
        }
        theBranchUL.appendChild(diamond);
        console.log('process');

        var liLine = document.createElement("li");
        liLine.setAttribute("class", "half"); 
        liLine.innerHTML = '<div class="line"></div>';
        if (x!=0) {
            liLine.style.left=`${x}px`;    
        }
        theBranchUL.appendChild(liLine);
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

    function checkULSize(ulInt){
        var query = ".branch" + String(ulIdx) + " ul";
        var theBranchUL = document.querySelector(query);    

    }
});