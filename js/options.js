function onGot(item) {
    getData()
}

function onError(error) {
    console.log(error)
}

function deleteEmoji(target) {
    let text = target.parentElement.childNodes[0].innerText;
    console.log(text);
    browser.storage.local.get().then((data) => {
        let novoArray = [];
        for (let i = 0; i < data.emojis.length; i++) {
            if (data.emojis[i].text === text) continue;
            else console.log(data.emojis[i]);
            novoArray.push(data.emojis[i])
        }
        console.log(novoArray);
        browser.storage.local.set({emojis: novoArray}).then(onGot, onError);
    }).catch(onError);
}

function addEmoji() {
    let text = document.getElementById('in-entry').value;
    text = text.trim();
    browser.storage.local.get().then((data) => {
        let emojis = data.emojis;
        for (let i = 0; i < emojis.length; i++) {
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
            browser.storage.local.set(data).then(() => {
                document.getElementById('in-entry').value = '';
                onGot();
            }, onError);
        }

    });
}

function toggleVisibility(target) {
    let text = target.childNodes[0].innerText;
    browser.storage.local.get().then(data => {
        for (let i = 0; i < data.emojis.length; i++) {
            if (data.emojis[i].text === text)
                data.emojis[i].visible = !data.emojis[i].visible;
        }
        browser.storage.local.set(data).then(onGot, onError);
    }).catch(onError);
}

document.addEventListener('click', (event) => {
    if (event.target.className === 'bt-submit') {
        addEmoji()
    } else if (event.target.className === 'bt-delete-emoji') {
        deleteEmoji(event.target)
    } else if (event.target.className.match(/badge-text/)) {
        toggleVisibility(event.target.parentElement);
    } else if (event.target.className.match(/badge/)) {
        toggleVisibility(event.target);
    } else if (event.target.id === 'in-entry') {
        event.target.addEventListener("click", () => {
            navigator.clipboard.readText().then(clipText => {
                document.getElementById('in-entry').value = clipText;
                event.target.select();
            });
        });
    }
});

function drawEmoji(data) {
    document.getElementById('emoji-list').innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        let v = data[i].visible ? '' : ' invisible';
        document.getElementById('emoji-list').innerHTML += 
        `<div class="badge ${v}" data-text="${data[i].text}">
            <span class="badge-text">
                ${data[i].text}</span>
            <button class="bt-delete-emoji">
                <i class="material-icons">delete</i>
            </button>
        </div>`;
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
    document.getElementById('form-add-emoji').addEventListener("submit", (event) => {
        event.preventDefault();
        return false;
    }, false);

}

init();
