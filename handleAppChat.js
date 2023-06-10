const appChatRight__Footer = document.querySelector('.app-chat__right-footer');
const messInput = document.getElementById('mess-input');
const scrollToBottom = (node) => {
    node.scrollTop = node.scrollHeight;
}
const urlEmoji = 'assets/emoji-materials.png';
const reactIconList_obj = {
    like: '84% 82.5%',
    heart: '84% 72.5%',
    laugh: '82% 7.5%',
    cry: '84% 2.5%',
    surprise: '84% 22.5%',
    dig: '82% 80%',
    glance: '82% 65%',
    angry: '84% 5%'
};

let sticker_list = document.querySelectorAll('.card--sticker .sticker');
activeAnimatedSticker_List(sticker_list, 130, 5);

function showEmotionalAction(emotionalAction, chatMessage) {
    // Insert Emoji
    if (!chatMessage.querySelector('.reactIcon-template-list')) {
        const ul = document.createElement('ul');
        ul.classList.add('reactIcon-template-list');
        emotionalAction.appendChild(ul);
        let reactIcontemplatelist = chatMessage.querySelector('.reactIcon-template-list');
        for (key in reactIconList_obj) {
            const li = document.createElement('li');
            li.classList.add('react-icon');
            li.innerHTML = `
            <span style="background: url(${urlEmoji}) ${reactIconList_obj[key]} / 5100%;">
            </span>
            `;
            reactIcontemplatelist.appendChild(li);
        }
    }

    let reactIcon_NodeList = emotionalAction.querySelectorAll('.reactIcon-template-list .react-icon');
    reactIcon_NodeList.forEach(function (reactIcon_item) {
        let chatCard = chatMessage.querySelector('.card');
        reactIcon_item.addEventListener('click', function () {
            if (!chatCard.classList.contains('card-has-react')) {
                chatCard.classList.add('card-has-react');
                chatCard.querySelector('.react-list').innerHTML = `
                <div class="react-icon-list">
                    <ul>
                        <li class="total-reacts">
                            <span></span>
                        </li>
                    </ul>
                </div>
                `;
            }

            let cardHasReactIcon_reactList_ul = chatCard.querySelector('.react-list .react-icon-list ul');
            let cardHasReactIcon_NodeList = cardHasReactIcon_reactList_ul.querySelectorAll('.react-icon');
            let existed = false;
            if (cardHasReactIcon_NodeList.length) {
                if (cardHasReactIcon_NodeList.length < 3) {
                    for (let react_icon of cardHasReactIcon_NodeList) {
                        if (reactIcon_item.getElementsByTagName('span')[0].style.background == react_icon.getElementsByTagName('span')[0].style.background) {
                            existed = true;
                            break
                        }
                    }
                    if (!existed) {
                        cardHasReactIcon_reactList_ul.insertBefore(reactIcon_item.cloneNode(true), cardHasReactIcon_reactList_ul.children[0]);
                    }
                }
            } else {
                cardHasReactIcon_reactList_ul.insertBefore(reactIcon_item.cloneNode(true), cardHasReactIcon_reactList_ul.children[0]);
            }
            let total_reacts = chatCard.querySelector('.total-reacts');
            total_reacts.innerHTML = (isNaN(total_reacts.innerHTML) == true ? 0 : parseInt(total_reacts.innerHTML)) + 1;
            chatMessage.querySelector('.chat-message__actions').innerHTML = '';
            chatMessage.querySelector('.chat-message__actions').innerHTML = '';

        }, { once: true })
    })
}

function removeMessage(chatMessage) {
    const chatItem = findParent(chatMessage, 'chat-item');
    if (chatMessage.parentElement.querySelectorAll('.chat-message').length < 2) {
        const prevElement = chatItem.previousElementSibling;
        chatItem.remove();
        if (prevElement.classList.contains('chat-date')) {
            prevElement.remove();
        }
    } else {
        const nextSibling = chatMessage.nextElementSibling;
        if (nextSibling) {
            if (nextSibling.classList.contains('sending-time')) {
                chatItem.querySelector('.sending-time').remove();
            }
        }
        chatMessage.remove();
    }
}

