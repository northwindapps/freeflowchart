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
    
    addProcessBtn.addEventListener('click', addProcess, false);
    addLineBtn.addEventListener('click', addLine, false);
    addLaneBtn.addEventListener('click', addLane, false);
    substractLaneBtn.addEventListener('click', substractLane, false);
    addBranchBtn.addEventListener("click", ()=>{
        addBranch();
    });
    addIfelseBtn.addEventListener('click', addIfelse, false);
    function addProcess() {

        console.log('process');
    }

    function addLane() {
        ulIdx += 1;
        console.log(ulIdx);
    }

    function substractLane() {
        ulIdx -= 1;
        console.log(ulIdx);
    }

    function addLine() {
        
        var query = ".branch" + String(ulIdx) + " ul";
        var theBranchUL = document.querySelector(query);
        var li = document.createElement("li");
        li.innerHTML = '<div class="line"></div>';
        theBranchUL.appendChild(li);

        var li2 = document.createElement("li");
        li2.setAttribute("class", "half");
        li2.innerHTML = '<div class="line"></div>';
        theBranchUL.appendChild(li2);
        console.log(li2);
         
    }

    function addBranch(baseUlIdx = 0) {
        if (!baseUlIdx) {
            baseUlIdx = ulIdx;
        }
        var li = document.createElement("li");
        li.setAttribute("class", "branch " + "branch" + baseUlIdx); 
        li.innerHTML = '<ul></ul>';
        mainUL.appendChild(li);
        console.log('branch');
        console.log(baseUlIdx);
    }

    function addProcess() {
        // var theBranchUL = document.querySelectorAll(".branch"+ ulIdx-1 +" ul");
        var query = ".branch" + String(ulIdx) + " ul";
        var theBranchUL = document.querySelector(query);
        var li = document.createElement("li");
        li.innerHTML = '<p class="process">how</p><div class="arrow"></div>';
        theBranchUL.appendChild(li);

        var liLine = document.createElement("li");
        liLine.setAttribute("class", "half"); 
        liLine.innerHTML = '<div class="line"></div>';
        theBranchUL.appendChild(liLine);
        console.log('process');
    }

    function addIfelse() {
        var query = ".branch" + String(ulIdx) + " ul";
        var theBranchUL = document.querySelector(query);

        if (!theBranchUL){
            addBranch();
        }
       
        
        //TODO calculate ifel left px 
        var query2 = ".branch" + String(ulIdx) + " .half";
        liHalfs = document.querySelectorAll(query2);
        console.log(liHalfs);
        var query3 = ".branch" + String(ulIdx) + " .process";
        plis = document.querySelectorAll(query3);
        var query4 = ".branch" + String(ulIdx) + " .d";
        allDiamonds = document.querySelectorAll(query4);
        console.log(allDiamonds);

        var val = 0.0;

        val = 180.0 * plis.length;
        val += 90.0 * liHalfs.length; 
        console.log(plis.length);
        console.log(liHalfs.length);
        console.log(val);


        //switch to else part
        addBranch(ulIdx+1);
        query = ".branch" + String(ulIdx+1) + " ul";
        theBranchUL = document.querySelector(query);
        var li = document.createElement("li");
        li.innerHTML = '<div class="ifel"></div>';
        
        //relative
        if (plis.length > 0) {
            var floored = Math.floor(val);
            console.log(val);
            li.style.left=`${floored}px`;    
        }
        theBranchUL.appendChild(li);

       

        //back to if part
        query = ".branch" + String(ulIdx) + " ul";
        theBranchUL = document.querySelector(query);
        var diamond = document.createElement("li");
        diamond.setAttribute("class", "d"); 
        diamond.innerHTML = '<div class="diamond">hi</div>';
        theBranchUL.appendChild(diamond);
        console.log('process');

        var liLine = document.createElement("li");
        liLine.setAttribute("class", "half"); 
        liLine.innerHTML = '<div class="line"></div>';
        theBranchUL.appendChild(liLine);
    }

    function checkULSize(ulInt){
        var query = ".branch" + String(ulIdx) + " ul";
        var theBranchUL = document.querySelector(query);    

    }
});