(function ($) {
    $.validator.addMethod("valueNotEquals", function(value, element, arg){
      return arg !== value;
     }, "Campo es requerido.");

    $('#avaluo').validate({
      rules: {
        ciudad: { valueNotEquals: "seleccion" },
        direccion: { required: true },
        tipo: { valueNotEquals: "seleccion" },
        piso: { required: true },
        garajes: { valueNotEquals: "seleccion" },
        estrato: { valueNotEquals: "seleccion" },
        habitaciones: { valueNotEquals: "seleccion" },
        banos: { valueNotEquals: "seleccion" },
        area: { required: true },
        tiempo: { valueNotEquals: "seleccion" },
        niveles: { valueNotEquals: "seleccion" },
        politicas:{ required: true }

      },
      submitHandler: function(form){
        $('.loading').show();
        $('.btn-request-api').addClass('disable');
        var direccion = $('#direccion').val().replace(/#+/g,' ');
            direccion = $('#direccion').val().replace(/-+/g,' ');
            direccion = $('#direccion').val().replace(/\s+/g, '+');

        var data = {
                "direccion": direccion+',+'+$('#ciudad').val()+',+Colombia',
                "latitud": 0,
                "longitud": 0,
                "ciudad": $('#ciudad').val(),
                "tipoinmueble": $('#tipo').val(),
                "numerodepiso": parseInt($('#piso').val()),
                "garajes": parseInt($('#garajes').val()),
                "estrato":parseInt( $('#estrato').val()),
                "habitaciones": parseInt($('#habitaciones').val()),
                "banos": parseInt($('#banos').val()),
                "area": parseInt($('#area').val()),
                "tiempodeconstruido": $('#tiempo').val(),
                "halldealcobasoestar": $('#hall').is(':checked') ? "Si" : "No",
                "conjuntocerrado": "No",
                "balcon": $('#balcon').is(':checked') ? "Si" : "No",
                "numeroascensores": parseInt($('#numeroascensores').val()),
                "saloncomunal": $('#saloncomunal').is(':checked') ? "Si" : "No",
                "zonadelavanderia": $('#lavanderia').is(':checked') ? "Si" : "No",
                "estudioobiblioteca": $('#estudio').is(':checked') ? "Si" : "No",
                "cuartodeservicio": $('#habitacionservicio').is(':checked') ? "Si" : "No",
                "numerodeniveles": parseInt($('#niveles').val()),
                "terraza": $('#terraza').is(':checked') ? "Si" : "No",
                "areaterraza": 0,
                "vista": $('#vistaexterior').is(':checked') ?  "Exterior" : "Interior",
                "depositoocuartoutil": $('#deposito').is(':checked') ? "Si" : "No",
                "remodelado": $('#remodelado').is(':checked') ? "Si" : "No",
                "clubhouse": $('#clubhouse').is(':checked') ? "Si" : "No",
                "porteria": $('#porteria').is(':checked') ? "Si" : "No",
                "porcentaje": 0.7,
                "tasa": 10,
                "plazo": 15,
                "valorhipoteca": 200000000
            };

        $.ajax({
            url: 'https://api.avaluoenlinea.com/servicios/API_call',
            data: JSON.stringify(data),
            type: 'POST',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            headers: {"x-api-key": "cxl7hmWdKSaZVbyiQbgM06uUQddeXxc652SINI3U"},
            success: function (response) {
                console.log(response);
                if (response !== "") {
                    var valor_recuadro = numeral(response.ventaforecast.valorestimadototal);
                    $('.valor-recuadro').text('$ ' + valor_recuadro.format('0,0'));
                    $('.valor-arriendo-recuadro').text('$ ' + numeral(response.arriendoforecast.valorestimadototal).format('0,0'));

                    $('.area-recuadro').text(response.features.area + ' mts2');
                    $('.habitaciones-recuadro').text(response.features.habitaciones);
                    $('.banos-recuadro').text(response.features.banos);
                    $('.garajes-recuadro').text(response.features.garajes);
                    $('.direccion').text($('#direccion').val());
                    $('.ciudad').text(response.features.ciudad);
                    $('.estrato').text(response.features.estrato);
                    $('.habitaciones').text(response.features.habitaciones);
                    $('.garajes').text(response.features.garajes);
                    $('.area').text(response.features.area + ' mts2');
                    $('.tiempo').text(response.features.tiempodeconstruido);
                    $('.banos').text(response.features.banos);
                    $('.niveles').text(response.features.numerodeniveles);
                    $('#balcon').is(':checked') ? $('body .balcon').prop("checked", true) : $('body .balcon').prop("checked", false);
                    $('#banoservicio').is(':checked') ? $('body .banoservicio').prop("checked", true) : $('body .banoservicio').prop("checked", false);
                    $('#clubhouse').is(':checked') ? $('body .clubhouse').prop("checked", true) : $('body .clubhouse').prop("checked", false);
                    $('#estudio').is(':checked') ? $('body .estudio').prop("checked", true) : $('body .estudio').prop("checked", false);
                    $('#deposito').is(':checked') ? $('body .deposito').prop("checked", true) : $('body .deposito').prop("checked", false);
                    $('#habitacionservicio').is(':checked') ? $('body .habitacionservicio').prop("checked", true) : $('body .habitacionservicio').prop("checked", false);
                    $('#hall').is(':checked') ? $('body .hall').prop("checked", true) : $('body .hall').prop("checked", false);
                    $('#lavanderia').is(':checked') ? $('body .lavanderia').prop("checked", true) : $('body .lavanderia').prop("checked", false);
                    $('#parqueaderoseparado').is(':checked') ? $('body .parqueaderoseparado').prop("checked", true) : $('body .parqueaderoseparado').prop("checked", false);
                    $('#porteria').is(':checked') ? $('body .porteria').prop("checked", true) : $('body .porteria').prop("checked", false);
                    $('#remodelado').is(':checked') ? $('body .remodelado').prop("checked", true) : $('body .remodelado').prop("checked", false);
                    $('#saloncomunal').is(':checked') ? $('body .saloncomunal').prop("checked", true) : $('body .saloncomunal').prop("checked", false);
                    $('#terraza').is(':checked') ? $('body .terraza').prop("checked", true) : $('body .terraza').prop("checked", false);
                    $('#vistaexterior').is(':checked') ? $('body .vistaexterior').prop("checked", true) : $('body .vistaexterior').prop("checked", false);

                    var html = '';
                    var i = 0;
                    $('.data-comparacion').empty();
                    $.each(response.comparacion_venta.comparacion, function (i, item) {
                        if (i < 3) {
                            html += '<dl class="col-md-3" style="display: inline-block">';
                            html += '<dt><i class="fa fa-home" aria-hidden="true"></i></dt>';
                            html += '<dt><span class="no-bold valor-comparacion">$ ' + numeral(item.valor).format('0,0') + '</span></dt>';
                            html += '<dt><span class="no-bold area-comparacion">' + item.area + ' mts</span></dt>';
                            html += '<dt><span class="no-bold area-valormt2-comparacion">$ ' + numeral(item.valormt2).format('0,0') + '</span></dt>';
                            html += '<dt><span class="no-bold habitacion-comparacion">' + item.habitaciones + '</span></dt>';
                            html += '<dt><span class="no-bold banos-comparacion">' + item.banos + '</span></dt>';
                            html += '<dt><span class="no-bold garage-comparacion">' + item.garajes + '</span></dt>';
                            html += '</dl>';
                        } else {
                            return false;
                        }
                    });
                    $('.data-comparacion').append(html);

                    $('.data-comparacion-arriendo').empty();
                    $.each(response.comparacion_arriendo.comparacion, function (i, item) {
                        if (i < 3) {
                            html += '<dl class="col-md-3" style="display: inline-block">';
                            html += '<dt><span class="no-bold valor-comparacion">$ ' + numeral(item.valor).format('0,0') + '</span></dt>';
                            html += '<dt><span class="no-bold area-comparacion">' + item.area + ' mts</span></dt>';
                            html += '<dt><span class="no-bold area-valormt2-comparacion">$ ' + numeral(item.valormt2).format('0,0') + '</span></dt>';
                            html += '<dt><span class="no-bold habitacion-comparacion">' + item.habitaciones + '</span></dt>';
                            html += '<dt><span class="no-bold banos-comparacion">' + item.banos + '</span></dt>';
                            html += '<dt><span class="no-bold garage-comparacion">' + item.garajes + '</span></dt>';
                            html += '</dl>';
                        } else {
                            return false;
                        }
                    });
                    $('.data-comparacion-arriendo').append(html);
                    $('.formulario-preguntas').hide();
                    $('.respuesta-servicio').show();
                    $('.loading').hide();
                    $('.btn-request-api').removeClass('disable');
                }
            },
            error: function (response, textStatus) {
                if (settings.debug) console.log('[Network] return response with error:', response);
            }
        });
      }
    });

    $('body').on('click', '.btn-arriendo', function (e) {
        $('.data-comparacion-arriendo').show();
        $('.data-comparacion').hide();
        $('.arriendo').show();
        $('.venta').hide();
        $('.btn-arriendo').removeClass('btn-default');
        $('.btn-arriendo').addClass('btn-primary');
        $('.btn-venta').removeClass('btn-primary');
        $('.btn-venta').addClass('btn-default');
    });

    $('body').on('click', '.btn-venta', function (e) {
        $('.data-comparacion-arriendo').hide();
        $('.data-comparacion').show();
        $('.arriendo').hide();
        $('.venta').show();
        $('.btn-arriendo').removeClass('btn-primary');
        $('.btn-arriendo').addClass('btn-default');
        $('.btn-venta').removeClass('btn-default');
        $('.btn-venta').addClass('btn-primary');
    });

    jQuery.extend(jQuery.validator.messages, {
        required: "Campo es requerido."
    });
})(jQuery);
