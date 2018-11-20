var FormAjaxUtils = function () {
}

FormAjaxUtils.send = function ($form, fnSuccess, fnError) {

    $.ajax({
        type: $form.attr('method'),
        url: $form.attr('action'),
        data: JSON.stringify($form.serializeObject()),
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


FormAjaxUtils.sendResult = function ($form, fnSuccess, fnError) {
    $.ajax({
        type: $form.attr('method'),
        url: $form.attr('action'),
        data: JSON.stringify($form.serializeObject()),
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        success: function (result) {


            if (fnSuccess) {
                fnSuccess(result);
            }
        },
        error: function (request, status, error) {
            console.log(request , status , error);
            if (fnError) {
                fnError(request, status, error);
            }
        }

    });
}
