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

    function addBranch() {
        var li = document.createElement("li");
        li.setAttribute("class", "branch " + "branch" + ulIdx); 
        li.innerHTML = '<ul></ul>';
        mainUL.appendChild(li);
        ulIdx += 1;
        console.log('process');
    }

    function addProcess() {
        // var theBranchUL = document.querySelectorAll(".branch"+ ulIdx-1 +" ul");
        var query = ".branch" + String(ulIdx-1) + " ul";
        var theBranchUL = document.querySelector(query);
        var li = document.createElement("li");
        // li.setAttribute("class", "branch"); 
        li.innerHTML = '<p class="process">how</p><div class="arrow"></div>';
        theBranchUL.appendChild(li);

        var liLine = document.createElement("li");
        liLine.setAttribute("class", "half"); 
        liLine.innerHTML = '<div class="line"></div>';
        theBranchUL.appendChild(liLine);
        console.log('branch');
    }

    function addIfelse() {
        // var theBranchUL = document.querySelectorAll('.branch ul');
        var query = ".branch" + String(ulIdx-1) + " ul";
        var theBranchUL = document.querySelector(query);

        if (!theBranchUL){
            addBranch();
        }
        
        //switch to else part
        addBranch();
        // theBranchUL = document.querySelectorAll('.branch ul');
        query = ".branch" + String(ulIdx-1) + " ul";
        theBranchUL = document.querySelector(query);
        var li = document.createElement("li");
        li.innerHTML = '<div class="ifel"></div>';
        theBranchUL.appendChild(li);
        ulIdx -= 1;


        //back to if part
        query = ".branch" + String(ulIdx-1) + " ul";
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
        var query = ".branch" + String(ulIdx-1) + " ul";
        var theBranchUL = document.querySelector(query);    

    }
});