$(document).ready(

    function showndhide() {
        /*Inicio de la funcion del plugin de slider*/
        var Page = (function () {

            slicebox = $('#sb-slider').slicebox({
                    onReady: function () {
                        $('#nav-arrows').show();

                    },
                    /*en esta parte se han dado los ajustes al slider, el auto play, cada cuanto tiempo se pasaran las fotos, ajustes de los efectos*/
                    orientation: 'h',
                    cuboidsCount: 3,
                    autoplay: true,
                    interval: 4500,
                    fallbackFadeSpeed: 300
                }),

                init = function () {
                    initEvents();
                },
                initEvents = function () {

                    // add navigation events
                    $('#nav-arrows').children(':first').on('click', function () {

                        slicebox.next();
                        return false;

                    });

                    $('#nav-arrows').children(':last').on('click', function () {

                        slicebox.previous();
                        return false;

                    });

                };

            return {
                init: init
            };

        })();

        Page.init();
        /*fin de la parte del slider*/


        $("#titInf").click(
            /* Funcion para mostrar el contenedor derecho que tiene el apartado info personal */
            function showPers() {
                if ($(".dcha-p").is(":hidden") && $(".dcha-o").is(":hidden")) { /* Si info personal y opiniones estan ocultos */
                    $(".dcha-p").show(); /* Mostramos sin mas info personal */
                } else {
                    if ($(".dcha-o").is(":visible")) { /* Si opiniones esta visible (display: block) */
                        $(".dcha-o").removeClass("animated fadeInRight faster"); /* Eliminamos la animación  */
                        /* Y añadimos una nueva animación que se ejecutará en el momento, y cuando termine (one.()), se ejecutará la función que ocultara el div */
                        $(".dcha-o").addClass("animated fadeOutRight faster").one("animationEnd oAnimationEnd mozAnimationEnd webkitAnimationEnd", function () {
                            $(this).hide();
                            $(".dcha-p").show();
                            $(this).removeClass(" fadeOutRight faster");
                            $(this).addClass(" fadeInRight faster");
                        });
                    }
                }
                /* Además se rellenará los campos del formulario para el apartado de informacion personal, recogiendo el valor de las cookies */
                $("#fname").val(getCookie("UsNombre"));
                $("#fsurname").val(getCookie("UsApell"));
                $("#femail").val(getCookie("UsEmail"));
                $("#faddress").val(getCookie("UsAdd"));
                $("#fnacimiento").val(getCookie("UsBorn"));
            }
        );

        $("#titOpi").click(
            /* Funcion para mostrar el contenedor derecho que tiene el apartado ultimas opiniones */
            function showOpis() {
                if ($(".dcha-p").is(":hidden") && $(".dcha-o").is(":hidden")) { /* Si info personal y opiniones estan ocultos */
                    $(".dcha-o").show(); /* Mostramos sin mas las opiniones */
                } else {
                    if ($(".dcha-p").is(":visible")) { /* Si info personal esta visible (display: block) */
                        $(".dcha-p").removeClass("animated fadeInRight faster"); /* Eliminamos la animación  */
                        /* Y añadimos una nueva animación que se ejecutará en el momento, y cuando termine (one.()), se ejecutará la función que ocultará el div */
                        $(".dcha-p").addClass("animated fadeOutRight faster").one("animationEnd oAnimationEnd mozAnimationEnd webkitAnimationEnd", function () {
                            $(this).hide();
                            $(".dcha-o").show();
                            $(this).removeClass(" fadeOutRight faster");
                            $(this).addClass(" fadeInRight faster");
                        });
                    }
                }
            }
        );

        $("#logoImg, #homeTag").click(
            /* Funcion que oculta todo el contenido situado en la parte derecha 
             del html clickando en el boton de inicio (homeTag) y que hace en funcion de si has iniciado sesion o no, el logo te lleva al inicio de la web o nuevamente oculta la parte derecha del html */
            function hideAll(event) {
                if (event.target == $('#logoImg')[0]) {
                    if ($("#homeTag").attr("class") == "actual") {
                        $(".dcha-p").hide();
                        $(".dcha-o").hide();
                    } else {
                        $("#registrar").hide();
                        $("#iniciar").hide();
                        $("#mainpage").show();
                        $("#register").removeAttr("class");
                        $("#login").removeAttr("class");
                    }
                }
                if (event.target == $('#homeTag')[0]) {
                    $(".dcha-p").hide();
                    $(".dcha-o").hide();
                }
            }
        );

        $("#addTag").click(
            /* Funcion que añade una nueva preferencia, si la anterior no fue modificada no se añade */
            function moreTag() {
                if (!$("#campo").length) {
                    var preff = $("#plantPref").clone().removeAttr("id");
                    preff.children().children()[0].readOnly = false;
                    preff.children().children()[0].id = "campo";
                    preff.children().children()[1].id = "botonPref";
                    preff.appendTo("#prefsCh").show();

                }
            }
        );

        $("#primHot, #scndHot, #thrdHot").click(
            /* Función que mostrará los popups de los hoteles mas recientes */
            function showPopUps() {
                if ($(this).attr("id") == "primHot") { /* Se muestra en el popup el hotel más reciente de la lista */
                    $("#infoH1").show();
                }
                if ($(this).attr("id") == "scndHot") { /* Se muestra en el popup el segundo hotel más reciente de la lista */
                    $("#infoH2").show();
                }
                if ($(this).attr("id") == "thrdHot") { /* Se muestra en el popup el tercer hotel más reciente de la lista */
                    $("#infoH3").show();
                }
                $("#hnameMod").text($(this).text()); /* Se cambia el nombre del hotel en el popup segun en cual hayamos clickado */
                $("#hotel1").show(); /* Se muestra el modal completo */
            }
        );

        $(".cerrarMod").click(
            /* Funcion lanzada al pulsar en la X del popup */
            function () {
                $(".popupCont").removeClass("animated fadeIn faster"); /* Eliminamos la animación  */
                /* Y añadimos una nueva animación que se ejecutará en el momento, y cuando termine (one.()), se ejecutará la función que ocultará el popUp */
                $(".popupCont").addClass("animated fadeOut faster").one("animationEnd oAnimationEnd mozAnimationEnd webkitAnimationEnd", function () {
                    $("#infoH1").hide();
                    $("#infoH2").hide();
                    $("#infoH3").hide();
                    $('#hotel1').hide();
                    $(this).removeClass(" fadeOut faster");
                    $(this).addClass(" fadeIn faster");
                });
            }
        );

        $("#logout").click(
            /* Función que cerrará la sesión */
            function cerrarSesion() {
                $(".cont").hide(); /* Ocultará el contenido de la pagina */
                $(".dcha-p").hide();
                $(".dcha-o").hide();
                /* Cambiará las opciones de la cabecera */
                $("#homeTag").removeAttr("class");
                $(".hlinks").hide();
                $(".login").show();
                setTimeout(function () {
                    alert("Se ha cerrado la sesion");
                }, 20);
                $("#mainpage").show(); /* Y mostrará el div que contiene el inicio de la pagina, buscador y slider */
            }
        );

        $("#login").click(
            /* Funcion usada cuando se selecciona Iniciar sesion en la cabecera */
            function () {
                /* Se cambia el color azul que caracteriza en que apartado de la web se está */
                $("#register").removeAttr("class");
                $("#login").addClass("actual");
                /* Y se muestra el inicio de el main de la pagina(buscador y imagenes) */
                $("#iniciar").show();
                $("#mainpage").hide();
                $("#registrar").hide();
            }
        );

        $("#register").click(
            /* Funcion usada cuando se selecciona Registrarse en la cabecera */
            function () {
                /* Se cambia el color azul que caracteriza en que apratado de la web se está */
                $("#login").removeAttr("class");
                $("#register").addClass("actual");
                /* Y se muestra el form. de registro, ocultando el form. de inicio de sesión */
                $("#iniciar").hide();
                $("#mainpage").hide();
                $("#registrar").show();
            }
        );

        $("#newUs").click(
            /* Funcion que maneja el registro de un nuevo usuario al pulsar el boton aceptar de este*/
            function () {
                if ($("#UsEmail").val() == getCookie("UsEmail") && $("#UsEmail").val() != "") { /* Comprobamos si el correo usado (en la cookie) ya existe y si el campo no esta vacio*/
                    alert("El correo introducido ya esta registrado");
                } else { /* Si no existe se registran en la cookie todos los datos proporcionados, haciendo primero un control para comprobar que ningun campo esta vacio, en el caso de las contraseñas que tienen las dimensiones requeridas*/
                    if (!($("#UserN").val() == "" || $("#UsPass").val().length < 4 || $("#UsPass").val().length > 8 || $("#UsNombre").val() == "" ||
                            $("#UsApell").val() == "" || $("#UsEmail").val() == "" || $("#UsBorn").val() == "" || $("#UsAdd").val() == "" ||
                            !$("#UsCond").prop('checked'))) {
                        $("#newUs").prop("type", "submit");
                        setCookie("UserN", $("#UserN").val());
                        setCookie("UsPass", $("#UsPass").val());
                        setCookie("UsNombre", $("#UsNombre").val());
                        setCookie("UsApell", $("#UsApell").val());
                        setCookie("UsEmail", $("#UsEmail").val());
                        setCookie("UsBorn", $("#UsBorn").val());
                        setCookie("UsProf", $("#UsProf").val());
                        setCookie("UsAdd", $("#UsAdd").val());
                    } else {
                        alert("Tienes que rellenar los campos");
                    }
                }
            }
        );

        $("#enterPage").click(
            /* Funcion que maneja el inicio de sesión de un usuario al pulsar el boton aceptar de este*/
            function () {
                /* Cogemos los valores clave del form. */
                var usEnter = $("#email").val();
                var passEnter = $("#contraseña").val();
                /* Cogemos los valores clave de las cookies */
                var usReg = getCookie("UsEmail");
                var passReg = getCookie("UsPass");
                /* Y las comparamos y vemos si los campos no estan vacios (ya que el boton es un button y no un submit) */
                if (usEnter == usReg && passEnter == passReg && usEnter != "" && passEnter != "") {
                    /* Ocultamos el inicio de sesión y la cabecera correspondiente y mostramos el contenido de la web */
                    $("#iniciar").hide();
                    $(".cont").show();
                    $(".hlinks").show();
                    $("#login").removeAttr("class");
                    $("#homeTag").addClass("actual");
                    $(".login").hide();
                    /* Además cambiamos el nombre del usuario y la foto de perfil */
                    $("#NombreUser").text(getCookie("UserN"));
                    if (getCookie("UsProf") == "") { /* Comprobamos si se ha subido una imagen en el registro */
                        $("#fotoPerfil").attr("src", "images/defProf.png"); /* Ponemos una por defecto */
                    } else {
                        var foto = getCookie("UsProf").split('\\').pop();
                        $("#fotoPerfil").attr("src", "images/" + foto);
                    }
                } else { /* En caso de que no se cumpla mandamos un alert */
                    alert("Los datos introducidos no son correctos");
                }
            }
        );

        $("#changeUs").click(
            /* Funcion que maneja el cambio de datos (en las cookies) cuando se modifican en el apartado info. personal*/
            function () {
                /* Se comprueba que ninguno de los campos esté vacio */
                if ($("#fname").val() == "" || $("#fsurname").val() == "" || $("#femail").val() == "" ||
                    $("#fnacimiento").val() == "" || $("#faddress").val() == "") {
                    alert("Error, no se pueden dejar campos vacíos"); /* Avisamos al usuario */
                    /* Y volvemos a rellenar los huecos del form. */
                    $("#fname").val(getCookie("UsNombre"));
                    $("#fsurname").val(getCookie("UsApell"));
                    $("#femail").val(getCookie("UsEmail"));
                    $("#faddress").val(getCookie("UsAdd"));
                    $("#fnacimiento").val(getCookie("UsBorn"));
                } else {
                    /* En caso de que todos esten llenos, sustituimos la info de las cookies */
                    setCookie("UsNombre", $("#fname").val());
                    setCookie("UsApell", $("#fsurname").val());
                    setCookie("UsEmail", $("#femail").val());
                    setCookie("UsBorn", $("#fnacimiento").val());
                    setCookie("UsAdd", $("#faddress").val());
                }
            }
        );
    }
);


