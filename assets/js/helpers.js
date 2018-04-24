var dateFormat = function () {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
		    val = String(val);
		    len = len || 2;
		    while (val.length < len) val = "0" + val;
		    return val;
		};

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
        var dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date;
        if (isNaN(date)) throw SyntaxError("invalid date");

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        var _ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
			    d: d,
			    dd: pad(d),
			    ddd: dF.i18n.dayNames[D],
			    dddd: dF.i18n.dayNames[D + 7],
			    m: m + 1,
			    mm: pad(m + 1),
			    mmm: dF.i18n.monthNames[m],
			    mmmm: dF.i18n.monthNames[m + 12],
			    yy: String(y).slice(2),
			    yyyy: y,
			    h: H % 12 || 12,
			    hh: pad(H % 12 || 12),
			    H: H,
			    HH: pad(H),
			    M: M,
			    MM: pad(M),
			    s: s,
			    ss: pad(s),
			    l: pad(L, 3),
			    L: pad(L > 99 ? Math.round(L / 10) : L),
			    t: H < 12 ? "a" : "p",
			    tt: H < 12 ? "am" : "pm",
			    T: H < 12 ? "A" : "P",
			    TT: H < 12 ? "AM" : "PM",
			    Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
			    o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
			    S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

        return mask.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
} ();

// Some common format strings
dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
    ventaFormatDate: "dd-mmm-yyyy"
};

// Internationalization strings
dateFormat.i18n = {
    dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
    monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};

