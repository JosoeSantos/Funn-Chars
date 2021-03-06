function onGot(item) {
    console.log(item);
}

function onError(error) {
    console.log(error)
}

function drawEmojis(data) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].visible) {
            document.getElementById('card-wraper').innerHTML += `<div class="card center"><span>${data[i].text}</span></div>`
        }
    }
    var cards = document.getElementsByClassName("card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", evt => {
            document.getElementById("footer").style.display = "none";
            var e = evt.target;
            e = e.childNodes[1];
            if (e === undefined) {
                e = evt.target;
            }
            let text = e.innerText;
            countUse(text);
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
}

function countUse(text) {
    browser.storage.local.get().then((data) => {
        for (let i = 0; i < data.emojis.length; i++) {
                if (data.emojis[i].text === text) {
                    data.emojis[i].usages = data.emojis[i].usages + 1;
                    break;
                }
            }
            browser.storage.local.set(data).then(onGot, onError);
        }
    );
}

function draw() {
    browser.storage.local.get().then((data) => {
            if (data.emojis && data.emojis.length > 0) {
                document.getElementById('card-wraper').innerHTML = '';
                drawEmojis(data.emojis);
            } else {
                document.getElementById('card-wraper').innerHTML = 'Sem emoticons.';

            }
            let bts = document.getElementsByClassName('open-config');
            for (let i = 0; i < bts.length; i++) {
                bts[i].addEventListener("click", () => {
                    browser.runtime.openOptionsPage();
                });
            }
        }
    ).catch(err => console.error(err));
}

function init() {
    draw();
    browser.storage.onChanged.addListener((changes, areaName) => {
        draw()
    });
    /*
    document.addEventListener("click", (event)=>{
       if(event.target.className === 'open-config')
    });*/
}

init();
