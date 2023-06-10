
document.addEventListener('DOMContentLoaded', function () {
    // createScrollBar();
    let messSearchBtn = document.querySelector('.actions-right__search');
    let messSearchBar = document.querySelector('.actions-right__search-input');

    messSearchBtn.addEventListener('click', () => {
        if (messSearchBar.classList.contains('none')) {
            messSearchBar.classList.remove('none');
            messSearchBtn.innerHTML = `
            <span class="material-symbols-sharp">
            close
            </span>`;
        } else {
            messSearchBar.classList.add('none');
            messSearchBtn.innerHTML = `
            <span class="material-symbols-sharp">
            search
            </span>`;
        }
    })

    let appChatLeftFrame = document.querySelector('.app-chat__left');

    let userProfileDetails = document.querySelector('.app-chat__right-header .user-profile');

    let contactList = appChatLeftFrame.querySelector('.contact-list');
    let contactInfo = appChatLeftFrame.querySelector('.contact-info');

    userProfileDetails.addEventListener('click', () => {
        contactInfo.classList.add('active');
        contactList.classList.remove('active');
        appChatLeftFrame.classList.remove('hidden');

    })

    let userProfile_NodeList = document.querySelectorAll('.app-chat__left-content .user-profile');
    userProfile_NodeList.forEach(function (div) {
        div.addEventListener('click', function () {
            if (!div.classList.contains('active')) {
                let position = findElePosInNodeList(userProfile_NodeList, 'active');
                if (position != -1) {
                    userProfile_NodeList[position].classList.remove('active');
                    div.classList.add('active');
                }
            }

        })
    })

    let closeBtn = appChatLeftFrame.querySelector('.closeBtn');
    closeBtn.addEventListener('click', () => {
        contactList.classList.add('active');
        contactInfo.classList.remove('active');
    })
    const appChatRight__Footer = document.querySelector('.app-chat__right-footer');
    // Insert chat message actions
    let chatMessage_NodeList = document.querySelectorAll('.app-chat__right .app-chat__right-content .chat-message');
    chatMessage_NodeList.forEach(function (chatMessage_item) {
        // hoverIn
        chatMessage_item.addEventListener("mouseenter", function () {
            hoverInChatMess_Item(chatMessage_item);
        })
        chatMessage_item.addEventListener("mouseleave", function () {
            hoverOutChatMess_Item(chatMessage_item);
        })
    })

    appChatRight__Footer.addEventListener('mouseenter', function () {
        let quoteCloseBtn = appChatRight__Footer.querySelector('.quote-banner .quote-close');
        let quoteBanner_Name = appChatRight__Footer.querySelector('.quote-banner .quote-banner-name');
        if (quoteCloseBtn) {
            quoteCloseBtn.addEventListener('click', function () {
                document.querySelectorAll('.highlighted').forEach((item) => {
                    item.classList.remove('highlighted');
                })
                // !FIX DOUBLE CLICK TOO FAST
                if (appChatRight__Footer.lastElementChild == quoteCloseBtn.parentElement) {
                    appChatRight__Footer.querySelector('.quote-banner').remove();
                }

            })
        }

        if (quoteBanner_Name) {
            quoteBanner_Name.addEventListener('click', function () {
                const goToId = quoteBanner_Name.className.split(' ')[0];
                const chatContent = document.getElementById(goToId);
                chatContent.scrollIntoView(false);//scroll top - false ~ scroll top
            })
        }
    })

    const replyMessage_NodeList = document.querySelectorAll('.card .reply-message');
    replyMessage_NodeList.forEach((replyMessItem) => {
        replyMessItem.addEventListener('click', () => {
            clickReplyMess_Item(replyMessItem);
        })
    })

});

function closePopoverV1(){
    document.querySelector('.popover-v1').remove();
}