function fase(obj)
{
  var parent = $(obj).parent();
  var response;
  $.getJSON( base_url + "ventas/api/empezar-fase/"+$(obj).attr("id"), function( data )
  {
    response = data;
    fastMessage(data.mensaje, data.level);
  })
  .done(function(){
    if (response.mensaje == "Fase iniciada"){
      var code = parent.attr("id");
      var dcode = code.split("-");
      var oportunidad = dcode[1];
      var fase  = dcode[3];
      htmllistcomments  = "<br><span class='btn btn-info btn-xs fase-comentarios'><i class='fa fa-comments'></i></span>&nbsp;";
      htmladdcomment    = "<span class='btn btn-warning btn-xs btn-start-comment'><i class='fa fa-commenting'></i></span>";

      // Iluminar celda de la nueva etapa
      parent.parent().children().removeClass("current");
      parent.addClass("current");

      // Agregar fecha actual
      parent.append(dateFormat(new Date(), dateFormat.masks.ventaFormatDate))

      // Agregar Ambos botones
      parent.append(htmllistcomments);
      parent.append(htmladdcomment);
      $(obj).remove();
      if (fase == 'e'){
        $("#"+dcode[1]+"-fase-h").remove();
      }
    }
    else {

    }
  })
  .error(function() {
    fastMessage("Ha ocurrio un error, intenta más tarde.","modal-danger");
  });
}
function loadCommentsFase(fase)
{
    url = base_url + "ventas/api/comentarios/"+fase
    $('#showDetail .modal-title').html("Comentarios");
    $('#showDetail .modal-body').html('<p class="text-center"><i class="fa fa-refresh fa-spin"></i> Procesando...</p>');
    $.getJSON( url, function( data ) {
        var comentarios = ' ';
        if (data.length < 1) {
          comentarios +="<h4>Comentarios no encontrados</h4>";
        }
        $.each( data, function( id,objComment ) {
            comentarios +=objComment.comentario;
        });
        $('#showDetail .modal-body').html("<ul class='chat' id='comentarios'>"+comentarios+"</ul>");
    })
    .error(function() { console.log("Error to load comment") })
    .complete(function() {
      console.log("Notes loaded");
      $('body').on('mouseenter','.chat-body',function(){
        $(this).children("div").children("a").removeClass("hidden");
        $(this).children("div").children("a").fadeIn(200);
      });
      $('body').on('mouseleave','.chat-body',function(){
        $(this).children("div").children("a").fadeOut(200);
      });
      $('body').on('click','.edit-note',function(e){
        e.preventDefault();
        if (!$(this).hasClass("hidden")){
          $('#showDetail .modal-body').fadeOut(50,function(){
            $('#showDetail .modal-body').html('<p class="text-center"><i class="fa fa-refresh fa-spin"></i> Procesando...</p>');
            $('#showDetail .modal-title').html("Editar Nota");
          });
          $('#showDetail .modal-body').fadeIn(50);

          $.ajax({
            url: encodeURI(base_url + 'ventas/api/oportunidades/notas/'+$(this).attr("note")+"/edit"),
            type: 'GET',
            datatype: 'application/json',
            success: function (data) {
              $('#showDetail .modal-body').fadeOut(100,function(){
                $('#showDetail .modal-body').fadeIn(200,function(){
                  $('#showDetail .modal-body').html(data.contenido);
                  $('#showDetail .modal-title').html(data.titulo);
                });
              });
             },
            error: function () { },
          });
        }
      });
    });
    $('#showDetail').modal('show');

}
function insertParam(key, value)
{
    key = encodeURI(key); value = encodeURI(value);
    var kvp = document.location.search.substr(1).split('&');
    var i=kvp.length; var x; while(i--)
    {
        x = kvp[i].split('=');
        if (x[0]==key)
        {
            x[1] = value;
            kvp[i] = x.join('=');
            break;
        }
    }
    if(i<0) {kvp[kvp.length] = [key,value].join('=');}
    document.location.search = kvp.join('&');
}
function loadComment(url)
{
    $.getJSON( url, function( data ) {
        var comentarios = ' ';
        $.each( data, function( id,objComment ) {
            comentarios +=objComment.comentario;
        });
        $('#comentarios').html(comentarios);
    })
    .error(function() { console.log("Error to load comment") })
    .complete(function() {
      console.log("Comments loaded");
      $('body').on('mouseenter','.chat-body',function(){
        $(this).children("div").children("a").removeClass("hidden");
        $(this).children("div").children("a").fadeIn(200);
      });
      $('body').on('mouseleave','.chat-body',function(){
        $(this).children("div").children("a").fadeOut(200);
      });
      $('body').on('click','.edit-comment',function(e){
        e.preventDefault();
        if (!$(this).hasClass("hidden")){
          $('#showDetail .modal-body').html('<p class="text-center"><i class="fa fa-refresh fa-spin"></i> Procesando...</p>');
          $('#showDetail .modal-title').html("Editar Comentario");
          $('#showDetail').modal('show');
          $.ajax({
            url: encodeURI(base_url + 'comentarios/'+$(this).attr("comment")+'/edit'),
            type: 'GET',
            datatype: 'application/json',
            success: function (data) {
              $('#showDetail .modal-body').html(data.contenido);
              $('#showDetail .modal-title').html(data.titulo);
             },
            error: function () { },
          });
        }
      });
    });
}
function loadNotes(url)
{
    $.getJSON( url, function( data ) {
        var notas = ' ';
        $.each( data, function( id,objNota ) {
            notas +=objNota.comentario;
        });
        $('#notas').html(notas);
    })
    .error(function() { console.log("Error to load notes") })
    .complete(function() {
      console.log("Notes loaded");
      $('body').on('mouseenter','.chat-body',function(){
        $(this).children("div").children("a").removeClass("hidden");
        $(this).children("div").children("a").fadeIn(200);
      });
      $('body').on('mouseleave','.chat-body',function(){
        $(this).children("div").children("a").fadeOut(200);
      });
      $('body').on('click','.edit-note',function(e){
        e.preventDefault();
        if (!$(this).hasClass("hidden")){
          $('#showDetail .modal-body').html('<p class="text-center"><i class="fa fa-refresh fa-spin"></i> Procesando...</p>');
          $('#showDetail .modal-title').html("Editar Nota");
          $('#showDetail').modal('show');
          $.ajax({
            url: encodeURI(base_url + 'ventas/api/oportunidades/notas/'+$(this).attr("note")+"/edit"),
            type: 'GET',
            datatype: 'application/json',
            success: function (data) {
              $('#showDetail .modal-body').html(data.contenido);
              $('#showDetail .modal-title').html(data.titulo);
             },
            error: function () { },
          });
        }
      });
    });
}
function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") {
        return;
    }

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=");
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) {
            parms[n] = [];
        }

        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}
function writemessage(data){
  var htmlmessage = "<div class='alert alert-" + data.estado;
  htmlmessage = htmlmessage + " alert-dismissible' role='alert'> <button type='button' class='close' data-dismiss='alert' aria-label='Close'> <span aria-hidden='true'>&times;</span></button> ";
  htmlmessage = htmlmessage + data.mensaje +"</div>";
  $("#message-wrap").html(htmlmessage);
}
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
function mostrarDetalle(obj)
{
    $('#showDetail .modal-body').html('<p class="text-center"><i class="fa fa-refresh fa-spin"></i> Procesando...</p>');
    $('#showDetail .modal-title').html($(obj).attr("id"));
    $.get( base_url + "api/show/"+$(obj).attr("id"), function( data ) {
        $('#showDetail .modal-body').html(data.contenido);
        $('#showDetail .modal-title').html(data.titulo);
    });
    $('#showDetail').modal('show');
}

