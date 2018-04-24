window.onload=function(){
    hoy=new Date();
    diasemhoy=hoy.getDay();
    diahoy=hoy.getDate();
    meshoy=hoy.getMonth();
    aniohoy=hoy.getFullYear();
    tit=document.getElementById("titulos");
    document.buscar.buscaanio.value=aniohoy;
    mescal=meshoy;
    aniocal=aniohoy;
    vistap()
}
function cabecera(){
  select = document.getElementById("mes");
  tit.innerHTML=select.options[mescal]+" "+aniocal;
  mesant=mescal-1;
  mespos=mescal+1;
  if(mesant<0) { mesant=11;}
  if(mespos>11) { mespos=0;}
}
function limpiar(){
  for(i=1;i<7;i++){
      fila=document.getElementById("fila"+i);
      filad=document.getElementById("filad"+i);
      filam=document.getElementById("filam"+i);
      for(j=0;j<7;j++){
        celda=fila.getElementsByTagName("td")[j];
        celdad=filad.getElementsByTagName("td")[j];
        celdam=filam.getElementsByTagName("td")[j];
        celdad.innerHTML="";
        celda.innerHTML="";
        celdam.innerHTML="";
        celda.style.background=colorfondo;
        celdad.style.background=colorfondo;
        celdad.style.border= "none";
        celdam.style.border= "none";
      }
    }
}
function escribirdias(){
  limpiar()
  primermes=new Date(aniocal,mescal,"1")
  prsem=primermes.getDay()
  prsem--;
  if(prsem==-2){prsem=6;}
  diaprmes=primermes.getDate()
  prcelda=diaprmes-prsem-1;
  empezar=primermes.setDate(prcelda)
  diames=new Date()
  diames.setTime(empezar);
    for(i=1;i<7;i++){
      fila=document.getElementById("fila"+i);
      filad=document.getElementById("filad"+i);
      filam=document.getElementById("filam"+i);
      for(j=0;j<7;j++){
        midia=diames.getDate()
        mimes=diames.getMonth()
        mianio=diames.getFullYear()
        celda=fila.getElementsByTagName("td")[j];
        celdad=filad.getElementsByTagName("td")[j];
        celdam=filam.getElementsByTagName("td")[j];
        celdam.style.fontWeight="bold";
        celdad.style.fontWeight="bold";
        celdam.style.fontSize="8pt";
        celdad.style.height="22px";
        celdam.style.height="22px";
        celdam.style.borderSpacing="4px 0px";
        celdad.style.borderSpacing="4px 0px";
        if(j==0){
          celda.style.fontWeight="bold";
        }
        if(mimes!=mescal){
          celda.style.color=colordias;
        }else{
          celdad.innerHTML="2500";
          celdam.innerHTML="<div class='btn btn-success btn-circle'><i class='glyphicon glyphicon-ok'></i></div>  "+book;
          celda.innerHTML=midia;
          celda.style.color=colortexto;
          celdad.style.color="#484848";
          celda.style.background=colordias;
          celdad.style.background=colorfondo;
          celdad.style.borderTop= "thin solid #d2d2d2";
          celdad.style.borderRight= "thin solid #d2d2d2";
          celdad.style.borderLeft= "thin solid #d2d2d2";
          celdam.style.borderBottom= "thin solid #d2d2d2";
          celdam.style.borderRight= "thin solid #d2d2d2";
          celdam.style.borderLeft= "thin solid #d2d2d2";
          if(mimes==meshoy && midia==diahoy && mianio==aniohoy){
            celdad.innerHTML="0";
            celdam.innerHTML="<div class='btn btn-warning btn-circle'><i class='fa fa-remove'></i></div>  "+contact_us;
          }
          if(mimes<=meshoy && midia<diahoy && mianio<=aniohoy){
            celdam.innerHTML="<div class='btn btn-danger btn-circle'><i class='fa fa-remove'></i></div>  "+not_available;
          }
          if(mianio>aniohoy){
            celdam.innerHTML="<div class='btn btn-warning btn-circle'><i class='fa fa-remove'></i></div>  "+pre_book;
          }
        }
        midia=midia+1;
        diames.setDate(midia);
      }
    }
}
function mesantes(){
    nuevomes=new Date()
    primermes--;
    nuevomes.setTime(primermes)
    mescal=nuevomes.getMonth()
    aniocal=nuevomes.getFullYear()
    seguir()
    cabecera()
    escribirdias()
}
function mesdespues(){
    nuevomes=new Date()
    tiempounix=primermes.getTime()
    tiempounix=tiempounix+(45*24*60*60*1000)
    nuevomes.setTime(tiempounix)
    mescal=nuevomes.getMonth()
    aniocal=nuevomes.getFullYear()
    cabecera()
    seguir()
    escribirdias()
}
function seguir(){
  document.buscar.buscarmes.value=mescal;
  document.buscar.buscaanio.value=aniocal;
}
function vistap(){
  document.getElementById("mes").options.length = 0;
  $("#fila0 th").remove();
  idiomaa = document.calendar.idioma.value;
  var csrftoken = Cookies.get('csrftoken');
  $.ajax({
    url: encodeURI(base_url + "accounts/cal/cargar/idiomas/"+idiomaa),
    type: 'POST',
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        },
        data: {  },
        contentType: 'application/x-www-form-urlencoded',
        success: function (data) {
          mes1=data.mes1
          mes2=data.mes2
          mes3=data.mes3
          mes4=data.mes4
          mes5=data.mes5
          mes6=data.mes6
          mes7=data.mes7
          mes8=data.mes8
          mes9=data.mes9
          mes10=data.mes10
          mes11=data.mes11
          mes12=data.mes12
          dia1=data.dia1
          dia2=data.dia2
          dia3=data.dia3
          dia4=data.dia4
          dia5=data.dia5
          dia6=data.dia6
          dia7=data.dia7
         },
        error: function () { },
  }).done(function(){
          var elemento = "<option value='0'>"+mes1+"</option>";
          elemento = elemento + "<option value='1'>"+mes2+"</option>";
          elemento = elemento + "<option value='2'>"+mes3+"</option>";
          elemento = elemento + "<option value='3'>"+mes4+"</option>";
          elemento = elemento + "<option value='4'>"+mes5+"</option>";
          elemento = elemento + "<option value='5'>"+mes6+"</option>";
          elemento = elemento + "<option value='6'>"+mes7+"</option>";
          elemento = elemento + "<option value='7'>"+mes8+"</option>";
          elemento = elemento + "<option value='8'>"+mes9+"</option>";
          elemento = elemento + "<option value='9'>"+mes10+"</option>";
          elemento = elemento + "<option value='10'>"+mes11+"</option>";
          elemento = elemento + "<option value='11'>"+mes12+"</option>";
          $("#mes").append(elemento);
          var elemento1 = "<th>"+dia1+"</th><th>"+dia2+"</th><th>"+dia3+"</th>";
          elemento1 = elemento1 + "<th>"+dia4+"</th><th>"+dia5+"</th><th>"+dia6+"</th><th>"+dia7+"</th>";
          $("#fila0").append(elemento1);
      });
  colortexto=document.calendar.color_texto_dias.value;
  colorfondo=document.calendar.color_fondo_general.value;
  colordias=document.calendar.color_fondo_dias.value;
  contact_us=document.calendar.nombre_contact_us.value;
  book=document.calendar.nombre_book.value;
  pre_book=document.calendar.nombre_pre_book.value;
  not_available=document.calendar.nombre_not_available.value;
  $("#calendario").css("background-color",colorfondo);
  $("#diasc th").css("color",colortexto);
  $("#titulos").css("background-color",document.calendar.color_fondo_mes.value);
  $("#titulos, #anterior, #posterior").css("color",document.calendar.color_texto_mes.value);

  seguir()
  cabecera()
  escribirdias()
}
function mifecha(){
  mescal=document.buscar.buscarmes.value;
  aniocal=document.buscar.buscaanio.value;
  cabecera()
  escribirdias()
}
