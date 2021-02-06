(function () {
    'use strict';

    //定義
    var timer = document.getElementById('timer');
    var min = document.getElementById('m');
    var sec = document.getElementById('s');
    var reset = document.getElementById('r');
    var start = document.getElementById('sta');

    //この下で定義しているものを使ってカウントダウンする
    var startTime;
    var timeLeft;
    var timeToCountDown = 0;
    var timerId;
    var isRunning = false;

    //現在時刻を代入し、表示の仕方を設定
    function updateTimer(t) {
        var d = new Date(t);  //現在時刻
        var m = d.getMinutes();
        var s = d.getSeconds();
        var ms = d.getMilliseconds();
        m = ('0' + m).slice(-2);  //「０」が表示される桁を設定
        s = ('0' + s).slice(-2);
        ms = ('00' + ms).slice(-3);
        timer.textContent = m + ':' + s;  //表示される文字列を設定
        // + '.' + ms

    }

    //カウンドダウン処理
    function countDown() {
        timerId = setTimeout(function () {
            timeLeft = timeToCountDown - (Date.now() - startTime); //現在時刻から開始時間を引いて、さらに終わり時間から引くことで残り時間を算出している
            updateTimer(timeLeft);
            if (timeLeft < 0) {
                open("アラーム時に起動するURLを貼る", "_blank"); //カウントダウンが０になるとこのURLが開く
                isRunning = false;
                start.textContent = 'start';
                clearTimeout(timerId);
                timeLeft = 0;
                timeToCountDown = 0;
                updateTimer(timeLeft);
                return;
            }
            countDown();
        }, 10);
    }

    //スタートとストップの処理
    start.addEventListener('click', function () {
        if (isRunning === false) {
            isRunning = true;
            start.textContent = 'stop';
            startTime = Date.now();
            countDown();
        } else {
            isRunning = false;
            start.textContent = 'start';
            timeToCountDown = timeLeft;
            clearTimeout(timerId);
        }
    });

    //分入力の処理
    min.addEventListener('click', function () {
        if (isRunning === true) {
            return;
        }
        timeToCountDown += 60 * 1000;
        if (timeToCountDown >= 60 * 60 * 1000) {
            timeToCountDown = 0;
        }
        updateTimer(timeToCountDown);
    });

    //秒入力の処理
    sec.addEventListener('click', function () {
        if (isRunning === true) {
            return;
        }
        timeToCountDown += 1000;
        if (timeToCountDown >= 60 * 60 * 1000) {
            timeToCountDown = 0;
        }
        updateTimer(timeToCountDown);
    });

    //リセット処理
    reset.addEventListener('click', function () {
        timeToCountDown = 0;
        updateTimer(timeToCountDown);
    });
})();
