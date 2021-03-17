$(document).ready(function () {

    let sequence = true;
    let finish = 0;
    let count;
    const item = $(".item");
    const widthOne = $(".widthLineOne");
    const widthTwo = $(".widthLineTwo");
    const widthThree = $(".widthLineThree");
    const heightOne = $(".heightLineOne");
    const heightTwo = $(".heightLineTwo");
    const heightThree = $(".heightLineThree");
    const intersectionRight = $(".intersectionRight");
    const intersectionLeft = $(".intersectionLeft");
    const accountContent = $("#accountContent");
    let x = "boardX";
    let o = "boardO";
    let o_array = [];
    let computerMove = 700;
    let startingSign;
    let winner = true;
    let add_o = true;
    let accountX = 0;
    let accountO = 0;

    $(".board").children().on("click", function () {
        if (playfinish()) {
            setX(this);
            setO();
        }
    });

    function setX(id) {
        if (sequence) {
            addX(id);
            winnerLine(widthOne, x);
            winnerLine(widthTwo, x);
            winnerLine(widthThree, x);
            winnerLine(heightOne, x);
            winnerLine(heightTwo, x);
            winnerLine(heightThree, x);
            winnerLine(intersectionLeft, x);
            winnerLine(intersectionRight, x);
        }
    }

    function setO() {
        disabledEmptyItem(true);
        setTimeout(function () {
            if (playfinish()) {
                let countPosition = item.length - 1;
                let position_o;
                for (let i = 0; i < item.length; i++) {
                    position_o = Math.round(Math.random() * countPosition);
                    if (itemEmpty(item, position_o, x) || itemEmpty(item, position_o, o)) {
                        i--;
                    } else {
                        o_array.push(position_o);
                        add_o = true;
                        sequence = true;
                        finish++;
                        stepLogic(position_o);
                        winnerLine(widthOne, o);
                        winnerLine(widthTwo, o);
                        winnerLine(widthThree, o);
                        winnerLine(heightOne, o);
                        winnerLine(heightTwo, o);
                        winnerLine(heightThree, o);
                        winnerLine(intersectionLeft, o);
                        winnerLine(intersectionRight, o);
                        disabledEmptyItem(false);
                        return;
                    }
                }
            }
        }, computerMove);
    }

    function addX(id) {
        let isEmpty = !$(this).hasClass(x) || !$(this).hasClass(o);
        if (isEmpty) {
            $(id).addClass(x);
            $(id).addClass("disabled");
            sequence = false;
            finish++;
            computerMove = 700;
        }
    }

    function stepLogic(position_o) {
        if (playStep(widthOne, o)) {
        } else if (playStep(widthTwo, o)) {
        } else if (playStep(widthThree, o)) {
        } else if (playStep(heightOne, o)) {
        } else if (playStep(heightTwo, o)) {
        } else if (playStep(heightThree, o)) {
        } else if (playStep(intersectionLeft, o)) {
        } else if (playStep(intersectionRight, o)) {
        } else if (playStep(widthOne, x)) {
        } else if (playStep(widthTwo, x)) {
        } else if (playStep(widthThree, x)) {
        } else if (playStep(heightOne, x)) {
        } else if (playStep(heightTwo, x)) {
        } else if (playStep(heightThree, x)) {
        } else if (playStep(intersectionLeft, x)) {
        } else if (playStep(intersectionRight, x)) {
        } else {
            item.eq(position_o).addClass(o);
            item.eq(position_o).addClass("disabled");
        }
    }

    function playStep(line, value) {
        count = getCount(line, value);
        let onlyOnePlaceIsEmpty = count === 2;
        if (onlyOnePlaceIsEmpty) {
            for (let i = 0; i < line.length; i++) {
                if (isNotEmpty(line, i)) {
                    line.eq(i).addClass(o);
                    line.eq(i).addClass("disabled");
                    return true;
                }
            }
        }
        return false;
    }

    function playfinish() {
        if (finish === 9) {
            equal();
            return false;
        } else {
            return true;
        }
    }

    function equal() {
        let count = 0;
        for (let i = 0; i < item.length; i++) {
            if (!item.eq(i).hasClass("bgWinnerLine")) {
                count++;
                isNotClass(count);
            }
        }
    }

    function getCount(line, value) {
        let count = 0;
        for (let i = 0; i < line.length; i++) {
            if (line.eq(i).hasClass(value)) {
                count++;
            }
        }
        return count;
    }

    function isNotClass(count) {
        if (count === 9) {
            accountContent.css({"height": "60px", "border": "2px solid #1848C0"});
            $(".account").css({"margin-top": "0px", "opacity": "0"});
            $(".equal").css("display", "block");
        }
    }

    function isNotEmpty(line, position) {
        return !line.eq(position).hasClass(x) && !line.eq(position).hasClass(o);
    }

    function itemEmpty(item, position_o, value) {
        return item.eq(position_o).hasClass(value);
    }

    function winnerLine(line, value) {
        let rowFilled;
        count = getCount(line, value);
        rowFilled = count === 3;
        if (rowFilled && winner) {
            timeToWin(line, value);
        }
    }

    function timeToWin(line, value) {
        line.addClass("bgWinnerLine");
        startingSign = value;
        account(value);
        accountContent.css({"height": "60px", "border": "2px solid #1848C0"});
        $(".account").css({"margin-top": "12px", "opacity": "1"});
        winner = false;
    }

    function account(value) {
        if (value === x) {
            $("#accountX").text(accountX = accountX + 1);
            $("#accountO").text(accountO);
        } else {
            $("#accountX").text(accountX);
            $("#accountO").text(accountO = accountO + 1);
        }
    }

    $("#restart").click(function () {
        finish = 0;
        winner = true;
        startSign();
        addAndRemove();
        disabledEmptyItem(false);
    });

    function addAndRemove() {
        accountContent.css({
            "height": "-10px",
            "border": "2px solid #1848C0",
            "padding-top": "0px"
        });
        $(".account").css({"margin-top": "0px", "opacity": "0"});
        $(".equal").css("display", "none");
        $(".board").children().removeClass(x);
        $(".board").children().removeClass(o);
        $(".board").children().removeClass("bgWinnerLine");
        $(".board").children().removeClass("disabled");
    }

    function startSign() {
        let winnerSign = startingSign === x;
        if (winnerSign) {
            o_array.length = 0;
            computerMove = 100;
            setO();
        } else {
            o_array.length = 0;
            sequence = true;
        }
    }

    function disabledEmptyItem(disabled) {
        for (let i = 0; i < item.length; i++) {
            if (disabled) {
                item.eq(i).addClass("disabledEmptyItem");
            } else {
                item.eq(i).removeClass("disabledEmptyItem");
            }
        }
    }
});







