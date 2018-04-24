$(document).ready(function(){
  var idempresa = $("#id").val().toString()
  $("body").on("click","#telefono-add",function(event){
    event.preventDefault();
    $('#form-add-telefono').validate({
       errorElement: "span",
       rules: {
           telefonoInputNombre: {
             required: true,
             minlength: 2,
             maxlength:32,
             lettersonly: true
           },
           telefonoInputTelefono: {
             required: true,
             minlength: 6,
             maxlength: 16,
             digits: true
           }
       },
       highlight: function(element) {
        $(element).closest('.form-group')
        .removeClass('has-success').addClass('has-error');
       },
       success: function(element) {
        element
        .addClass('help-inline')
        .closest('.form-group')
        .removeClass('has-error').addClass('has-success');
       }
    });
    if ($('#form-add-telefono').valid()) {
      var exito = true;
      var idtelefono = "";
      var csrftoken = Cookies.get('csrftoken');
      $.ajax({
        url: encodeURI(base_url + "accounts/perfil/edit/phones/"+idempresa.toString()+"/add"),
        type: 'POST',
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        },
        data: { nombre: $("#telefonoInputNombre").val(), telefono: $("#telefonoInputTelefono").val() },
        contentType: 'application/x-www-form-urlencoded',
        success: function (data) {
          writemessage(data);
          if (data.estado == "danger"){
            exito = false;
          }
          else{
            idtelefono = data.idtelefono;
          }
         },
        error: function () { },
      }).done(function(){
        if (exito){
          var elemento = "<tr id='tel-"+idtelefono+"'><td class='nombre-telefono'><input class='form-control hidden' type='text' name='nombre' value='"+$("#telefonoInputNombre").val().toString();
          elemento = elemento + "'><span>"+$("#telefonoInputNombre").val().toString()+"</span></td> <td class='telefono-telefono'><input class='form-control hidden' type='text' name='telefono' value='";
          elemento = elemento +$("#telefonoInputTelefono").val().toString()+"'><span>"+$("#telefonoInputTelefono").val().toString()+"</span></td><td telefono='"+idtelefono+"' class='telefono-acciones' align='center'>";
          elemento = elemento + "<a href='#' class='tel-acc-editar'><button class='btn btn-warning btn-sm'><i class='fa fa-pencil' title='Editar'></i></button></a> &nbsp; <a href='#' data-toggle='modal' data-target='#myModal1'><button class='btn btn-danger btn-sm'><i class='fa fa-remove' title='Eliminar'></i></button></a></td></tr>";
          $("#telefonos-list").append(elemento);
          $("#telefonoInputNombre").val("");
          $("#telefonoInputTelefono").val("");
        }
      });
    }
  });
  $("body").on("click",".tel-acc-editar",function(event){
    event.preventDefault();
    var telefono = $(this).parent().attr("telefono");
    $("#tel-"+telefono.toString()).children(".nombre-telefono").children("span").addClass("hidden");
    $("#tel-"+telefono.toString()).children(".nombre-telefono").children("input").removeClass("hidden");
    $("#tel-"+telefono.toString()).children(".telefono-telefono").children("span").addClass("hidden");
    $("#tel-"+telefono.toString()).children(".telefono-telefono").children("input").removeClass("hidden");
    $(this).removeClass("tel-acc-editar");
    $(this).addClass("tel-acc-guardar");
    $(this).text("Guardar");
  });
  $("body").on("click",".tel-acc-guardar",function(event){
    event.preventDefault();
    var telefono = $(this).parent().attr("telefono");
    var $nombre = $("#tel-"+telefono.toString()).children(".nombre-telefono");
    var $telefono = $("#tel-"+telefono.toString()).children(".telefono-telefono");
    var $nombreInput = $nombre.children("input");
    var $nombreSpan = $nombre.children("span");
    var $telefonoInput = $telefono.children("input");
    var $telefonoSpan = $telefono.children("span");
    $nombreInput.addClass("hidden");
    $nombreSpan.text($nombreInput.val());
    $telefonoInput.addClass("hidden");
    $telefonoSpan.text($telefonoInput.val());
    var csrftoken = Cookies.get('csrftoken');
    $.ajax({
    	url: encodeURI(base_url + "accounts/perfil/edit/phones/"+telefono.toString()+"/edit"),
    	type: 'POST',
    	beforeSend: function(xhr, settings) {
          if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
              xhr.setRequestHeader("X-CSRFToken", csrftoken);
          }
    	},
    	data: { nombre: $nombreSpan.text(), telefono: $telefonoSpan.text() },
    	contentType: 'application/x-www-form-urlencoded',
    	success: function (data) {
        writemessage(data);
       },
    	error: function () { },
    });
    $nombreSpan.removeClass("hidden");
    $telefonoSpan.removeClass("hidden");
    $(this).removeClass("tel-acc-guardar");
    $(this).addClass("tel-acc-editar");
    $(this).html("<i class='fa fa-pencil'></i>");
  });

  $("body").on("click","#email-add",function(event){
    event.preventDefault();
    $('#form-add-email').validate({
       errorElement: "span",
       rules: {
           emailInputNombre: {
             required: true,
             minlength: 2,
             maxlength:32
           },
           emailInputEmail: {
             required: true,
             email: true,
             minlength: 5,
             maxlength: 128
           }
       },
       highlight: function(element) {
        $(element).closest('.form-group')
        .removeClass('has-success').addClass('has-error');
       },
       success: function(element) {
        element
        .addClass('help-inline')
        .closest('.form-group')
        .removeClass('has-error').addClass('has-success');
       }
    });
    if ($('#form-add-email').valid()) {
      var exito = true;
      var idemail = "";
      var csrftoken = Cookies.get('csrftoken');
      $.ajax({
        url: encodeURI(base_url + "accounts/perfil/edit/emails/"+idempresa.toString()+"/add"),
        type: 'POST',
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        },
        data: { nombre: $("#emailInputNombre").val(), email: $("#emailInputEmail").val() },
        contentType: 'application/x-www-form-urlencoded',
        success: function (data) {
          writemessage(data);
          if (data.estado == "danger"){
            exito = false;
          }
          else{
            idemail = data.idemail;
          }
         },
        error: function () { },
      }).done(function(){
        if (exito){
          var elemento = "<tr id='email-"+idemail+"'><td class='nombre-email'><input class='form-control hidden' type='text' name='nombre' value='"+$("#emailInputNombre").val().toString();
          elemento = elemento + "'><span>"+$("#emailInputNombre").val().toString()+"</span></td> <td class='email-email'><input class='form-control hidden' type='text' name='email' value='";
          elemento = elemento +$("#emailInputEmail").val().toString()+"'><span>"+$("#emailInputEmail").val().toString()+"</span></td><td email='"+idemail+"' class='email-acciones' align='center'>";
          elemento = elemento + "<a href='#' class='email-acc-editar' class='btn btn-warning btn-sm'><i class='fa fa-pencil' title='Editar'></i></a> &nbsp; <a href='#' class='email-acc-eliminar' class='btn btn-danger btn-sm'><i class='fa fa-remove' title='Eliminar'></i></a></td></tr>";
          $("#emails-list").append(elemento);
          $("#emailInputNombre").val("");
          $("#emailInputEmail").val("");
        }
      });
    }
  });
  $("body").on("click",".email-acc-editar",function(event){
    event.preventDefault();
    var email = $(this).parent().attr("email");
    $("#email-"+email.toString()).children(".nombre-email").children("span").addClass("hidden");
    $("#email-"+email.toString()).children(".nombre-email").children("input").removeClass("hidden");
    $("#email-"+email.toString()).children(".email-email").children("span").addClass("hidden");
    $("#email-"+email.toString()).children(".email-email").children("input").removeClass("hidden");
    $(this).removeClass("email-acc-editar");
    $(this).addClass("email-acc-guardar");
    $(this).text("Guardar");
  });
  $("body").on("click",".email-acc-guardar",function(event){
    event.preventDefault();
    var email = $(this).parent().attr("email");
    var $nombre = $("#email-"+email.toString()).children(".nombre-email");
    var $email = $("#email-"+email.toString()).children(".email-email");
    var $nombreInput = $nombre.children("input");
    var $nombreSpan = $nombre.children("span");
    var $emailInput = $email.children("input");
    var $emailSpan = $email.children("span");
    $nombreInput.addClass("hidden");
    $nombreSpan.text($nombreInput.val());
    $emailInput.addClass("hidden");
    $emailSpan.text($emailInput.val());
    var csrftoken = Cookies.get('csrftoken');
    $.ajax({
    	url: encodeURI(base_url + "accounts/perfil/edit/emails/"+email.toString()+"/edit"),
    	type: 'POST',
    	beforeSend: function(xhr, settings) {
          if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
              xhr.setRequestHeader("X-CSRFToken", csrftoken);
          }
    	},
    	data: { nombre: $nombreSpan.text(), email: $emailSpan.text() },
    	contentType: 'application/x-www-form-urlencoded',
    	success: function (data) {
        writemessage(data);
       },
    	error: function () { },
    });
    $nombreSpan.removeClass("hidden");
    $emailSpan.removeClass("hidden");
    $(this).removeClass("email-acc-guardar");
    $(this).addClass("email-acc-editar");
    $(this).html("<i class='fa fa-pencil'></i>");
  });

  $("body").on("click","#paginaweb-add",function(event){
    event.preventDefault();
    $('#form-add-paginaweb').validate({
       errorElement: "span",
       rules: {
           paginawebInputNombre: {
             required: true,
             minlength: 2,
             maxlength:32
           },
           paginawebInputPaginaweb: {
             required: true,
             url: true,
             minlength: 5,
             maxlength: 150
           }
       },
       highlight: function(element) {
        $(element).closest('.form-group')
        .removeClass('has-success').addClass('has-error');
       },
       success: function(element) {
        element
        .addClass('help-inline')
        .closest('.form-group')
        .removeClass('has-error').addClass('has-success');
       }
    });
    if ($('#form-add-paginaweb').valid()) {
      var exito = true;
      var idpaginaweb = "";
      var csrftoken = Cookies.get('csrftoken');
      $.ajax({
        url: encodeURI(base_url + "accounts/perfil/edit/paginasweb/"+idempresa.toString()+"/add"),
        type: 'POST',
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        },
        data: { nombre: $("#paginawebInputNombre").val(), paginaweb: $("#paginawebInputPaginaweb").val() },
        contentType: 'application/x-www-form-urlencoded',
        success: function (data) {
          writemessage(data);
          if (data.estado == "danger"){
            exito = false;
          }
          else{
            idpaginaweb = data.idpaginaweb;
          }
         },
        error: function () { },
      }).done(function(){
        if (exito){
          var elemento = "<tr id='paginaweb-"+idpaginaweb+"'><td class='nombre-paginaweb'><input class='form-control hidden' type='text' name='nombre' value='"+$("#paginawebInputNombre").val().toString();
          elemento = elemento + "'><span>"+$("#paginawebInputNombre").val().toString()+"</span></td> <td class='paginaweb-paginaweb'><input class='form-control hidden' type='text' name='paginaweb' value='";
          elemento = elemento +$("#paginawebInputPaginaweb").val().toString()+"'><span>"+$("#paginawebInputPaginaweb").val().toString()+"</span></td><td paginaweb='"+idpaginaweb+"' class='paginaweb-acciones' align='center'>";
          elemento = elemento + "<a href='#' class='paginaweb-acc-editar' class='btn btn-warning btn-sm'><i class='fa fa-pencil' title='Editar'></i></a> &nbsp; <a href='#' class='paginaweb-acc-eliminar' class='btn btn-danger btn-sm'><i class='fa fa-remove' title='Eliminar'></i></a></td></tr>";
          $("#paginasweb-list").append(elemento);
          $("#paginawebInputNombre").val("");
          $("#paginawebInputPaginaweb").val("");
        }
      });
    }
  });
  $("body").on("click",".paginaweb-acc-editar",function(event){
    event.preventDefault();
    var paginaweb = $(this).parent().attr("paginaweb");
    $("#paginaweb-"+paginaweb.toString()).children(".nombre-paginaweb").children("span").addClass("hidden");
    $("#paginaweb-"+paginaweb.toString()).children(".nombre-paginaweb").children("input").removeClass("hidden");
    $("#paginaweb-"+paginaweb.toString()).children(".paginaweb-paginaweb").children("span").addClass("hidden");
    $("#paginaweb-"+paginaweb.toString()).children(".paginaweb-paginaweb").children("input").removeClass("hidden");
    $(this).removeClass("paginaweb-acc-editar");
    $(this).addClass("paginaweb-acc-guardar");
    $(this).text("Guardar");
  });
  $("body").on("click",".paginaweb-acc-guardar",function(event){
    event.preventDefault();
    var paginaweb = $(this).parent().attr("paginaweb");
    var $nombre = $("#paginaweb-"+paginaweb.toString()).children(".nombre-paginaweb");
    var $paginaweb = $("#paginaweb-"+paginaweb.toString()).children(".paginaweb-paginaweb");
    var $nombreInput = $nombre.children("input");
    var $nombreSpan = $nombre.children("span");
    var $paginawebInput = $paginaweb.children("input");
    var $paginawebSpan = $paginaweb.children("span");
    $nombreInput.addClass("hidden");
    $nombreSpan.text($nombreInput.val());
    $paginawebInput.addClass("hidden");
    $paginawebSpan.text($paginawebInput.val());
    var csrftoken = Cookies.get('csrftoken');
    $.ajax({
      url: encodeURI(base_url + "accounts/perfil/edit/paginasweb/"+paginaweb.toString()+"/edit"),
      type: 'POST',
      beforeSend: function(xhr, settings) {
          if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
              xhr.setRequestHeader("X-CSRFToken", csrftoken);
          }
      },
      data: { nombre: $nombreSpan.text(), paginaweb: $paginawebSpan.text() },
      contentType: 'application/x-www-form-urlencoded',
      success: function (data) {
        writemessage(data);
       },
      error: function () { },
    });
    $nombreSpan.removeClass("hidden");
    $paginawebSpan.removeClass("hidden");
    $(this).removeClass("paginaweb-acc-guardar");
    $(this).addClass("paginaweb-acc-editar");
    $(this).html("<i class='fa fa-pencil'></i>");
  });
});
function eliminarpaginaweb(id) {
    $.getJSON(base_url + "accounts/perfil/edit/paginasweb/"+id+"/delete",function(data){
      writemessage(data);
    });
    document.getElementById('paginaweb-'+id).remove();
}
function eliminaremail(id) {
    $.getJSON(base_url + "accounts/perfil/edit/emails/"+id+"/delete",function(data){
      writemessage(data);
    });
    document.getElementById('email-'+id).remove();
}
function eliminartelefono(id) {
    $.getJSON(base_url + "accounts/perfil/edit/phones/"+id+"/delete",function(data){
      writemessage(data);
    });
    document.getElementById('tel-'+id).remove();
}




