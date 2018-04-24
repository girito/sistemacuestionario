$(document).ready(function(){
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
        url: encodeURI(base_url + "accounts/perfil/edit/phones/add"),
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
          elemento = elemento +$("#telefonoInputTelefono").val().toString()+"'><span>"+$("#telefonoInputTelefono").val().toString()+"</tr>";
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
    $(this).text("Editar");
  });
  $("body").on("click",".tel-acc-eliminar",function(event){
    event.preventDefault();
    var telefono = $(this).parent().attr("telefono");
    $.getJSON(base_url + "accounts/perfil/edit/phones/"+telefono.toString()+"/delete",function(data){
      writemessage(data);
    });
    $(this).parent().parent().remove();
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
        url: encodeURI(base_url + "accounts/perfil/edit/emails/add"),
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
          elemento = elemento +$("#emailInputEmail").val().toString()+"'><span>"+$("#emailInputEmail").val().toString()+"</span></td></tr>";
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
    $(this).text("Editar");
  });
  $("body").on("click",".email-acc-eliminar",function(event){
    event.preventDefault();
    var email = $(this).parent().attr("email");
    $.getJSON(base_url + "accounts/perfil/edit/emails/"+email.toString()+"/delete",function(data){
      writemessage(data);
    });
    $(this).parent().parent().remove();
  });
  $('#comentarioForm').validate({
      errorElement: "span",
      rules: {
          titulo: {
              required: true
          },
          comentario: {
              minlength: 2,
              required: true
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
});