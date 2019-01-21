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
    },
    {
        text: "ಠ_ಠ",
        usages: 0,
        visible: true,
        insertedAt: Date.now()
    },
    {
        text: "ʕ•ᴥ•ʔ",
        usages: 0,
        visible: true,
        insertedAt: Date.now()
    },
    {
        text: "(▀̿Ĺ̯▀̿ ̿)",
        usages: 0,
        visible: true,
        insertedAt: Date.now()
    },
    {
        text: "(ʘ‿ʘ)",
        usages: 0,
        visible: true,
        insertedAt: Date.now()
    }
];

browser.runtime.onInstalled.addListener((e) => {
    console.log('instalando...');
    browser.storage.local.get().then(data => {
        if (!data.emojis) {
            browser.storage.local.set({emojis: defaltEmoji}).then(browser.runtime.openOptionsPage())
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
