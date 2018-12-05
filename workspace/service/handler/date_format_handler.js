function get_now_format_date(){

    var SEOUL_TIME_OFF_SET = 9;
    var date_time = new Date(new Date().getTime() + (3600000*SEOUL_TIME_OFF_SET));


    var yyyy = date_time.getFullYear().toString();
    var MM = pad(date_time.getMonth() + 1,2);
    var dd = pad(date_time.getDate(), 2);
    var hh = pad(date_time.getHours(), 2);
    var mm = pad(date_time.getMinutes(), 2)
    var ss = pad(date_time.getSeconds(), 2)

    return yyyy+'/'+MM+'/'+dd+' '+hh+':'+mm+':'+ss;
}

function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

function format_date(date_time){

    var SEOUL_TIME_OFF_SET = 9;
    date_time = new Date(date_time.getTime() + (3600000*SEOUL_TIME_OFF_SET));

    var yyyy = date_time.getFullYear().toString();
    var MM = pad(date_time.getMonth() + 1,2);
    var dd = pad(date_time.getDate(), 2);
    var hh = pad(date_time.getHours(), 2);
    var mm = pad(date_time.getMinutes(), 2)
    var ss = pad(date_time.getSeconds(), 2)

    return yyyy+'/'+MM+'/'+dd+' '+hh+':'+mm;
}

var func = {}
func.get_now_format_date = get_now_format_date;
func.format_date = format_date;

module.exports = func;