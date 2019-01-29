window.onload = function(){
    // OUTPUT UI
    let task_data = JSON.parse(window.localStorage.getItem('task_data'));
    outputUI();
    // Set Time
    const timeEl = document.querySelector('.time');
    timeEl.textContent = new Date().toLocaleTimeString().substring(0,5);
    function curTime(){
        let time = new Date().toLocaleTimeString();
        timeEl.textContent = new Date().toLocaleTimeString().substring(0,5);
    }
    setInterval(curTime, 1000);

    // Typing Effect
    function typingEffect(){
        // List of sentences
        var _CONTENT = [ "Hey, I'm Utkarsh", 
        "I'm a developer", 
        "I love to develop new crazy stuff",
        "This is a custom page" ];

        // Current sentence being processed
        var _PART = 0;

        // Character number of the current sentence being processed 
        var _PART_INDEX = 0;

        // Holds the handle returned from setInterval
        var _INTERVAL_VAL;

        // Element that holds the text
        var _ELEMENT = document.querySelector('.greet');

        // Implements typing effect
        function Type() { 
            var text =  _CONTENT[_PART].substring(0, _PART_INDEX + 1);
            _ELEMENT.textContent = text + '|';
            _PART_INDEX++;
        
            // If full sentence has been displayed then start to delete the sentence after some time
            if(text === _CONTENT[_PART]) {
                clearInterval(_INTERVAL_VAL);
                setTimeout(function() {
                    _INTERVAL_VAL = setInterval(Delete, 100);
                }, 1000);
            }
        }

        // Implements deleting effect
        function Delete() {
            var text =  _CONTENT[_PART].substring(0, _PART_INDEX - 1);
            _ELEMENT.textContent = text + '|';
            _PART_INDEX--;
        
            // If sentence has been deleted then start to display the next sentence
            if(text === '') {
                clearInterval(_INTERVAL_VAL);
            
                // If last sentence then display the first one, else move to the next
                if(_PART == (_CONTENT.length - 1))
                    _PART = 0;
                else
                    _PART++;
                _PART_INDEX = 0;
            
                // Start to display the next sentence after some time
                setTimeout(function() {
                    _INTERVAL_VAL = setInterval(Type, 100);
                }, 200);
            }
        }

        // Start the typing effect on load
        _INTERVAL_VAL = setInterval(Type, 100);
    }
    typingEffect();
    // Test Unsplash

    // document.querySelector('.tasks').addEventListener('click', background);

    // function background(){
    //     const Http = new XMLHttpRequest();
    //     const url='https://api.unsplash.com/photos/random/?client_id=24514248bf7adefbe5d86d02567c34f6394c4eb6b92028540cda035d3071ef1e';
    //     Http.open("GET", url, true);
    //     Http.send();
    //     Http.onreadystatechange=(e)=>{
    //         console.log(typeof Http.responseText);
    //     var response = Http.responseText;
    //     console.log(response);
    //     var responseObj = JSON.parse(Http.responseText);
    //     console.log(responseObj);
    //     var url = responseObj.links.html;
    //     console.log(url);
    //     document.body.style.backgroundImage = `url(${url}/download)`;
    //     }
    // }
    
    // Works, but is slow so....Leave it for now

    // Save Tasks
    
    
    document.querySelector('.add').addEventListener('click', function(){
        if(document.querySelector('.text').value){
            task_data.push(document.querySelector('.text').value);
        // Clear Input field
        document.querySelector('.text').value = '';
        // Display result output function
        outputUI();
        // Bring focus back to input
        document.querySelector('.text').focus();
        }else{
            document.querySelector('.text').focus();
        }
    });

    function outputUI(){
        let text_submit = '';
            window.localStorage.setItem('task_data', JSON.stringify(task_data));
            console.log();
        for(let i = 0; i < task_data.length; ++i){
            text_submit += `<div class="list" id="task-${i}">${task_data[i]}<i class="material-icons del-icon">cancel</i></div>`;
        }
        document.querySelector('.task-list').innerHTML = text_submit;
    
    }
       

    // Delete Task

        // abstract id of selected task

        var selectedTask = document.querySelector('.task-list');
        selectedTask.addEventListener('click', function(event){
            var deleteID = event.target.parentNode.id;

            // Split the id to get the index number

            let ID = deleteID.split('-')[1];

            // Remove the task from task_data array

            task_data.splice(Number(ID), 1);

            // Update UI

            outputUI();
            });

    // Toggle Addtask Tab in UI

            document.querySelector('.tasks').addEventListener('click', function(){
                document.querySelector('.tasks-list').classList.toggle('hide');
                document.querySelector('.tasks').classList.toggle('toggle-position');
            });

    // EXTREMELY IMPORTANT STEP !! STORING TASKS TO LOCALSTORAGE!!
            // LocalStorage can only store strings
            // To store arrays or objects you would have to convert them to strings.
            // To do this we use the JSON.stringify() method before passing to setItem()
           



}
// const controler = (function(){

//     const setupEventListeners = () => {
//         console.log('test');
//     }
//     return {
//         initiate: () => {
//             setupEventListeners();
//         },
// }

// })();

// window.onload = controler.initiate;


