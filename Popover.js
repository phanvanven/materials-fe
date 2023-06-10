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

let XY_pos = {
    X_pos: 0,
    Y_pos: 0
}

function openPopover(popover, XY_pos, open = true) {
    if (open) {
        $('.inset').css({
            position: 'absolute',
            inset: 0,
        });
        popover.css({
            top: `${XY_pos.Y_pos}px`,
            left: `${XY_pos.X_pos}px`,
            opacity: 1,
        });
    } else {
        $('.inset').css({
            position: 'relative'
        })
        popover.css({ opacity: 0 });
        popover.empty();
    }
}

function setPopoverPosition(popover, XY_pos, kindof = pos.XY_pos) {

    switch (kindof) {
        case pos.X_pos:
            popover.css({
                left: `${XY_pos.X_pos}px`
            })
            break;
        case pos.Y_pos:
            popover.css({
                top: `${XY_pos.Y_pos}px`
            })
            break;
        default:
            popover.css({
                left: `${XY_pos.X_pos}px`,
                top: `${XY_pos.Y_pos}px`,
            });
            break;
    }
}


function getPopoverXYPosition(popover, Element, kindof = pos.BOTTOM_LEFT_ELE, offset = 0) {
    let X_pos;
    let Y_pos;
    let sizeOfElement = {
        width: Element.innerWidth(),
        height: Element.innerHeight(),
    }
    switch (kindof) {
        case pos.BOTTOM_LEFT_ELE:
            X_pos = (Element.offset().left - popover.innerWidth()) + sizeOfElement.width;
            Y_pos = Element.offset().top + sizeOfElement.height;
            break;
        case pos.TOP_LEFT_ELE:
            X_pos = (Element.offset().left - popover.innerWidth()) + sizeOfElement.width;
            Y_pos = Element.offset().top - popover.innerHeight();
            break;
        case pos.RIGHT_ELE:
            X_pos = Element.offset().left + sizeOfElement.width + 8;// margin-left: 8px;
            Y_pos = (Element.offset().top - popover.innerHeight()) + (sizeOfElement.height) - 8;// margin-bottom: 8px
            break;
        case pos.LEFT_ELE:
            X_pos = Element.offset().left - (popover.innerWidth() + 8 + offset);// margin-right: 8px;
            Y_pos = (Element.offset().top - popover.innerHeight()) + (sizeOfElement.height) - 8;// margin-bottom: 8px
            break;
        default:
            break;
    }

    return {
        X_pos,
        Y_pos
    }
}

function createPopoverV1() {
    const popoverV1 = document.createElement('div');
    popoverV1.classList.add('popover-v1');

    const content = document.createElement('div');
    content.classList.add('content');

    const menu = document.createElement('ul');
    menu.classList.add('menu');

    menu.innerHTML = `
    <li class="item">
        <span class="text-nowrap">Bỏ ghim</span>
    </li>
    <li class="item">
        <span class="text-nowrap">Tắt thông báo</span>
    </li>
    <li class="item">
        <span class="text-nowrap">Chặn tin nhắn</span>
    </li>
    <li class="item">
        <span class="text-nowrap">Báo xấu</span>
    </li>
    <li class="menu-separate"></li>
    <li class="item danger">
        <span class="text-nowrap">Xóa hội thoại</span>
    </li>
    `;

    content.appendChild(menu);
    popoverV1.appendChild(content);
    document.body.appendChild(popoverV1);
}