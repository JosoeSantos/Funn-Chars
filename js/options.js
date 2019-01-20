let defaltEmoji = [
    {
        text: "( ͡° ͜ʖ ͡°)",
        usages: 0,
        visible: true,
        insertedAt: Date.now()
    }
];

if (!Array.prototype.find) {
    Array.prototype.find = function (predicate) {
        if (this === null) {
            throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return value;
            }
        }
        return undefined;
    };
}

function onGot(item) {
    console.log("catch");
    console.log(item);
    getData()
}

function onError(error) {
    console.log("error");
    console.log(error)
}

function deleteEmoji(target) {
    console.log("%cdelete", 'color:blue; background-color:#212141');
    let text = target.parentElement.childNodes[0].innerText;
    console.log(text);
    browser.storage.local.get().then((data) => {
        console.log(data);
        let novoArray = [];
        for (let i = 0; i < data.emojis.length; i++) {
            console.log(data.emojis[i]);
            if (data.emojis[i].text === text) continue;
            novoArray.push(data.emojis[i])
        }
        browser.storage.local.set({emojis: novoArray}).then(onGot, onError);
    }).catch(onError);
}

function addEmoji() {
    let text = document.getElementById('in-entry').value;
    console.log(text);
    browser.storage.local.get().then((data) => {
        console.log('sla:');
        let emojis = data.emojis;
        console.log(emojis);
        for (let i = 0; i < emojis.length; i++) {
            console.log(emojis[i]);
            console.log(text);
            if (emojis[i].text === text) return false;
        }
        if (text !== "" && text !== null && text !== undefined) {
            let emoji =
                {
                    text: text,
                    usages: 0,
                    visible: true,
                    insertedAt: Date.now()
                };
            data.emojis.push(emoji);
            browser.storage.local.set(data).then(onGot, onError);
        }

    });
}

function toggleVisibility(){
}

document.addEventListener('click', (event) => {
    if (event.target.className === 'bt-submit') {
        console.log('add emoji');
        addEmoji()
    } else if (event.target.className === 'bt-delete-emoji') {
        console.log('remove-emoji');
        deleteEmoji(event.target)
    } else if (event.target.className === 'badge') {
        console.log('toggle invisible badge')
    } else if (event.target.className === 'badge-text') {
        console.log('toggle invisible badge')
    }
});

function drawEmoji(data) {
    document.getElementById('emoji-list').innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        document.getElementById('emoji-list').innerHTML += `<div class="badge" data-text="${data[i].text}"><span>${data[i].text}</span class="badge-text"><button class="bt-delete-emoji"><i class="material-icons">delete</i></button>`;
    }
}



function getData() {
    browser.storage.local.get().then((data) => {
        if (data.emojis === undefined || data.emojis === "") {
            browser.storage.local.set({emojis: defaltEmoji}).then(onGot, onError)
        } else {
            let arr = data.emojis;
            drawEmoji(arr);
            let controls = document.getElementsByClassName('control');
            for (let i = 0; i < controls.length; i++) {
                controls.item(i).addEventListener('click', deleteEmoji, false);
            }
        }
    });
}

function init() {
    getData();

    browser.storage.onChanged.addListener((changes, areaName) => {
        getData()
    });
}

init();
console.log("init");
