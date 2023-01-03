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
        li.setAttribute("class", "branch"); 
        li.innerHTML = '<ul></ul>';
        mainUL.appendChild(li);
        ulIdx += 1;
        console.log('process');
    }

    function addProcess() {
        var branchULs = document.querySelectorAll('.branch ul');
        var li = document.createElement("li");
        // li.setAttribute("class", "branch"); 
        li.innerHTML = '<p class="process">how</p><div class="arrow"></div>';
        branchULs[ulIdx-1].appendChild(li);

        var liLine = document.createElement("li");
        liLine.setAttribute("class", "half"); 
        liLine.innerHTML = '<div class="line"></div>';
        branchULs[ulIdx-1].appendChild(liLine);
        console.log('process');
    }

    function addIfelse() {
        var branchULs = document.querySelectorAll('.branch ul');

        if (branchULs.length == 0){
            addBranch();
        }
        
        //switch to else part
        addBranch();
        branchULs = document.querySelectorAll('.branch ul');
        var li = document.createElement("li");
        li.innerHTML = '<div class="ifel"></div>';
        branchULs[ulIdx-1].appendChild(li);
        ulIdx -= 1;

        //back to if part
        var diamond = document.createElement("li");
        diamond.setAttribute("class", "d"); 
        diamond.innerHTML = '<div class="diamond">hi</div>';
        branchULs[ulIdx-1].appendChild(diamond);
        console.log('process');

        var liLine = document.createElement("li");
        liLine.setAttribute("class", "half"); 
        liLine.innerHTML = '<div class="line"></div>';
        branchULs[ulIdx-1].appendChild(liLine);
    }

    function checkULSize(ulInt){
        var branchULs = document.querySelectorAll('.branch ul');     

    }
});