$(window).click(
    /* Cuando pulsas fuera del popup, este se cerrará y se ocultará todo el modal */
    function (event) {
        if (event.target == $('#hotel1')[0]) {
            $(".popupCont").removeClass("animated fadeIn faster"); /* Eliminamos la animación  */
            /* Y añadimos una nueva animación que se ejecutará en el momento, y cuando termine (one.()), se ejecutará la función que ocultará el popUp */
            $(".popupCont").addClass("animated fadeOut faster").one("animationEnd oAnimationEnd mozAnimationEnd webkitAnimationEnd", function () {
                $("#infoH1").hide();
                $("#infoH2").hide();
                $("#infoH3").hide();
                $('#hotel1').hide();
                $(this).removeClass(" fadeOut faster");
                $(this).addClass(" fadeIn faster");
            });
        }
    }
);

/* esta funcion, especifica que cuando se pulsa la X situada a la derecha de una preferencia
esta se elimine */
$(document).on("click", ".elimTag",
    function quitarTag() {
        $(this).parent().removeClass("animated fadeIn fast"); /* Eliminamos la animación de creación */
        /* Y añadimos una nueva animación que se ejecutará en el momento, y cuando termine (one.()), se ejecutará la función que eliminará la preferencia */
        $(this).parent().addClass("animated hinge faster").one("animationEnd oAnimationEnd mozAnimationEnd webkitAnimationEnd", function () {
            $(this).remove();
        });

    }
);

/* esta funcion se activa cuando se pulsa la tecla enter en el formulario, si este esta vacio
te dice que insertes algo en el campo, cuando añades algo se elimina el campo input y se deja
 el texto dentro del formulario */
$(document).on("click", "#botonPref",
    function aceptar() {
        if ($("#campo").val() != "") {
            $("#botonPref").remove();
            var txt = $("#campo").val();
            $("#campo").parent().prepend(txt);
            $("#campo").remove();
        }
    }
);

/* Las funciones siguientes serán las utilizadas, para buscar cookies, obtenerlas y comprobar
su existencia */

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";" + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