function showMoreAction(chatMessage, moreAction, type) {
    const ul = document.createElement('ul');
    const liElement_copy = document.createElement('li');
    const liElement_share = document.createElement('li');
    const liElement_rm = document.createElement('li');
    const liElement_download = document.createElement('li');
    const idMess = chatMessage.id;
    ul.classList.add(idMess, 'more-option-list');
    liElement_rm.classList.add('remove-message', 'danger');

    liElement_rm.innerHTML = `
    <div class="icon-remove-message">
        <ion-icon name="trash-outline"></ion-icon>
    </div>
    <span class="text-nowrap danger">Xóa tin nhắn</span>
    `;

    liElement_rm.addEventListener('click', () => {
        removeMessage(chatMessage);
        openPopover(($('.popover')), {}, false);
    })
    switch (type) {
        case 'text':
            liElement_copy.classList.add('copy-text');
            liElement_copy.innerHTML = `
            <div class="icon-copy-message text">
                <ion-icon name="copy-outline"></ion-icon>
            </div>
            <span class="text-nowrap">Copy tin nhắn</span>
            `;

            liElement_copy.addEventListener('click', () => {
                const copyText = document.getElementById(idMess).querySelector('.message-content >span').innerText;
                copyToClipboard(copyText, 'text');
                hoverOutChatMess_Item(chatMessage);
                openPopover(($('.popover')), {}, false);
            })
            ul.appendChild(liElement_copy);
            break;
        case 'image':
            liElement_copy.classList.add('copy-image');
            liElement_copy.innerHTML = `
            <div class="icon-copy-message image">
                <ion-icon name="copy-outline"></ion-icon>
            </div>
            <span class="text-nowrap">Copy hình ảnh</span>
            `;
            liElement_copy.addEventListener('click', () => {
                const src = document.getElementById(idMess).querySelector('img').src;
                copyToClipboard(src, 'image');
                hoverOutChatMess_Item(chatMessage);
                openPopover(($('.popover')), {}, false);
            })

            liElement_share.classList.add('share-file');
            liElement_share.innerHTML = `
            <div class="icon-share-message file">
                <ion-icon name="share-social-outline"></ion-icon>
            </div>
            <span class="text-nowrap">Chia sẻ</span>
            `;
            liElement_download.classList.add('download-file');
            liElement_download.innerHTML = `
            <div class="icon-download-message file">
                <ion-icon name="download-outline"></ion-icon>
            </div>
            <span class="text-nowrap">Tải về máy</span>
            `;
            ul.appendChild(liElement_copy);
            ul.appendChild(liElement_share);
            ul.appendChild(liElement_download);
            break;
        case 'file':
            liElement_share.classList.add('share-file');
            liElement_share.innerHTML = `
            <div class="icon-share-message file">
                <ion-icon name="share-social-outline"></ion-icon>
            </div>
            <span class="text-nowrap">Chia sẻ</span>
            `;
            ul.appendChild(liElement_share);
            break;
        default:
            break;
    }

    ul.appendChild(liElement_rm);
    if ($('.page-content').hasClass('fullScreen-mode')) {
        $('.inset').css({
            'z-index': 900
        })
    }
    if (!$('.popover').children().length) {
        $('.popover').append(ul);
        $('.popover').css({ 'z-index': 1000 })
        let XY_pos = getPopoverXYPosition($('.popover'), moreAction, pos.BOTTOM_LEFT_ELE);
        openPopover($('.popover'), XY_pos, true);

    } else {
        if ($('.popover').offset().left != moreAction.offset().left || $('.popover').offset().top != moreAction.offset().top) {
            $('.popover').empty();
            $('.popover').append(ul);
            $('.popover').css({
                left: `${(moreAction.offset().left - $('.popover').innerWidth()) + moreAction.innerWidth()}px`,
                top: `${moreAction.offset().top + moreAction.innerHeight()}px`,
                opacity: 1,
            })
        }
    }
}