function mostrarFormComentario(obj)
{
    $('#showDetail .modal-body').html('<p class="text-center"><i class="fa fa-refresh fa-spin"></i> Procesando...</p>');
    $('#showDetail .modal-title').html($(obj).attr("id"));
    $.ajax({
      url: encodeURI(base_url + 'ventas/api/comentarios/'+$(obj).parent().attr("id")+'/new'),
      type: 'GET',
      datatype: 'application/json',
      success: function (data, textStatus,what) {
        $('#showDetail .modal-body').html(data.contenido);
        $('#showDetail .modal-title').html(data.titulo);
       },
      error: function () { },
    });
    $('#showDetail').modal('show');
}

function guardarNota(obj){
  var formData = new FormData($("form#form-note")[0]);
  var csrftoken = Cookies.get('csrftoken');
  var response;
  $.ajax({
        url: encodeURI(base_url + 'ventas/api/oportunidades/notas/'+$(obj).parent().parent().data("note")+'/edit'),
        type: 'POST',
        data: formData,
        async: false,
        beforeSend: function(xhr, settings) {
          xhr.setRequestHeader("X-CSRFToken", csrftoken);
        },
        success: function (data) {
          response = data;
          $("#showDetail .modal-body").fadeOut(350, function() {
            $(this).html(response.contenido);
            $(this).fadeIn(350, function() {});
          });
          loadNotes(base_url + "ventas/api/oportunidades/"+response.id+"/notas");
        },
        cache: false,
        contentType: false,
        processData: false,
        error: function () {
          $("#showDetail .modal-body").fadeOut(350, function() {
            $(this).html("<div style='text-align:center;float:center;'><div style='width:100px;height:100px;background-color:#FF573F;border-radius:50px;margin: 0 auto;'><i class='fa fa-times fa-3x' style='line-height: 100px;'></i></div><br>No se pudo realizar el comentario.</div>");
            $(this).fadeIn(350, function() {});
          });
        }
    });
    return false;
}
function guardarComentario(obj){
  var formData = new FormData($("form#form-comentario")[0]);
  var csrftoken = Cookies.get('csrftoken');
  var response;
  $.ajax({
        url: encodeURI(base_url + 'comentarios/'+$(obj).parent().parent().data("com")+'/edit'),
        type: 'POST',
        data: formData,
        async: false,
        beforeSend: function(xhr, settings) {
          xhr.setRequestHeader("X-CSRFToken", csrftoken);
        },
        success: function (data) {
          response = data;
          $("#showDetail .modal-body").fadeOut(350, function() {
            $(this).html(response.contenido);
            $(this).fadeIn(350, function() {});
          });
          loadComment(base_url + "comentarios/to_json/"+response.clase+"/"+response.id+"/list");
        },
        cache: false,
        contentType: false,
        processData: false,
        error: function () {
          $("#showDetail .modal-body").fadeOut(350, function() {
            $(this).html("<div style='text-align:center;float:center;'><div style='width:100px;height:100px;background-color:#FF573F;border-radius:50px;margin: 0 auto;'><i class='fa fa-times fa-3x' style='line-height: 100px;'></i></div><br>No se pudo realizar el comentario.</div>");
            $(this).fadeIn(350, function() {});
          });
        }
    });
    return false;
}
function enviarComentario(obj){
  var formData = new FormData($("form#form")[0]);
  var csrftoken = Cookies.get('csrftoken');
  var response;
  $.ajax({
        url: encodeURI(base_url + 'ventas/api/comentarios/'+$(obj).parent().parent().data("op")+'/new'),
        type: 'POST',
        data: formData,
        async: false,
        beforeSend: function(xhr, settings) {
          xhr.setRequestHeader("X-CSRFToken", csrftoken);
        },
        success: function (data) {
          response = data;
          $("#showDetail .modal-body").fadeOut(350, function() {
            $(this).html(response.contenido);
            $(this).fadeIn(350, function() {});
          });
        },
        cache: false,
        contentType: false,
        processData: false,
        error: function () {
          $("#showDetail .modal-body").fadeOut(350, function() {
            $(this).html("<div style='text-align:center;float:center;'><div style='width:100px;height:100px;background-color:#FF573F;border-radius:50px;margin: 0 auto;'><i class='fa fa-times fa-3x' style='line-height: 100px;'></i></div><br>No se pudo realizar el comentario.</div>");
            $(this).fadeIn(350, function() {});
          });
        }
    });
    return false;
}
/**
* Convertir cadena a url validao - add http://
*/
function stringToUrl(campo)
{
    url = $(campo).val();
    var http=url.substring(0,4);
    if(http!="http"){
        http = "http://";
        url = http+url;
    }
    $(campo).val(url);
}
