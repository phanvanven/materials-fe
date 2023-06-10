function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function animation(sticker, rewidth, size, times) {

    sticker.style.backgroundRepeat = 'repeat-x';
    sticker.style.backgroundSize = `${rewidth}px ${size}px`;
    for (let j = 1; j <= times; j++) {
        for (let i = 0; i >= -rewidth; i -= size) {
            sticker.style.backgroundPosition = `${i}px 0px`;
            await sleep(130);
        }
    }

    if (times == 0) {
        sticker.classList.add('focus');
        sticker.addEventListener('mouseleave', () => {
            sticker.classList.remove('focus');
        })
        sticker.addEventListener('click', () => {
            sticker.classList.remove('focus');
        })
        i = 0;
        while (sticker.classList.contains('focus')) {
            sticker.style.backgroundPosition = `${i}px 0px`;
            i -= size;
            await sleep(130);
            if (i <= -rewidth) {
                i = 0;
            }
        }
        sticker.style.backgroundPosition = '0px 0px';
    }
}

function findParent(child, parentClass) {
    if (child) {
        let parent = child.parentElement;
        while (parent) {
            if (parent.classList.contains(parentClass)) {
                break;
            }
            parent = parent.parentElement;
        }
        return parent;
    }
    return null;
}

function findElePosInNodeList(NodeList, childClass) {
    for (let i = 0; i < NodeList.length; i++) {
        if (NodeList[i].classList.contains(childClass)) {
            return i;
        }
    }
    return -1;
}

function writeToCanvas(src) {
    return new Promise((res) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = src;

        img.onload = () => {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.drawImage(img, 0, 0);
            canvas.toBlob((blob) => {
                res(blob);
            }, 'image/png');
        }
    })
}

async function copyToClipboard(src, type) {
    if (type == 'text') {
        await navigator.clipboard.writeText(src);
    } else if (type == 'image') {
        const blob = await writeToCanvas(src);
        try {
            await navigator.clipboard.write([
                new ClipboardItem({
                    [blob.type]: blob,
                })
            ])
        } catch (e) {
            console.log(e)
        }
    }
}

function download(source) {
    const fileName = source.split('/').pop();
    var el = document.createElement("a");
    el.setAttribute("href", source);
    el.setAttribute("download", fileName);
    document.body.appendChild(el);
    el.click();
    el.remove();
}

function getRandomID(extra) {
    const today = new Date();
    const id = extra
        + String(today.getFullYear())
        + String(today.getMonth())
        + String(today.getDate())
        + String(today.getHours())
        + String(today.getMinutes())
        + String(today.getSeconds())
        + String(today.getMilliseconds());
    return id;
}


function getFile() {
    var fullPath = document.getElementById('id_file_1').value;
    if (fullPath) {
        var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
        var filename = fullPath.substring(startIndex);
        if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
            filename = filename.substring(1);
        }
        alert(filename);
    }
}

function activeAnimatedSticker(sticker, size, times) {
    if (!sticker.classList.contains('running')) {
        sticker.classList.add('running');
        let imageSrc = sticker.style.backgroundImage
            .replace(/url\((['"])?(.*?)\1\)/gi, '$2')
            .split(',')[0];
        let image = new Image();
        image.src = imageSrc;
        image.onload = async function () {
            let width = image.width;
            let rewidth = (width / 130) * size;
            await animation(sticker, rewidth, size, times);
            sticker.classList.remove('running');
        };

    }
}

function activeAnimatedSticker_List(sticker_list, size, times) {
    sticker_list.forEach(function (sticker) {
        sticker.addEventListener('mouseenter', () => {
            if (sticker.classList.contains('animated')) {
                activeAnimatedSticker(sticker, size, times);// times == 0 infinite loop
            }
        })

    })
}

// integer: 12|24
function getTime(type) {
    const today = new Date();
    let years = today.getFullYear(),
        months = today.getMonth() + 1,
        date = today.getDate(),
        hours = today.getHours(),
        minutes = today.getMinutes(),
        pm = 'AM';

    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (date < 10) {
        date = '0' + date;
    }
    if (months < 10) {
        months = '0' + months;
    }

    switch (type) {
        case 24:
            if (hours > 11) {
                pm = 'PM';
            } else if (hours < 10) {
                hours = '0' + hours;
            }
            break;

        case 12:
            if (hours > 11) {
                pm = 'PM';
                if (hours > 12) {
                    if (hours > 23) {
                        hours = '00';
                    }
                    hours = '0' + (hours - 12);
                }
            } else if (hours < 10) {
                hours = '0' + hours;
            }
            break;
    }



    return {
        years: String(years),
        months: String(months),
        date: String(date),
        hours: String(hours),
        minutes: String(minutes),
        pm: pm
    }
}

function setHeightSrollBar(){
    const bar = document.querySelector('.scrollBar-V >div');
    const messageView = document.querySelector('.messageViewContainer');
    bar.style.height = `${messageView.offsetHeight/(messageView.scrollHeight / messageView.offsetHeight)}px`;
}

function createScrollBar(){
    const messageView = document.querySelector('.messageViewContainer');
    const scrollBar_V = document.createElement('div');
    scrollBar_V.classList.add('scrollBar-V');
    scrollBar_V.style.cssText = `
    position: absolute;
    width: 8px;
    opacity: 1;
    right: 2px;
    bottom: 2px;
    top: 2px;
    border-radius: 3px;
    `;
    let height = messageView.offsetHeight/(messageView.scrollHeight / messageView.offsetHeight);
    const bar = document.createElement('div');
    bar.style.cssText = `
    position: relative;
    display: block;
    width: 8px;
    border-radius: 6px;
    margin: 0px 2px;
    background-color: var(--border);
    opacity: 1;
    right: 0px;
    height: ${height}px;
    transform: translateY(159.316px);
    `;
    scrollBar_V.appendChild(bar);
    document.querySelector('.app-chat__right-content').appendChild(scrollBar_V);
}
