function init() {

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
