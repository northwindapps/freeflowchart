window.addEventListener('DOMContentLoaded', function() {
    console.log('DOM is loaded')

    var addProcessBtn = document.querySelector('#addprocess');
    var addBranchBtn = document.querySelector('#addbranch');
    var addIfelseBtn = document.querySelector('#addif');
    var mainUL = document.querySelector('#main');
    
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
        console.log('process');
    }

    function addProcess() {
        var branchULs = document.querySelectorAll('.branch ul');
        var li = document.createElement("li");
        // li.setAttribute("class", "branch"); 
        li.innerHTML = '<p class="process">how</p><div class="arrow"></div>';
        branchULs[branchULs.length-1].appendChild(li);

        var liLine = document.createElement("li");
        liLine.setAttribute("class", "half"); 
        liLine.innerHTML = '<div class="line"></div>';
        branchULs[branchULs.length-1].appendChild(liLine);
        console.log('process');
    }

    function addIfelse() {
        var branchULs = document.querySelectorAll('.branch ul');
        // var li = document.createElement("li");
        // li.innerHTML = '<div class="ifel"></div>';
        // branchULs[branchULs.length-1].appendChild(li);

        var diamond = document.createElement("li");
        diamond.setAttribute("class", "d"); 
        diamond.innerHTML = '<div class="diamond">hi</div>';
        branchULs[branchULs.length-1].appendChild(diamond);
        console.log('process');

        var liLine = document.createElement("li");
        liLine.setAttribute("class", "half"); 
        liLine.innerHTML = '<div class="line"></div>';
        branchULs[branchULs.length-1].appendChild(liLine);
    }
});