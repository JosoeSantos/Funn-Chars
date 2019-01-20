function init() {
    var cards = document.getElementsByClassName("card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", evt => {
            document.getElementById("footer").style.display = "none";
            var e = evt.target;
            e = e.childNodes[1];
            if (e === undefined) {
                e = evt.target;
            }
            var range = document.createRange();
            range.selectNode(e);
            var s = window.getSelection();
            s.addRange(range);
            document.execCommand("copy");
            s.removeAllRanges();
            document.getElementById("footer").style.display = "block";
            document.getElementById("dispensar-link").addEventListener("click", function (evt) {
                document.getElementById("footer").style.display = "none";
            });
        });
    }
    browser.commands.onCommand.addListener(command => {
        if (command === "toggle-sidebar") {
            browser.sidebarAction.isOpen({}).then(result => {
                if (result) browser.sidebarAction.close();
                else browser.sidebarAction.open();
            });
        }
    });
}


init();