function click(obj, type) {
    let src = '';
    switch (type) {
        case 'icon':
            src = obj.querySelector('span').style.backgroundImage.slice(4, -1).replace(/"/g, "");
            const pos = obj.querySelector('span').style.backgroundPosition + ' / ' + obj.querySelector('span').style.backgroundSize;
            chat({
                type: 'emoji',
                src: src,
                pos: pos
            }, { width: 40, height: 40 });
            break;
        case 'sticker':
            src = obj.style.backgroundImage.slice(4, -1).replace(/"/g, "");
            let static = 'static';
            if (obj.classList.contains('animated')) {
                static = 'animated';
            }
            chat({
                type: 'sticker',
                src: src,
                static: static
            }, { width: 130, height: 130 });
            break;
        default:
            break;
    }

}

const userList = document.querySelectorAll('.contact-list .app-chat__left-content li:not(.section-title)');
if(userList.length){
    userList.forEach(user=>{
        user.addEventListener('contextmenu', e=>{
            rightClickOnContact(e);
        })
    })
}

function rightClickOnContact(e){
    e.preventDefault();
    createPopoverV1();
    const popoverV1 = document.querySelector('.popover-v1');
    let x = e.clientX, y = e.clientY;
    winWidth = window.innerWidth;
    winHeight = window.innerHeight;
    cmWidth = popoverV1.offsetWidth;
    cmHeight = popoverV1.offsetHeight;
    x = x > winWidth - cmWidth ? winWidth - cmWidth : x;
    y = y > winHeight - cmHeight ? winHeight - cmHeight : y;
    popoverV1.style.left = `${x}px`;
    popoverV1.style.top = `${y}px`;

    popoverV1.style.opacity = 1;
    popoverV1.style.visibility = 'visible';
}

$(document).ready(function () {
    const popover = $('.popover');
    let Text = {
        muteNotifications: 'Tắt thông báo',
        fullScreen: 'Chế độ toàn màn hình'
    }
    // TODO: DONE
    const appChatActionRight_NodeList_Top = $('.app-chat__right .app-chat__right-header .actions-right >div');
    appChatActionRight_NodeList_Top.each(function () {
        const div = $(this);
        div.on('click', function () {
            if ($('.page-content').hasClass('fullScreen-mode')) {
                Text.fullScreen = 'Chế độ thu nhỏ'
            } else {
                Text.fullScreen = 'Chế độ toàn màn hình'
            }

            if ($('.app-chat .app-chat__right .message-view__banner').hasClass('none')) {
                Text.muteNotifications = 'Tắt thông báo';
            } else {
                Text.muteNotifications = 'Bật thông báo';
            }
            if (div.hasClass('actions-right__more-options')) {
                if (!popover.children().hasClass('popover__actions-right__more-options')) {
                    popover.append(`
                    <ul class="popover__actions-right__more-options">
                        <li class="personal-page">
                            <span class="text-nowrap">Trang cá nhân</span>
                        </li>
                        <li class="mute-notifications">
                            <span class="text-nowrap">${Text.muteNotifications}</span>
                        </li>
                        <li class="fullScreen-mode">
                            <span class="text-nowrap">${Text.fullScreen}</span>
                        </li>
                    </ul>
                    `);
                }
                XY_pos = getPopoverXYPosition(popover, div, pos.BOTTOM_LEFT_ELE);
                openPopover(popover, XY_pos, true);

                const actionRightItem_NodeList = $('.popover .popover__actions-right__more-options li');
                actionRightItem_NodeList.each(function () {
                    const li = $(this);

                    li.on('click', function () {

                        // turn off/on full-screen mode
                        if (li.hasClass('fullScreen-mode')) {
                            $('.page-content').toggleClass('fullScreen-mode');

                        } else if (li.hasClass('mute-notifications')) {
                            let messageViewBanner = $('.message-view__banner');
                            let iconNotifications = $('.app-chat__left-content .user-profile.active .sending-time .icon-notificationsOff');
                            li.toggleClass('Off');
                            messageViewBanner.toggleClass('none');
                            iconNotifications.toggleClass('none');
                        }
                        openPopover(popover, XY_pos, false);
                    })

                });
            }
        })
    })

    const appChatActionRight_NodeList_bottom = $('.app-chat__right-footer .actions-right__bottom >div');
    appChatActionRight_NodeList_bottom.each(function () {
        const div = $(this);
        div.on('click', function () {
            if (div.hasClass('reaction-options')) {
                if (!popover.children().hasClass('popover__reaction-options')) {
                    popover.append(`
                    <ul class="popover__reaction-options">
                        <li class="popover__react-options__head">
                            <div class="recent-react-icon-list active">
                                <span>Gần đây</span>
                            </div>
                                <div class="all-react-icon-list">
                                    <span>Tất cả</span>
                                </div>
                        </li>
                        <li class="popover__react-options__body">
                            <div class="popover__react-options__item-head">
                                <span>Cảm xúc</span>
                            </div>
                        </li>
                    </ul>
                    `);

                    //todo:     chỗ này sau này CÓ THỂ sẽ gọi api
                    let xy = {
                        x: 82,
                        y: 0
                    }
                    let modalReactOptions_Body = popover.find('.popover__react-options__body');
                    let n = 86;
                    let l = 8;
                    for (let i = 1; i <= (Math.floor(n / l) + (n % l != 0 ? 1 : 0)); i++) {
                        const div = $('<div class="popover__react-options__item"></div>');
                        for (let j = 1; j <= l; j++) {
                            const reactIcon = $(`
                                <div class="react-icon">
                                    <span style="background: url(assets/emoji-materials.png) ${xy.x}% ${xy.y}% / 5100%; width: 26px; height: 26px; margin-bottom: 1px;">
                                    </span>              
                                </div>`)
                            // sign up an event
                            reactIcon.on('click', () => {
                                click(reactIcon[0], 'icon');
                                openPopover(popover, {}, false);
                            })
                            div.append(reactIcon);
                            xy.y += 2.5;
                        }
                        modalReactOptions_Body.append(div);

                        if (l * i % 40 == 0) {
                            xy.x += 2;
                            xy.y = 0;
                        }
                    }
                }
                XY_pos = getPopoverXYPosition(popover, div, pos.TOP_LEFT_ELE);
                openPopover(popover, XY_pos, true);
                // windowOnResize(popover, div, pos.TOP_LEFT_ELE);
                const modalReactOptionsBtn_NodeList = popover.find('.popover__reaction-options .popover__react-options__head >div');
                modalReactOptionsBtn_NodeList.each(function () {
                    const div = $(this);

                    div.on('click', function () {
                        if (!div.hasClass('active')) {
                            popover.find('.popover__reaction-options .popover__react-options__head div').removeClass('active');
                            div.addClass('active');
                        }
                    })
                })
            } else if (div.hasClass('sticker-options')) {
                //todo: chỗ này sau này sẽ gọi api
                if (!popover.children().hasClass('popover__reaction-options')) {
                    var myInit = {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        mode: 'cors',
                        cache: 'default'
                    };
                    let myRequest = new Request('./dataSticker.json', myInit);
                    fetch(myRequest)
                        .then(res => {
                            return res.json();
                        })
                        .then(data => {
                            let stickerItems =
                                `<div class="stickerItem recentSticker" style="width: 30px; height: 30px;">
                            <ion-icon class="time-sticker" name="time-outline"></ion-icon>
                        </div>`;
                            for (let key1 in data[0]) {
                                let folder = key1 == 'animated' ? 'sprite' : 'sticker';
                                for (let key2 in data[0][key1]) {
                                    let defaultImg = data[0][key1][key2].split('/')[1];
                                    stickerItems += `
                                <div class="${key1} ${key2} stickerItem" style="width: 30px; height: 30px;">
                                    <div class="sticker-zone">
                                        <div class="sticker" style="background-image: url('./emoticon/${folder}/${defaultImg}.png'); width: 30px; height: 30px;"></div>
                                    </div>
                                </div>`;
                                }
                            }

                            popover.append(`
                        <ul class="popover__reaction-options">
                            <li class="popover__sticker-options__head">
                            <div>
                                <div class="caret-back">
                                    <ion-icon name="chevron-back"></ion-icon>
                                </div>
                                <div class="stickerMenu-zone">
                                    <div class="stickerMenu">
                                        ${stickerItems}
                                    </div>
                                </div>
                                <div class="caret-forward">
                                    <ion-icon name="chevron-forward"></ion-icon>
                                </div>
                            </div>
                            </li>
                            <li class="popover__react-options__body">
                                
                            </li>
                        </ul>
                        `);

                            let popoverStickerOptions_Body = popover.find('.popover__react-options__body');

                            let dataSticker = data[1];
                            popoverStickerOptions_Body.append(`
                            <div class="popover__react-options__item-head" id="recentSticker">
                                <span>Sticker gần đây</span>
                            </div>
                            <div class="popover__sticker-options__item-body">
                            </div>
                        `);

                            let oneLine = 4
                            let t = 0;
                            let amount = dataSticker["recentStickers"].length;
                            let lineNum = Math.floor(amount / oneLine);

                            for (let i = 1; i <= lineNum; i++) {
                                let oneLineStickers = $('<div></div>');
                                oneLineStickers.addClass('sticker__content__item');
                                let item_list = '';

                                for (let j = 1; j <= oneLine; j++) {
                                    // sticker = [(kind of stickers), (position of stickers)]
                                    let structure = dataSticker["recentStickers"][t].split('/');
                                    let item = structure[0];
                                    const div = $('<div class="sticker-zone"></div>');
                                    const sticker = $(`
                                    <div class="sticker ${item}" style="background-image: 
                                    url('./emoticon/${(item == 'animated' ? 'sprite' : 'sticker')}/${structure[1]}.png'); 
                                    width: 65px; height: 65px;"></div>
                                `);

                                    sticker.on('click', () => {
                                        click(sticker[0], 'sticker');
                                        openPopover(popover, {}, false);
                                    })

                                    div.append(sticker);
                                    oneLineStickers.append(div);
                                    t++;
                                }

                                popoverStickerOptions_Body.children().last().append(oneLineStickers);
                                // popoverStickerOptions_Body.append(oneLineStickers);

                            }

                            if (amount % oneLine != 0) {
                                let oneLineStickers = $('<div></div>');
                                oneLineStickers.addClass('sticker__content__item');

                                oneLine = amount - (oneLine * lineNum);
                                for (let j = 1; j <= oneLine; j++) {
                                    let structure = dataSticker["recentStickers"][t].split('/');
                                    let item = structure[0];
                                    const div = $('<div class="sticker-zone"></div>');
                                    const sticker = $(`
                                    <div class="sticker ${item}" style="background-image: 
                                    url('./emoticon/${(item == 'animated' ? 'sprite' : 'sticker')}/${structure[1]}.png'); 
                                    width: 65px; height: 65px;"></div>
                                `);

                                    sticker.on('click', () => {
                                        click(sticker[0], 'sticker');
                                        openPopover(popover, {}, false);
                                    })

                                    div.append(sticker);
                                    oneLineStickers.append(div);

                                    t++;
                                }
                                popoverStickerOptions_Body.children().last().append(oneLineStickers);
                            }

                            dataSticker = data[0];
                            for (let item in dataSticker) {
                                let t = 0;
                                let oneLine = 4;
                                let lineNum = 0;
                                popoverStickerOptions_Body.append(`
                                <div class="popover__react-options__item-head">
                                    <span>Sticker ${(item == 'animated' ? 'Động' : 'Tĩnh')}</span>
                                </div>
                                <div class="popover__sticker-options__item-body">
    
                                </div>
                            `);

                                for (let key in dataSticker[item]) {
                                    // sticker = ['sticker name', 'start idx', 'end idx'];
                                    let structure = dataSticker[item][key].split('/');
                                    let amount = (structure[2] - structure[1] + 1);
                                    popoverStickerOptions_Body.children().last().append(`
                                <div class="sticker__content__name" id="${item}${key}">${structure[0]}</div>
                                `);

                                    t = structure[1];
                                    lineNum = Math.floor(amount / oneLine);
                                    for (let i = 1; i <= lineNum; i++) {
                                        let oneLineStickers = $('<div></div>');
                                        oneLineStickers.addClass('sticker__content__item');

                                        for (let j = 1; j <= oneLine; j++) {
                                            const div = $('<div class="sticker-zone"></div>');
                                            const sticker = $(`
                                        <div class="sticker ${item}" style="background-image: 
                                        url('./emoticon/${(item == 'animated' ? 'sprite' : 'sticker')}/${t}.png'); 
                                        width: 65px; height: 65px;"></div>
                                        `);

                                            sticker.on('click', () => {
                                                click(sticker[0], 'sticker');
                                                openPopover(popover, {}, false);
                                            })


                                            div.append(sticker);
                                            oneLineStickers.append(div);

                                            t++;
                                        }

                                        popoverStickerOptions_Body.children().last().append(oneLineStickers);

                                    }

                                    if (amount % oneLine != 0) {
                                        let oneLineStickers = $('<div></div>');
                                        oneLineStickers.addClass('sticker__content__item');
                                        let item_list = '';

                                        oneLine = amount - (oneLine * lineNum);
                                        for (let j = 1; j <= oneLine; j++) {
                                            const div = $('<div class="sticker-zone"></div>');
                                            const sticker = $(`
                                            <div class="sticker ${item}" style="background-image: 
                                            url('./emoticon/${(item == 'animated' ? 'sprite' : 'sticker')}/${t}.png'); 
                                            width: 65px; height: 65px;"></div>
                                        `);

                                            sticker.on('click', () => {
                                                click(sticker[0], 'sticker');
                                                openPopover(popover, {}, false);
                                            })

                                            div.append(sticker);
                                            oneLineStickers.append(div);

                                            t++;
                                        }
                                        oneLine = 4;
                                        popoverStickerOptions_Body.children().last().append(oneLineStickers);
                                    }
                                }
                            }


                            XY_pos = getPopoverXYPosition(popover, div, pos.TOP_LEFT_ELE);
                            openPopover(popover, XY_pos, true);

                            const modalReactOptionsBtn_NodeList = popover.find('.popover__reaction-options .popover__react-options__head >div');
                            modalReactOptionsBtn_NodeList.each(function () {
                                const div = $(this);
                                div.on('click', function () {
                                    if (!div.hasClass('active')) {
                                        popover.find('.popover__reaction-options .popover__react-options__head div').removeClass('active');
                                        div.addClass('active');
                                    }
                                })
                            })

                            let scrollStickerMenu = document.querySelector('.stickerMenu');

                            scrollStickerMenu.addEventListener('wheel', function (event) {
                                event.preventDefault();
                                scrollStickerMenu.scrollLeft += event.deltaY;
                            })

                            let backBtn = document.querySelector('.caret-back'),
                                nextBtn = document.querySelector('.caret-forward');

                            backBtn.addEventListener('click', function () {
                                scrollStickerMenu.scrollLeft -= 40;
                            });
                            nextBtn.addEventListener('click', function () {
                                scrollStickerMenu.scrollLeft += 40;
                            });

                            let sticker_list = document.querySelectorAll('.popover .sticker');
                            activeAnimatedSticker_List(sticker_list, 65, 0);

                            let stickerItem_list = popover.find('.stickerItem');
                            stickerItem_list.on('click', function () {
                                let goToId = '';
                                if ($(this).hasClass('recentSticker')) {
                                    goToId = 'recentSticker'
                                } else {
                                    let className = $(this).attr('class').split(' ');
                                    goToId = className[0] + className[1];
                                }
                                document.getElementById(`${goToId}`).scrollIntoView();
                            })

                        })
                }
            }else if(div.hasClass('image-file')){
                
            }


        })
    })

    popover.on('click', function (event) {
        event.stopPropagation();
    })
    // *close the popover
    $('.inset').on('click', function () {
        let chatMessage = findParent(document.querySelector('.chat-message .chat-message__actions.active'), 'chat-message');
        hoverOutChatMess_Item(chatMessage);
        openPopover(popover, XY_pos, false);
    })

})
