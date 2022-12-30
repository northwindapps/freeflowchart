window.addEventListener('DOMContentLoaded', function() {
    console.log('DOM is loaded')

    var el = document.querySelector('#addprocess');
    el.addEventListener('click', addProcess, false);
    function addProcess() {

        console.log('process');
    }
});