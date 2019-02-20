let fav_sites = JSON.parse(window.localStorage.getItem('fav_sites'));
document.getElementById('yes').addEventListener("click", () => {
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
        let url = tabs[0].url;
        let title = tabs[0].title;
        let tempObj = new Object();
        tempObj["siteURL"] = url;
        tempObj["siteTitle"] = title;
        fav_sites.push(tempObj);
        window.localStorage.setItem('fav_sites', JSON.stringify(fav_sites));
        window.open('', '_self', '').close();
    });
});
document.getElementById('no').addEventListener('click', () => {
    window.open('', '_self', '').close();
});
document.getElementById('exit').addEventListener('click', () => {
    window.open('', '_self', '').close();
});