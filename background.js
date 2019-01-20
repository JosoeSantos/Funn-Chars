let defaltEmoji = [
    {
        text: "( ͡° ͜ʖ ͡°)",
        usages: 0,
        visible: true,
        insertedAt: Date.now()
    },
    {
        text: "¯\\_(ツ)_/¯",
        usages: 0,
        visible: true,
        insertedAt: Date.now()
    }
];

browser.runtime.onInstalled.addListener((e) => {
    console.log('instalando...');
    browser.runtime.openOptionsPage();
    browser.storage.local.get().then(data => {
        if (!data.emojis) {
            browser.storage.local.set({emojis: defaltEmoji})
        }
    });
});

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
