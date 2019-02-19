const controller = () => {
  // ======================================================================================================
  // Setup global variables

  let user_data = JSON.parse(window.localStorage.getItem("user_data"));
  let task_data = JSON.parse(window.localStorage.getItem("task_data"));
  let user_settings = JSON.parse(window.localStorage.getItem("user_settings"));
  let defaultArg = 0;
  let backgroundImage = JSON.parse(
    window.localStorage.getItem("backgroundImage")
  );

  // =======================================================================================================
  // Setup extension function here

  const setupExtension = () => {
    const setupCenterUI = function() {
      let user_data = [];
      let user_btn = document.querySelector(".user_data");
      document.querySelector(".display").classList.remove("hide");
      document.querySelector(".greet").classList.add("hide");
      document.querySelector(".add-text").addEventListener("click", () => {
        if (user_btn.value) {
          user_data.push(user_btn.value);
          window.localStorage.setItem("user_data", JSON.stringify(user_data)); // Storing data into local

          // Clear input field
          user_btn.value = "";

          // Bring focus back to the field
          user_btn.focus();
        } else user_btn.focus();
      });
    };

    const setupTaskUI = function(arg) {
      window.localStorage.setItem("task_data", "[]");
    };

    const userSettings = () => {
      defaultArg = 1;
      let userSettings = [];
      userSettings.push(defaultArg);
      document.querySelector(".greet-me").classList.remove("hide");
      document.querySelector(".greet").classList.add("hide");
      let user_btn = document.querySelector(".user_settings");
      document
        .querySelector(".greet-me-complete")
        .addEventListener("click", () => {
          if (user_btn) {
            userSettings.push(user_btn.value);
            window.localStorage.setItem(
              "user_settings",
              JSON.stringify(userSettings)
            );
            console.log(userSettings);

            // Clear input field
            user_btn.value = "";

            // Bring focus back to the field
            user_btn.focus();
          } else user_btn.focus();
        });
    };

    // Reload page after setup is completed
    document.querySelector(".setup-complete").addEventListener("click", () => {
      window.location.reload();
    });
    document.getElementById("complete").addEventListener("click", () => {
      window.location.reload();
    });

    return {
      setupCenterUI,
      setupTaskUI,
      userSettings
    };
  };

  // =======================================================================================================
  //  Manage centerUI functions here

  const centerUI = (function() {
    const displayTime = () => {
      const timeEl = document.querySelector(".time");
      timeEl.textContent = new Date().toLocaleTimeString().substring(0, 5);
      function curTime() {
        let time = new Date().toLocaleTimeString();
        timeEl.textContent = new Date().toLocaleTimeString().substring(0, 5);
      }
      setInterval(curTime, 1000);
    };

    function typingEffect() {
      // Setup variables
      let greet = document.querySelector(".greet");
      // Function to display string
      const strDisplay = count => {
        let i = 1;
        let status = setInterval(
          count => {
            greet.textContent = user_data[count].substring(0, i) + "|";
            if (i == user_data[count].length) {
              clearInterval(status);
              setTimeout(() => {
                strDelete(count); // Call strDelete function to delete string from display
              }, 500);
            }
            ++i;
          },
          120,
          count
        );
      };

      const strDelete = count => {
        let i = user_data[count].length;
        let status = setInterval(
          count => {
            greet.textContent = user_data[count].substring(0, i) + "|";
            if (i == 0) {
              clearInterval(status);
              if (++count < user_data.length) {
                setTimeout(() => {
                  strDisplay(count); // Again call display function to display next set of strings
                }, 100);
              } else {
                setTimeout(() => {
                  strDisplay(0); // Again call display function to display next set of strings
                }, 100);
              }
            }
            --i;
          },
          100,
          count
        );
      };

      strDisplay(0);
    }

    const hideGreet = () => {
      document.querySelector(".just-greet").classList.toggle("hide");
      document.querySelector(".stop-greet").classList.toggle("hide");
    };

    const revertChanges = () => {
      window.localStorage.removeItem("user_settings");
      window.location.reload();
    };

    const revertBackground = () => {
      window.localStorage.removeItem("backgroundImage");
      window.location.reload();
    };

    const greet = name => {
      let greet = document.querySelector(".greet");
      let time = new Date().getHours();
      if (time >= 0 && time < 12) greet.innerHTML = "Good Morning, " + name;
      else if (time >= 12 && time < 16)
        greet.innerHTML = "Good Afternoon, " + name;
      else greet.innerHTML = "Good Evening, " + name;
    };

    return {
      displayTime,
      typingEffect,
      greet,
      hideGreet,
      revertChanges,
      revertBackground
    };
  })();

  // ========================================================================================================
  // Manage taskUI here

  const taskUI = (function() {
    const toggleTaskbar = () => {
      document.querySelector(".tasks").addEventListener("click", function() {
        document.querySelector(".tasks-list").classList.toggle("hide");
        document.querySelector(".tasks").classList.toggle("toggle-position");
      });
    };

    const addTasks = () => {
      document.querySelector(".add").addEventListener("click", function() {
        if (document.querySelector(".text").value) {
          task_data.push(document.querySelector(".text").value);

          // Clear Input field
          document.querySelector(".text").value = "";

          // Display result output function
          outputUI();

          // Bring focus back to input
          document.querySelector(".text").focus();
        } else document.querySelector(".text").focus();
      });
    };

    function outputUI() {
      let text_submit = "";
      window.localStorage.setItem("task_data", JSON.stringify(task_data));
      // console.log();
      for (let i = 0; i < task_data.length; ++i) {
        text_submit += `<div class="list" id="task-${i}">${
          task_data[i]
        }<i class="material-icons del-icon">cancel</i></div>`;
      }
      document.querySelector(".task-list").innerHTML = text_submit;
    }

    function deleteTask() {
      var selectedTask = document.querySelector(".task-list");
      selectedTask.addEventListener("click", function(event) {
        var deleteID = event.target.parentNode.id;

        // Split the id to get the index number

        let ID = deleteID.split("-")[1];

        // Remove the task from task_data array

        task_data.splice(Number(ID), 1);

        // Update UI

        outputUI();
      });
    }
    return {
      outputUI: outputUI,
      toggleTaskbar: toggleTaskbar,
      addTasks: addTasks,
      deleteTask: deleteTask
    };
  })();

  // ========================================================================================================
  // AJAX call to Unsplash here for changing backgrond

  const changeBackground = function() {
    document
      .querySelector(".change-background")
      .addEventListener("click", background);

    function background() {
      const Http = new XMLHttpRequest();
      const url =
        "https://api.unsplash.com/photos/random/?client_id=24514248bf7adefbe5d86d02567c34f6394c4eb6b92028540cda035d3071ef1e";
      Http.open("GET", url, true);
      Http.send();
      Http.onreadystatechange = e => {
        // console.log(typeof Http.responseText);
        var response = Http.responseText;
        // console.log(response);
        var responseObj = JSON.parse(Http.responseText);
        // console.log(responseObj);
        var url = responseObj.links.html;
        // console.log(url);
        backgroundImage = `url(${url}/download)`;
        window.localStorage.setItem(
          "backgroundImage",
          JSON.stringify(new Array(backgroundImage))
        );
        document.body.style.backgroundImage = backgroundImage;
      };
    }
  };
  // ========================================================================================================
  // Manage UIexec function execution here

  const UIexec = (function() {
    // Background Image setup
    if (backgroundImage) {
      document.body.style.backgroundImage = backgroundImage;
    }

    // output time
    centerUI.displayTime();

    // Calling setupExtension only if it was not setup earlier
    if (!window.localStorage.getItem("user_data")) {
      setupExtension().setupCenterUI();
      setupExtension().setupTaskUI();
    } else {
      if (user_settings) {
        centerUI.greet(user_settings[1]);
        // Now hide "Just Greet Me" button and show "Stop Greeting Me" button
        centerUI.hideGreet();
        // Setting up an event listener to revert changes
        document
          .querySelector(".stop-greet")
          .addEventListener("click", centerUI.revertChanges);
      } else {
        // output the user_data
        centerUI.typingEffect();
      }
      // Run taskUI function only if setup is completed
      taskUI.toggleTaskbar();
      taskUI.addTasks();
      taskUI.deleteTask();
      taskUI.outputUI();
      // Change background call here to setup event listener
      changeBackground();
      // Event listener to access setup manually
      document
        .querySelector(".change-setup")
        .addEventListener("click", setupExtension().setupCenterUI);
      // Event listener to access greet menu
      document
        .querySelector(".just-greet")
        .addEventListener("click", setupExtension().userSettings);
      // Event listener to revert background image to default
      document
        .querySelector(".default-background")
        .addEventListener("click", centerUI.revertBackground);
    }
  })();
};

window.onload = controller;
