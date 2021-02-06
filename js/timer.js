function showCountdown() {
    var nowDate = new Date();
    var dnumNow = nowDate.getTime();

    var inputYear = document.getElementById("userYear").value;
    var inputMonth = document.getElementById("userMonth").value - 1;
    var inputDate = document.getElementById("userDate").value;
    var inputHour = document.getElementById("userHour").value;
    // var inputMin = document.getElementById("userMin").value;
    // var inputSec = document.getElementById("userSec").value;
    var targetDate = new Date(inputYear, inputMonth, inputDate, inputHour, 0, 0);
    var dnumTarget = targetDate.getTime();

    var diff2Dates = dnumTarget - dnumNow;
    if (dnumTarget < dnumNow) {
        diff2Dates *= -1;
    }

    var dDays = diff2Dates / (1000 * 60 * 60 * 24);  // 日数
    diff2Dates = diff2Dates % (1000 * 60 * 60 * 24);
    var dHour = diff2Dates / (1000 * 60 * 60);   // 時間
    diff2Dates = diff2Dates % (1000 * 60 * 60);
    var dMin = diff2Dates / (1000 * 60);    // 分
    diff2Dates = diff2Dates % (1000 * 60);
    var dSec = diff2Dates / 1000; // 秒

    var dlYear = targetDate.getFullYear();
    var dlMonth = targetDate.getMonth() + 1;
    var dlDate = targetDate.getDate();
    var dlHour = targetDate.getHours();
    var dlMin = targetDate.getMinutes();
    var dlSec = targetDate.getSeconds();
    var msg1 = dlYear + "/" + dlMonth + "/" + dlDate;

    var msg2 = Math.floor(dDays) + " days "
        + Math.floor(dHour) + " hours ";
    // + Math.floor(dMin) + "分"
    // + Math.floor(dSec) + "秒";

    var msg;
    if (dnumTarget > dnumNow) {
        // まだ期限が来ていない場合
        msg = "left for " + msg2;
    }
    else {
        // 期限が過ぎた場合
        msg = msg1 + " Passed";
    }

    document.getElementById("limit").innerHTML = msg;
}

setInterval('showCountdown()', 10000);

