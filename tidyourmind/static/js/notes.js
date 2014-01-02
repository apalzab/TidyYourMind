$(document).ready(function() {
    $('.display-options img:eq(0)').click(function() {
        
        $('.note').css('width','25%');
        $('.note').css('float','left');
        $('.note').css('margin','1em 0 1em 3.3em');
        $('.note').css('height','20em');
    });

    $('.display-options img:eq(1)').click(function() {
        
        $('.note').css('width','50%');
        $('.note').css('float','none');
        $('.note').css('margin','0 auto');
        $('.note').css('margin-top','2em');
        $('.note').css('height','24em');
    });

    $('.create_note .content').click(function() {
        $('.create_note').css("border", "1px solid #4D90FE");
        $(this).css("padding-top", "2em");
        $('.create_note .title').show();
    });


    $('.page-wrap').on('keydown click', function() {
        var elementClass = $(':focus').closest('section').attr('class');
        if (elementClass !== undefined) {
            elementClass.toString();
            if (elementClass == 'create_note')
                console.log('we are in create note');
        }
        else {
            console.log($('.create_note form'));
            var note = {
                title: $('.create_note form').find('.title').val().toString(),
                content: $('.create_note form').find('.content').val().toString(),
                color: 'none',
         };
         console.log(note);
            createNote(note);
            console.log('we are not in create note');
        }

    });

    $('.create_note form').submit(function() {
        var note = {
                title: $( this ).find('.title').val().toString(),
                content: $( this ).find('.content').val().toString(),
                color: 'none',
         };
        createNote(note);
        return false;
    });

    // $('.notes').delegate('.note form', 'submit', function() {
    //     console.log('updating note....');
    //     return false;
    // });

    $('.notes-wrapper .notes').delegate('.note', 'mouseenter', function() {
        $(this).find('.options').show({duration:200});
        $(this).closest('.note').css('border-left-color','#4D90FE');
        $(this).closest('.note').css('border-left-width','.15em');
    });

    $('.notes-wrapper .notes').delegate('.note', 'mouseleave', function() {
        $(this).find('.options').hide();
        $(this).closest('.note').css('border-left-width','0em');
    });

    $('.notes').delegate('.note .options .trash', 'click', function() {
        console.log('trash clicked');
        deleteNote($( this ).closest('.note').data('resource'), $( this ).closest('.note'));
    });

    $('.notes').delegate('.note .options .btn-update', 'click', function() {
        console.log('update clicked');
         var note = {
                title: $( this ).closest('.note').find('.title').val().toString(),
                content: $( this ).closest('.note').find('.content').val().toString(),
                color: $( this ).closest('.note').css('border-top-color').toString(),
         };
        updateNote($( this ).closest('.note').data('resource'), note);
        return false;
    });

    $('.notes').delegate('#brush', 'click', function() {
        $( this ).next().simplecolorpicker();
    });

    $('.notes').delegate('.options .simplecolorpicker span', 'click', function() {
        var color = $(this).css('background-color');
        color = hexc(color);
        $( this ).closest('.note').css('border-top-color', color);
        $( this ).parent().prev().simplecolorpicker('destroy');
        $('.colorpicker').css('display','none');
    });



    function createNote(note) {
         console.log("in create note");
         console.log("title:" + $('.create_note form').find('.title').val());
         if ($('.create_note form').find('.title').val() != "" || $('.create_note form').find('.content').val() != "")
             $.ajax({
                    url: '/api/v1/notes/',
                    type: 'post',
                    data: JSON.stringify(note),
                    contentType: 'application/json',
                    async: false,
                    beforeSend: function(xhr, settings) {
                        if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
                            // Send the token to same-origin, relative URLs only.
                            // Send the token only if the method warrants CSRF protection
                            // Using the CSRFToken value acquired earlier
                            xhr.setRequestHeader("X-CSRFToken", csrftoken);
                        }
                    },
                    success: function (data, textStatus, jqXHR) {
                        $("#noteTemplate").tmpl(data).appendTo(".notes-wrapper .notes");
                        clearCreateNote();
                    }
                });
        $('.create_note').css("border", "none");
        // $('.create_note .title').hide();
        // $('.create_note .content').css("padding-top", "0em");
    }

    function updateNote (resourceURL, note) {
        $.ajax({
                url: resourceURL,
                type: 'PUT',
                data: JSON.stringify(note),
                contentType: 'application/json',
                async: false,
                beforeSend: function(xhr, settings) {
                    if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
                        // Send the token to same-origin, relative URLs only.
                        // Send the token only if the method warrants CSRF protection
                        // Using the CSRFToken value acquired earlier
                        xhr.setRequestHeader("X-CSRFToken", csrftoken);
                    }
                },
                success: function (data, textStatus, jqXHR) {
                    console.log(data);
                    
                }
            });
    }

    function deleteNote (resource, note_form) {
        $.ajax({
                url: resource,
                type: 'DELETE',
                beforeSend: function(xhr, settings) {
                    if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
                        // Send the token to same-origin, relative URLs only.
                        // Send the token only if the method warrants CSRF protection
                        // Using the CSRFToken value acquired earlier
                        xhr.setRequestHeader("X-CSRFToken", csrftoken);
                    }
                },
                success: function (data) {
                    console.log('note deleted');
                    note_form.hide('slow', function() {
                        note_form.remove();
                    });
                    
                }
            });
    }

    function clearCreateNote()  {
        $('.create_note .title').val('');
        $('.create_note .content').val('');
    }

    // $('.create_note').on('keydown', function(e) {
    //     var now = $(this).attr('class');
    //      var keyCode = e.keyCode || e.which;
    //      if (keyCode == 9) {
    //         console.log('keycode = 9');
    //         var input = $(this).find(':focus');
    //         isInCreateNote(now);
    //             // if (input.length > 0)
    //             //     console.log('We are in the create note');
    //         }
    // });






    // $('.create_note input').focusout(function(e) {
    //     console.log('focusout');
    //     console.log(e.target);
        
    //     // console.log($(this).closest('section').attr('class'));
    //     // if ($(this).closest('section').attr('class') == 'create_note')
    //     //     console.log('we are in create_note');
    //     // else console.log('we are not in create_note');

    //     //isInCreateNote();
    // });

    // $('.create_note input').live('focusout', function() {
    //     console.log($('.create_note').find(':active').length);

    // });




    function isInCreateNote(now) {
        if (now !== undefined) {
            console.log(now + "i'm increatenote function");
        }
            
        else {
            if ($('.create_note').find(':active').length > 0 || $('.create_note').find(':active').length > 0)
                console.log('we   in the create note');
            else {
                console.log('OUTSIDE');
             
            }
        }
        // if ($('.create_note').find(':active').length > 0 || $('.create_note').find(':focus').length > 0)
        //     console.log('we are in the create note');
        // else {

        //     console.log('OUTSIDE');
        //     console.log($('.create_note input').find(':focus'));
        // }



        // if (element) {
        //     console.log(element.length);
        //     if (element.length > 0) {
        //          console.log('We are in the create note');
        //     }
                   
        // }
               
        // else {
        //     if ( $('.create_note .title input').is(':active') || $('.create_note .content input').is(':active')      ) {
        //     console.log('something is focused');
        //     }
        //     else{
        //         // $('.create_note form').submit();
        //         // $('.create_note .title').hide();
        //         // $('.create_note .content').css("padding-top", "0em");
        //         console.log('OUTSIDE!!!');
        //     }
        // }

        // console.log($('.create_note .title input').is(':focus'));

        
    }

    function hexc(colorval) {
        var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        delete(parts[0]);
        for (var i = 1; i <= 3; ++i) {
            parts[i] = parseInt(parts[i]).toString(16);
            if (parts[i].length == 1) parts[i] = '0' + parts[i];
        }
        color = '#' + parts.join('');

        return color;
    }




    // using jQuery
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');


    function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    function sameOrigin(url) {
    // test that a given url is a same-origin URL
    // url could be relative or scheme relative or absolute
    var host = document.location.host; // host + port
    var protocol = document.location.protocol;
    var sr_origin = '//' + host;
    var origin = protocol + sr_origin;
    // Allow absolute or scheme relative URLs to same origin
    return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
        (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
        // or any other URL that isn't scheme relative or absolute i.e relative.
        !(/^(\/\/|http:|https:).*/.test(url));
}



    });