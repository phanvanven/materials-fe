
$(document).ready(function () {
    const pos = {
        X_pos: 'X',
        Y_pos: 'Y',
        XY_pos: 'XY',
        TOP_ELE: 'TOP',
        LEFT_ELE: 'LEFT',
        RIGHT_ELE: 'RIGHT',
        BOTTOM_ELE: 'BOTTOM',
        TOP_LEFT_ELE: 'TOP_LEFT',
        TOP_RIGHT_ELE: 'TOP_RIGHT',
        BOTTOM_LEFT_ELE: 'BOTTOM_LEFT',
        BOTTOM_RIGHT_ELE: 'BOTTOME_RIGHT',
    }
    
    function openModalRoot(modalRoot, modalContent, XY_pos, open = true){
        if(open){
            modalRoot.css({
                position: 'fixed'
            });
            modalContent.addClass('active');
            modalContent.css({
                top: `${XY_pos.Y_pos}px`,
                left: `${XY_pos.X_pos}px`,
                display: 'flex',
                background: 'var(--white)',
                'box-shadow': 'rgb(76 78 100 / 20%) 1px 1px 2px 1px'

            });
        }else{
            modalContent.removeClass('active');
            modalContent.css({
                display: 'none',
            });
            modalRoot.css({
                position: 'relative'
            })
            modalContent.empty();
        }
    }
    
    function setModalContentPosition(modalContent, XY_pos, kindof = pos.XY_pos){
    
        switch (kindof) {
            case pos.X_pos:
                modalContent.css({
                    left: `${XY_pos.X_pos}px`
                })
                break;
            case pos.Y_pos:
                modalContent.css({
                    top: `${XY_pos.Y_pos}px`
                })
                break;
            default:
                modalContent.css({
                    left: `${XY_pos.X_pos}px`,
                    top: `${XY_pos.Y_pos}px`,
                });
                break;
        }
    }
    
    
    function getModalContentXYPosition(modalContent, Element, kindof = pos.BOTTOM_LEFT_ELE, offset = 0){
        let X_pos;
        let Y_pos;
        let sizeOfElement = {
            width: Element.innerWidth(),
            height: Element.innerHeight(),
        }
        switch (kindof) {
            case pos.BOTTOM_LEFT_ELE:
                X_pos = (Element.offset().left - modalContent.innerWidth()) + sizeOfElement.width;
                Y_pos = Element.offset().top + sizeOfElement.height;
                break;
            case pos.TOP_LEFT_ELE:
                X_pos = (Element.offset().left - modalContent.innerWidth()) + sizeOfElement.width;
                Y_pos = Element.offset().top - modalContent.innerHeight();
                break;
            case pos.RIGHT_ELE:
                X_pos = Element.offset().left  + sizeOfElement.width + 8;// margin-left: 8px;
                Y_pos = (Element.offset().top - modalContent.innerHeight()) + (sizeOfElement.height) - 8;// margin-bottom: 8px
                break;
            case pos.LEFT_ELE:
                X_pos = Element.offset().left - (modalContent.innerWidth() + 8 + offset);// margin-right: 8px;
                Y_pos = (Element.offset().top - modalContent.innerHeight()) + (sizeOfElement.height) - 8;// margin-bottom: 8px
                break;
            default:
                break;
        }

        return {
            X_pos,
            Y_pos
        }
    }


    function windowOnResize(modalContent ,Element, kindof = pos.BOTTOM_LEFT_ELE){
        window.onresize = window.onload = function () {
    
            XY_pos = getModalContentXYPosition(modalContent, Element, kindof);
            
            let modalIsWorking = modalContent.hasClass('active');
            if (modalIsWorking) {
                setModalContentPosition(modalContent, XY_pos, pos.XY_pos);
            }

        } 
    }

    window.onresize = window.onload = function () {
        openModalRoot(modalRoot, modalContent, XY_pos, false);
    } 
    let modalRoot = $('.modalRoot');
    let modalContent = $('.modalRoot .modal-content');
    let XY_pos = {
        X_pos: 0,
        Y_pos: 0
    }
    let Text ={
        muteNotifications: 'Tắt thông báo',
        fullScreen: 'Chế độ toàn màn hình'
    }

    const appChatActionRight_NodeList_Top = $('.app-chat__right .app-chat__right-header .actions-right >div');
    appChatActionRight_NodeList_Top.each(function(){
        const div = $(this);
        div.on('click', function(){
            if($('.page-content').hasClass('fullScreen-mode')){
                Text.fullScreen = 'Chế độ thu nhỏ'
            }else{
                Text.fullScreen = 'Chế độ toàn màn hình'
            }

            if($('.app-chat .app-chat__right .message-view__banner').hasClass('none')){
                Text.muteNotifications = 'Tắt thông báo';
            }else{
                Text.muteNotifications = 'Bật thông báo';
            }

            if(div.hasClass('actions-right__more-options')){
                if(!modalContent.children().hasClass('modal__actions-right__more-options')){
                    modalContent.append(`
                    <ul class="modal__actions-right__more-options">
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
                XY_pos = getModalContentXYPosition(modalContent, div, pos.BOTTOM_LEFT_ELE);
                openModalRoot(modalRoot, modalContent, XY_pos, true);
            
                // get X_pos again as modalConent width doesn't update in time.
                XY_pos = getModalContentXYPosition(modalContent, div, pos.BOTTOM_LEFT_ELE);
                setModalContentPosition(modalContent, XY_pos, pos.X_pos);
            
                const actionRightItem_NodeList = $('.modalRoot .modal-content .modal__actions-right__more-options li');
                actionRightItem_NodeList.each(function(){
                    const li = $(this);

                    li.on('click',function () {
                       
                        // turn off/on full-screen mode
                        if (li.hasClass('fullScreen-mode')) {
                            $('.page-content').toggleClass('fullScreen-mode');
                            
                        }else if(li.hasClass('mute-notifications')){
                            let messageViewBanner = $('.message-view__banner');
                            let iconNotifications = $('.app-chat__left-content .user-profile.active .sending-time .icon-notificationsOff');
                            li.toggleClass('Off');
                            messageViewBanner.toggleClass('none');
                            iconNotifications.toggleClass('none');
                        }
                        openModalRoot(modalRoot, modalContent, XY_pos, false);
                    })
                    
                });
            }
        })
    })
    
    

    const appChatActionRight_NodeList_bottom = $('.app-chat__right-footer .actions-right__bottom >div');
    appChatActionRight_NodeList_bottom.each(function(){
        const div = $(this);
        div.on('click', function(){
            //todo Turn on modal__reaction-options

            if(div.hasClass('reaction-options')){
                if(!modalContent.children().hasClass('modal__reaction-options')){
                    modalContent.append(`
                    <ul class="modal__reaction-options">
                    <li class="modal__react-options__head">
                        <div class="recent-react-icon-list active">
                            <span>Gần đây</span>
                        </div>
                        <div class="all-react-icon-list">
                            <span>Tất cả</span>
                        </div>
                    </li>
                    <li class="modal__react-options__body">
                        <div class="modal__react-options__item-head">
                            <span>Cảm xúc</span>
                        </div>
                    </li>
                    </ul>
                    `);

                    let xy = {
                        x: 82,
                        y: 0
                    }
    
                   let modalReactOptions_Body = modalContent.find('.modal__react-options__body');
                   let n = 86;
                   let l = 8;
                   for(let i = 1; i <= (Math.floor(n/l) + (n%l!= 0?1:0)); i++){
                    modalReactOptions_Body.append(`
                    <div class="modal__react-options__item"></div>       
                    `);
                    let reactIconItem = '';
                    for(let j = 1; j <= l; j++){
                        reactIconItem += `
                        <div class="react-icon">
                        <span style="background: url(assets/emoji-materials.png) ${xy.x}% ${xy.y}% / 5100%; width: 26px; height: 26px; margin-bottom: 1px;">
                        </span>              
                        </div>
                        `;
                        xy.y += 2.5;
                    }
                    modalReactOptions_Body.children().last().append(reactIconItem);
    
                    if(l*i % 40 == 0){
                        xy.x += 2;
                        xy.y = 0;
                    }
                   }
                }

                XY_pos = getModalContentXYPosition(modalContent, div, pos.TOP_LEFT_ELE);
                openModalRoot(modalRoot, modalContent, XY_pos, true);
                windowOnResize(modalContent, div, pos.TOP_LEFT_ELE);
                
                const modalReactOptionsBtn_NodeList = modalContent.find('.modal__reaction-options .modal__react-options__head >div');
                modalReactOptionsBtn_NodeList.each(function(){
                    const div = $(this);

                    div.on('click', function(){
                        if(!div.hasClass('active')){
                            modalContent.find('.modal__reaction-options .modal__react-options__head div').removeClass('active');
                            div.addClass('active');
                        }
                    })
                })

            }
        })
    })


    modalContent.on('click', function(event){
        event.stopPropagation();
    })

    // *close the modalRoot
    modalRoot.on('click',function () {
        openModalRoot(modalRoot, modalContent, XY_pos, false);
    })

})