function showReplyAction(chatMessage, type, url = {}) {
    let userName = document.querySelector('.app-chat__right-header .user-info >p').innerHTML;
    let textContent = '';
    let mesPos = chatMessage.id;
    const div = document.createElement('div');
    const divElement_close = document.createElement('div');
    divElement_close.classList.add('quote-close');
    divElement_close.innerHTML = '<ion-icon name="close-circle"></ion-icon>';

    const quoteBanner = document.createElement('div');
    quoteBanner.classList.add('quote-banner');

    if (document.querySelector('.highlighted')) {
        document.querySelectorAll('.highlighted').forEach((item) => {
            item.classList.remove('highlighted');
        })
    }

    chatMessage.querySelector('.card').classList.add('highlighted');
    switch (type) {
        case 'text':
            quoteBanner.classList.add('text');
            textContent = chatMessage.querySelector('.message-content>span').innerHTML;
            break;
        case 'image':
            quoteBanner.classList.add('image');
            textContent = '[Hình ảnh]';
            div.style.display = 'flex';
            div.style.alignItems = 'center';
            div.innerHTML = `
            <div class="img" style="width: 47px; height: 37px; margin-right: 10px;">
                <img src="${url.image}" style="width: 100%; height: 100%; border-radius: 2px;">
            </div>
            `;
            break;
        case 'sticker':
            quoteBanner.classList.add('sticker');
            textContent = '[Sticker]';
            div.classList.add('sticker-zone');
            div.innerHTML = `
            <div class="sticker animated" style="background-image: url(${url.sticker}); width: 37px; height: 37px;"></div>
            `;
            break;
        case 'file':
            quoteBanner.classList.add('file');
            textContent = '[Tập tin]';
            div.classList.add('file-zone');
            div.innerHTML = `
            <div class="file-icon" style="width: 37px; height: 37px;">
                <div style="background-image: url(${url.file});"></div>
            </div>
            `;
            break;
        case 'emoji':
            quoteBanner.classList.add('emoji');
            textContent = '[Emoji]';
            div.classList.add('react-icon');
            div.style.display = 'flex';
            div.style.justifyContent = 'center';
            div.style.alignItems = 'center';
            div.style.marginRight = '10px';
            div.innerHTML = `
            <span style="background: url(${url.emoji}) ${url.pos}; width: 37px; height: 37px;"></span>
            `;
            break;
        default:
            break;
    }

    if (appChatRight__Footer.querySelector('.quote-banner')) {
        appChatRight__Footer.lastElementChild.remove();
    }
    const quoteBannerName = document.createElement('div');
    quoteBannerName.classList.add(mesPos, 'quote-banner-name');
    if (type != 'text') {
        quoteBannerName.appendChild(div);
    }

    const div2 = document.createElement('div');
    div2.classList.add('text-nowrap');
    div2.style.display = 'flex';
    div2.style.flexDirection = 'column';
    div2.innerHTML = `
    <span class="text-nowrap">Trả lời <b class="primary">${userName}</b></span>
    <div>
        <span class="text-nowrap">${textContent}</span>
        <div>
            <ion-icon name="arrow-undo"></ion-icon>
        </div>
    </div>
    `;
    quoteBannerName.appendChild(div2);
    quoteBanner.appendChild(quoteBannerName);
    quoteBanner.appendChild(divElement_close);
    appChatRight__Footer.appendChild(quoteBanner);
}

