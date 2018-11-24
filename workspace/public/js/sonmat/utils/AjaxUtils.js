var AjaxUtils = function () {
}


AjaxUtils.get = function (url, params , fnSuccess, fnError) {


    $.ajax({
        type: 'get',
        url: url,
        data : params,
        dataType: "json",
        success: function (result) {

            if (fnSuccess) {
                fnSuccess(result);
            }
        },
        error: function (request, status, error) {
            if (fnError) {
                fnError(request, status, error);
            }
        }

    });
}

AjaxUtils.upload = function (url, data , fnSuccess, fnError) {

    $.ajax({
        url : url,
        processData: false,
        contentType: false,
        data: data,
        dataType: "json",
        type: 'POST',
        success: function (result) {
            if (fnSuccess) {
                fnSuccess(result);
            }
        },
        error: function (request, status, error) {
            if (fnError) {
                fnError(request, status, error);
            }
        }
    });
}


AjaxUtils.post = function (url, dataObj, fnSuccess, fnError) {


    $.ajax({
        type: 'post',
        url: url,
        data: JSON.stringify(dataObj),
        contentType: "application/json; charset=UTF-8",
        success: function () {
            if (fnSuccess) {
                fnSuccess();
            }
        },
        error: function (request, status, error) {
            if (fnError) {
                fnError(request, status, error);
            }
        }

    });


}


AjaxUtils.postResult = function (url, dataObj, fnSuccess, fnError) {


    $.ajax({
        type: 'post',
        url: url,
        data: JSON.stringify(dataObj),
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        success: function (result) {
            if (fnSuccess) {
                fnSuccess(result);
            }
        },
        error: function (request, status, error) {
            if (fnError) {
                fnError(request, status, error);
            }
        }

    });
}

AjaxUtils.delete = function (url, fnSuccess, fnError) {


    $.ajax({
        type: 'delete',
        url: url,
        contentType: "application/json; charset=UTF-8",
        success: function () {
            if (fnSuccess) {
                fnSuccess();
            }
        },
        error: function (request, status, error) {
            if (fnError) {
                fnError(request.responseJSON);
            }
        }
    });
}
