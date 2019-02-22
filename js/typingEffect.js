function typingEffect(greet, user_data, loop = true) {
    // Function to display string
    const strDisplay = (count, typeSpeed = 120, backspacePause = 500) => {
        let i = 1;
        let status = setInterval(count => {
            greet.innerHTML = user_data[count].substring(0, i) + "|";
            if (i == user_data[count].length) {
                clearInterval(status);
                setTimeout((loop) => {
                    if (loop)
                        strDelete(count, user_data); // Call strDelete function to delete string from display
                }, backspacePause, loop);
            }
            ++i;
        }, typeSpeed, count);
    };
    // Functon to delete the string
    const strDelete = (count, user_data, delSpeed = 100) => {
        let i = user_data[count].length;
        let status = setInterval(count => {
            greet.innerHTML = user_data[count].substring(0, i) + "|";
            if (i == 0) {
                clearInterval(status);
                if (++count < user_data.length) {
                    setTimeout(() => {
                        strDisplay(count); // Again call display function to display next set of strings
                    }, 100);
                } else {
                    setTimeout(() => {
                        strDisplay(0); // Repeat the loop of typing all over again
                    }, 100);
                }
            }
            --i;
        }, delSpeed, count);
    };
    strDisplay(0);
}