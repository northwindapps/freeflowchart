window.addEventListener('DOMContentLoaded', function() {
    console.log('DOM is loaded')

    var addProcessBtn = document.querySelector('#addprocess');
    var addBranchBtn = document.querySelector('#addbranch');
    var mainUL = document.querySelector('#main');
    
    addProcessBtn.addEventListener('click', addProcess, false);
    addBranchBtn.addEventListener('click', addBranch, false);
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
});