function hoverInChatMess_Item(chatMessage) {
    chatMessage.querySelector(".chat-message__actions").innerHTML = `
    <div class="chat-message__actions__emotion">
        <span class="material-symbols-sharp">sentiment_satisfied</span>
    </div>
    <div class="chat-message__actions__replyBtn">
        <ion-icon name="arrow-undo"></ion-icon>
    </div>
    <div class="chat-message__actions__more">
        <ion-icon name="ellipsis-vertical-sharp"></ion-icon>
    </div>
    `;
    chatMessage.querySelector(".chat-message__actions").classList.add("active");

    let emotionalAction = document.querySelector('.chat-content .chat-message .chat-message__actions__emotion');
    let replyAction = document.querySelector('.chat-content .chat-message .chat-message__actions__replyBtn');
    let moreAction = $('.chat-content .chat-message .chat-message__actions__more');


    if (emotionalAction) {
        emotionalAction.addEventListener('click', function () {
            showEmotionalAction(emotionalAction, chatMessage);
        }, { once: true })
    }

    if (replyAction) {
        replyAction.addEventListener('click', function () {
            //todo: on top of this file
            messInput.focus();
            if (chatMessage.querySelector('.card--text')) {
                showReplyAction(chatMessage, 'text');
            } else if (chatMessage.querySelector('.card--image')) {
                const src = chatMessage.querySelector('img').src;
                showReplyAction(chatMessage, 'image', { image: src });
            } else if (chatMessage.querySelector('.card--file')) {
                const src = chatMessage.querySelector('.file-icon >div').style.backgroundImage.slice(4, -1).replace(/"/g, "");
                showReplyAction(chatMessage, 'file', { file: src });
            } else if (chatMessage.querySelector('.card--sticker')) {
                const src = chatMessage.querySelector('.sticker-zone >div').style.backgroundImage.slice(4, -1).replace(/"/g, "");
                showReplyAction(chatMessage, 'sticker', { sticker: src });
            } else if (chatMessage.querySelector('.card--emoji')) {
                const src = chatMessage.querySelector('.react-icon >span').style.backgroundImage.slice(4, -1).replace(/"/g, "");
                let pos = chatMessage.querySelector('.react-icon >span').style.backgroundPosition + ' / ' + chatMessage.querySelector('.react-icon >span').style.backgroundSize;
                showReplyAction(chatMessage, 'emoji', { emoji: src, pos: pos });
            }
        })
    }

    if (moreAction) {
        moreAction.on('click', function () {
            // moreAction -> get size
            if (chatMessage.querySelector('.card--text')) {
                showMoreAction(chatMessage, moreAction, 'text');
            } else if (chatMessage.querySelector('.card--image')) {
                showMoreAction(chatMessage, moreAction, 'image');
            } else if (chatMessage.querySelector('.card--file')) {
                showMoreAction(chatMessage, moreAction, 'file');
            } else if (chatMessage.querySelector('.card--sticker')) {
                showMoreAction(chatMessage, moreAction, 'sticker');
            } else if (chatMessage.querySelector('.card--emoji')) {
                showMoreAction(chatMessage, moreAction, 'emoji');
            }
            hoverInChatMess_Item(chatMessage);
        })
    }
}

function hoverOutChatMess_Item(chatMessage) {
    if (chatMessage) {
        chatMessage.querySelector('.chat-message__actions').classList.remove('active');
        chatMessage.querySelector('.chat-message__actions').innerHTML = '';
    }
}

function clickReplyMess_Item(replyMessItem) {
    const idMess = 'id_msg_' + replyMessItem.id;
    const chatContent = document.getElementById(idMess);
    setTimeout(() => {
        chatContent.querySelector('.card').classList.remove('pulse_highlighted');
    }, 4000);
    chatContent.querySelector('.card').classList.add('pulse_highlighted');
    chatContent.scrollIntoView(false);//scroll top - false ~ scroll down
}

function showEmotionalAction_Img(emotionalAction, chatMessage) {
    if (!chatMessage.querySelector('.reactIcon-template-list')) {
        const ul = document.createElement('ul');
        ul.classList.add('reactIcon-template-list');
        emotionalAction.appendChild(ul);
        let reactIcontemplatelist = chatMessage.querySelector('.reactIcon-template-list');
        for (key in reactIconList_obj) {
            const li = document.createElement('li');
            li.classList.add('react-icon');
            li.innerHTML = `
            <span style="background: url(${urlEmoji}) ${reactIconList_obj[key]} / 5100%;">
            </span>
            `;
            reactIcontemplatelist.appendChild(li);
        }
    }
}

function createNewTimeLine(type) {
    const today = getTime(type);
    let timeLineNodeList = document.querySelectorAll('.chat-date .time-line');
    let timeLine = timeLineNodeList[timeLineNodeList.length - 1];
    let lastDates = timeLine.querySelector('span').innerText.split(' ')[2].split('/');
    lastDates = lastDates.concat(timeLine.querySelector('span').innerText.split(' ')[0].split(':'));
    const appChatRight__Content = document.querySelector('.app-chat__right-content');
    const child_appChatRight_Content = appChatRight__Content.querySelector('.messageViewContainer');
    if ((today.date != lastDates[0]) || (today.months != lastDates[1]) || (today.years != lastDates[2])) {
        const chatDate = document.createElement('div');
        chatDate.classList.add('chat-date');
        chatDate.innerHTML = `
            <div class="time-line">
                <span>${today.hours}:${today.minutes} ngày ${today.date}/${today.months}/${today.years}</span>
            </div>
        `;
        child_appChatRight_Content.appendChild(chatDate);
        const chatItem = document.createElement('div');
        chatItem.classList.add('chat-item');
        chatItem.classList.add('me');

        chatItem.innerHTML = `
            <div>
                <div class="user-photo me">
                    <img src="./images/img1.jpg" alt="">
                </div>
            </div>
            <div class="chat-content me">
            
            </div>
        `;
        child_appChatRight_Content.appendChild(chatItem);

    }
}

function getSendingTime(type) {
    const today = getTime(type);
    if (type == 24) {
        today.pm = '';
    }
    const sendingTime = document.createElement('div');
    sendingTime.classList.add("sending-time", "me");
    sendingTime.innerHTML = `
    <div class="icon-send-done">
        <span class="material-symbols-sharp">done</span>
    </div>
    <div class="icon-send-doneAll none">
        <span class="material-symbols-sharp">done_all</span>
    </div>
    <span>${today.hours}:${today.minutes} ${today.pm}</span>
    `;

    return sendingTime;
}

function chat(obj, size = {}, messInput = '') {
    createNewTimeLine(12);
    const chatMessage = document.createElement('div');
    chatMessage.classList.add('chat-message');
    chatMessage.setAttribute('id', getRandomID('id_msg_'));
    chatMessage.addEventListener("mouseenter", function () {
        hoverInChatMess_Item(chatMessage);
    });

    chatMessage.addEventListener("mouseleave", function () {
        hoverOutChatMess_Item(chatMessage);
    });

    chatMessage.classList.add('me');
    chatMessage.innerHTML = `
        <div class="chat-message__actionHolder me" style="min-width: 120px;">
            <div class="chat-message__actions me"></div>
        </div>
    `;

    const divReactList = document.createElement('div');
    divReactList.classList.add('react-list', 'me');
    divReactList.innerHTML = `
    <div class="react-icon-list">                                         
    </div>
    `;

    const card = document.createElement('div');
    card.classList.add('card', 'me');
    const divmessageContent = document.createElement('div');
    divmessageContent.classList.add('message-content');
    switch (obj.type) {
        case 'emoji':
            card.classList.add('card--emoji');
            divmessageContent.innerHTML = `
            <div class="react-icon">
                <span style="background: url(${obj.src}) ${obj.pos};
                width: ${size.width}px;
                height: ${size.height}px;
                margin-bottom: 1px;">
                </span>
            </div>
            `;
            break;
        case 'sticker':
            card.classList.add('card--sticker');
            divmessageContent.innerHTML = `
            <div class="sticker-zone">
                <div class="sticker ${obj.static}" 
                style="
                background-image: url(${obj.src});
                width: ${size.width}px;
                height: ${size.height}px;
                ">
                </div>
            </div>
            `;

            const sticker = divmessageContent.querySelector('.sticker');
            if (sticker.classList.contains('animated')) {
                sticker.addEventListener('mouseenter', () => {
                    activeAnimatedSticker(sticker, 130, 5);
                })
            }
            break;
        default:
            card.classList.add('card--text');
            divmessageContent.innerHTML = `
            <span>${messInput}</span>
            `;
            const quoteBanner = appChatRight__Footer.querySelector('.quote-banner');
            const divReplyMessage = document.createElement('div');
            if (quoteBanner) {
                const userName = quoteBanner.querySelector('span >b').innerText;
                const id = quoteBanner.querySelector('.quote-banner-name').className.split(' ')[0];
                let src = '';
                let content = '';
                divReplyMessage.setAttribute('id', id.split('_')[2]);
                divReplyMessage.classList.add('reply-message');
                divReplyMessage.addEventListener('click', () => {
                    clickReplyMess_Item(divReplyMessage);
                })
                const type = quoteBanner.className.split(' ')[1];
                if (type != 'text') {
                    divReplyMessage.style.flexDirection = 'row';
                    divReplyMessage.style.justifyContent = 'start';

                }
                switch (type) {
                    case 'file':
                        content = '[Tập tin]';
                        src = document.getElementById(id).querySelector('.card .file-icon >div').style.backgroundImage.slice(4, -1).replace(/"/g, "");
                        divReplyMessage.innerHTML = `
                        <div class="file-zone">
                            <div class="file-icon" style="width: 40px; height: 40px;">
                                <div style="background-image: url(${src});">
                                </div>
                            </div>
                        </div>
                        `;
                        break;
                    case 'sticker':
                        content = '[Sticker]';
                        src = document.getElementById(id).querySelector('.card .sticker-zone .sticker').style.backgroundImage.slice(4, -1).replace(/"/g, "");
                        divReplyMessage.innerHTML = `
                        <div class="sticker-zone" style="margin-right: 10px; padding: 0;">
                            <div class="sticker static" style="background-image: url(${src}); width: 40px; height: 40px;"></div>
                        </div>
                        `;
                        break;
                    case 'emoji':
                        content = '[Emoji]';
                        src = document.getElementById(id).querySelector('.card .react-icon >span').style.backgroundImage.slice(4, -1).replace(/"/g, "");
                        let pos = document.getElementById(id).querySelector('.card .react-icon >span').style.backgroundPosition + ' / ' + document.getElementById(id).querySelector('.card .react-icon >span').style.backgroundSize;
                        divReplyMessage.innerHTML = `
                        <div class="react-icon" style="display: flex; align-items: center; margin-right: 10px;">
                            <span style="background: url(${src}) ${pos}; width: 40px; height: 40px;"></span>
                        </div>
                        `;
                        break;
                    case 'image':
                        content = '[Hình ảnh]';
                        src = document.getElementById(id).querySelector('.card--image .img img').src;
                        divReplyMessage.innerHTML = `
                        <div class="img" style="width: 50px; height: 40px; margin-right: 10px;">
                            <img src="${src}" style="width: 100%; height: 100%; border-radius: 2px;">
                        </div>
                        `;
                        break;
                    default:
                        content = document.getElementById(id).querySelector('.card .message-content >span').innerText;
                        break;
                }

                const div = document.createElement('div');
                div.style.display = 'flex';
                div.style.flexDirection = 'column';
                div.style.justifyContent = 'center';
                div.innerHTML = `
                <span class="text-nowrap"><b>${userName}</b></span>
                <div class="text-nowrap">
                    <span>
                        ${content}
                    </span>
                </div>
                `;
                divReplyMessage.appendChild(div);
                card.appendChild(divReplyMessage);
                document.getElementById(id).querySelector('.highlighted').classList.remove('highlighted');
                quoteBanner.remove();
            }
            break;
    }

    card.appendChild(divmessageContent);
    card.appendChild(divReactList);
    chatMessage.appendChild(card);
    let chatContent_NodeList_Me = document.querySelectorAll('.app-chat__right-content .chat-content.me');
    // !: CHỖ NÀY CÓ NGUY CƠ PHÁT SINH LỖI DO TIN NHẮN CUỐI CÙNG LÀ ĐỐI PHƯƠNG GỬI ĐẾN
    const chatContent = chatContent_NodeList_Me[chatContent_NodeList_Me.length - 1];
    if (chatContent.querySelector('.sending-time')) {
        chatContent.querySelector('.sending-time').remove();
    }

    chatContent.appendChild(chatMessage);
    chatContent.appendChild(getSendingTime(12));
    // messInput.value = '';
    const scrollbarContainer = document.querySelector('.messageViewContainer');
    scrollToBottom(scrollbarContainer);
}

messInput.addEventListener('keypress', function (e) {
    if ((e.key === 'Enter') && (messInput.value != '')) {
        chat({ type: 'text' }, {}, messInput.value);
        messInput.value = '';
    }
})

const initApp = () => {
    const dragOverlayMessage = document.querySelector('.dragOverlayMessage');
    const chatContent = document.querySelector('.app-chat__right-content');

    const prevents = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        chatContent.addEventListener(eventName, prevents);
        dragOverlayMessage.addEventListener(eventName, prevents);
    });

    ['dragenter', 'dragover'].forEach((eventName) => {
        chatContent.addEventListener(eventName, () => {
            dragOverlayMessage.classList.add('dragstart', 'highlight');
            dragOverlayMessage.style.display = 'flex';
        })
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dragOverlayMessage.addEventListener(eventName, () => {
            dragOverlayMessage.classList.remove('dragstart', 'highlight');
            dragOverlayMessage.style.display = 'none';
        })

    })

    dragOverlayMessage.addEventListener('drop', handleDrop, false);

}

document.addEventListener('DOMContentLoaded', initApp);

function handleDrop(e) {
    let dt = e.dataTransfer;
    let files = dt.files;
    handleFiles(files);
}

function handleFiles(files) {
    // ([...files]).forEach(uploadFile);
    files = [...files];
    files.forEach(previewFile);
}

// send to sever but the second way
// function uploadFile(file) {
//     let url = 'YOUR URL HERE'
//     let formData = new FormData()

//     formData.append('file', file)

//     fetch(url, {
//         method: 'POST',
//         body: formData
//     })
//         .then(() => { /* Done. Inform the user */ })
//         .catch(() => { /* Error. Inform the user */ })
// }

// send to sever
// function uploadFile(file) {
//     var url = 'YOUR URL HERE';
//     var xhr = new XMLHttpRequest();
//     var formData = new FormData();
//     xhr.open('POST', url, true);

//     xhr.addEventListener('readystatechange', function (e) {
//         if (xhr.readyState == 4 && xhr.status == 200) {
//             // Done. Inform the user
//         }
//         else if (xhr.readyState == 4 && xhr.status != 200) {
//             // Error. Inform the user
//         }
//     })

//     formData.append('file', file);
//     xhr.send(formData);
// }


function renderImageFromFile(file) {
    const reader = new FileReader();
    reader.onload = function () {
        const image = new Image();
        image.style.height = '100%';
        image.style.width = '100%';
        image.style.borderRadius = '8px';
        image.src = reader.result;
        image.onload = () => {
            createNewTimeLine(12);
            const divChatMessage = document.createElement('div');
            const divCard = document.createElement('div');
            const divmessageContent = document.createElement('div');
            const divImg = document.createElement('div');
            divImg.classList.add('img');
            divImg.appendChild(image)
            divmessageContent.classList.add('message-content');
            divmessageContent.appendChild(divImg);
            divCard.classList.add('card', 'card--image', 'me');
            divCard.innerHTML = `
            <div class="react-list me"></div>
            `;
            divCard.appendChild(divmessageContent);
            divChatMessage.setAttribute('id', getRandomID('id_msg_'));
            divChatMessage.addEventListener("mouseenter", function () {
                hoverInChatMess_Item(divChatMessage);
            });

            divChatMessage.addEventListener("mouseleave", function () {
                hoverOutChatMess_Item(divChatMessage);
            });
            divChatMessage.classList.add('chat-message', 'me');
            divChatMessage.innerHTML = `
            <div class="chat-message__actionHolder me" style="min-width: 120px;">
                <div class="chat-message__actions me">
                </div>
            </div>
            `;
            let chatContent_NodeList_Me = document.querySelectorAll('.messageViewContainer .chat-content.me');
            const chatContent = chatContent_NodeList_Me[chatContent_NodeList_Me.length - 1];
            divChatMessage.appendChild(divCard);
            if (chatContent.querySelector('.sending-time')) {
                chatContent.querySelector('.sending-time').remove();
            }

            const scrollbarContainer = document.querySelector('.messageViewContainer');
            chatContent.appendChild(divChatMessage);
            chatContent.appendChild(getSendingTime(12));

            scrollToBottom(scrollbarContainer);
        }
    }
    reader.readAsDataURL(file);

}

function uploadImage() {
    const imageUpload = document.createElement('input');
    imageUpload.type = 'file';
    imageUpload.id = 'imageUpload';
    imageUpload.name = 'imageUpload';
    imageUpload.accept = 'image/png, image/gif, image/jpeg';
    imageUpload.click();
    imageUpload.onchange = () => {
        renderImageFromFile(imageUpload.files[0]);
    }
    imageUpload.remove();
}

const SIZE = {
    'GB': (1024 * 1024 * 1024),
    'MB': (1024 * 1024),
    'KB': 1024,
}

const DOT = {
    'docx': 'docx',
    'xlsx': 'xlsx',
    'xls': 'xlsx',
    'pttx': 'pttx',
    'image': 'photo',
    'pdf': 'pdf',
}

function createPrevivewFile(file) {
    const container = file.name.split('.');
    let sizeOfFile = 0;
    if (file.size < SIZE['GB']) {
        if (file.size < SIZE['MB']) {
            if (file.size < SIZE['KB']) {
                sizeOfFile = file.size + ' Bytes';
            } else {
                sizeOfFile = (file.size / SIZE['KB']).toFixed(2) + ' KB';
            }
        } else {
            sizeOfFile = (file.size / SIZE['MB']).toFixed(2) + ' MB';
        }

    } else {
        sizeOfFile = (file.size / SIZE['GB']).toFixed(2) + ' GB';
    }

    let type = DOT[container[container.length - 1]];
    if (typeof (type) === 'undefined') {
        type = 'empty';
    }
    
    if(file.type.split('/')[0] === 'image'){
        type = DOT['image'];
    }

    let fileName = '';
    let extension = '';
    if (file.name.length > 8) {
        fileName = file.name.slice(0, (file.name.length - (type.length + 4)));
        extension = file.name.slice((file.name.length - (type.length + 4)));
    } else {
        fileName = file.name;
    }
    createNewTimeLine(12);
    const divChatMessage = document.createElement('div');
    divChatMessage.setAttribute('id', getRandomID('id_msg_'));
    divChatMessage.classList.add('chat-message', 'me');
    divChatMessage.innerHTML = `
            <div class="chat-message__actionHolder me" style="min-width: 120px;">
                <div class="chat-message__actions me">
                </div>
            </div>
            `;
    divChatMessage.addEventListener("mouseenter", function () {
        hoverInChatMess_Item(divChatMessage);
    });

    divChatMessage.addEventListener("mouseleave", function () {
        hoverOutChatMess_Item(divChatMessage);
    });

    const divCard = document.createElement('div');
    divCard.classList.add('card', 'card--file', 'me');
    divCard.innerHTML = `
            <div class="react-list me"></div>
            `;
    const divFileZone = document.createElement('div');
    divFileZone.classList.add('file-zone');
    divFileZone.innerHTML = `
    <div class="file-icon">
        <div style="background-image: url(/Icons/icon-file-${type}.svg);"></div>
    </div>
    `;
    if (type == 'empty') {
        const div = document.createElement('div');
        div.style.position = 'absolute';
        if (container[container.length - 1].length > 3) {
            div.innerText = container[container.length - 1].slice(0, container[container.length - 1].length - 1);
        } else {
            div.innerText = container[container.length - 1];

        }
        divFileZone.appendChild(div);
    }

    divCard.appendChild(divFileZone);
    const divmessageContent = document.createElement('div');
    divmessageContent.classList.add('file-content', 'message-content');
    divmessageContent.innerHTML = `
    <div class="file-head">
        <div class="file-name text-nowrap">
            ${fileName}
        </div>
        <div class="dot-file">
            ${extension}
        </div>
    </div>
    <div class="file-body">
        <div class="icon-download">
            <div>
                <ion-icon name="download-outline"></ion-icon>
            </div>
            <span>Tải xuống</span>
        </div>

        <div class="file-size">
            ${sizeOfFile}
        </div>
    </div>
    `;
    divCard.appendChild(divmessageContent);

    let chatContent_NodeList_Me = document.querySelectorAll('.messageViewContainer .chat-content.me');
    const chatContent = chatContent_NodeList_Me[chatContent_NodeList_Me.length - 1];
    if (chatContent.querySelector('.sending-time')) {
        chatContent.querySelector('.sending-time').remove();
    }
    divChatMessage.appendChild(divCard);
    const scrollbarContainer = document.querySelector('.messageViewContainer');
    chatContent.appendChild(divChatMessage);
    chatContent.appendChild(getSendingTime(12));
    scrollToBottom(scrollbarContainer);
}


function uploadFile() {
    const fileUpload = document.createElement('input');
    fileUpload.type = 'file';
    fileUpload.id = 'fileUpload';
    fileUpload.name = 'fileUpload';
    fileUpload.accept = '*';
    fileUpload.click();

    fileUpload.onchange = () => {
        createPrevivewFile(fileUpload.files[0]);
    }
    fileUpload.remove();
}

function previewFile(file) {
    if(file.type.split('/')[0] === 'image'){
        renderImageFromFile(file);
    }else{
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            let img = document.createElement('img');
            img.src = reader.result;
            createPrevivewFile(file);
        }
    }
}

function block(element){
    const id = findParent(element, 'contact-info').id;
}