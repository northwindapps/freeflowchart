window.addEventListener('DOMContentLoaded', function() {
    console.log('DOM is loaded')

    var addProcessBtn = document.querySelector('#addprocess');
    var addBranchBtn = document.querySelector('#addbranch');
    var addIfelseBtn = document.querySelector('#addif');
    var mainUL = document.querySelector('#main');
    var ulIdx = 0;
    
    addProcessBtn.addEventListener('click', addProcess, false);
    addBranchBtn.addEventListener('click', addBranch, false);
    addIfelseBtn.addEventListener('click', addIfelse, false);
    function addProcess() {

        console.log('process');
    }

    function addBranch(baseUlIdx=ulIdx) {
        var li = document.createElement("li");
        li.setAttribute("class", "branch " + "branch" + baseUlIdx); 
        li.innerHTML = '<ul></ul>';
        mainUL.appendChild(li);
        console.log('branch');
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
        
        //switch to else part
        addBranch(ulIdx+1);
        query = ".branch" + String(ulIdx+1) + " ul";
        theBranchUL = document.querySelector(query);
        var li = document.createElement("li");
        li.innerHTML = '<div class="ifel"></div>';
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