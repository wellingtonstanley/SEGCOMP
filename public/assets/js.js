$(document).ready(function(){
    var socket = io.connect("http://localhost:3000");
    var ready = false;
    var qnt_msg = 0;

    $("#submit").submit(function(e) {
        e.preventDefault();
        $("#nick").fadeOut();
        $("#chat").removeAttr('hidden');
        var name = $("#nickname").val();
        var time = new Date();
        $("#name").html('Sr.(a) <b>'+name+'</b>');
        $("#time").html('Connected since: ' + time.getHours() + ':' + time.getMinutes());

        ready = true;
        qnt_msg++;
        socket.emit("join", name);
    });

    socket.on("update", function(msg) {
        if (ready) {
            $('.chat').append('<li class="info">' + msg + '</li>')
            qnt_msg++;
        }
    });

    $("#textarea").keypress(function(e){
        if(e.which == 13) {
             var text = $("#textarea").val();
             $("#textarea").val('');
             var time = new Date();
             $(".chat").append('<li class=""><div class="msg"><span><strong>Cliente '
                          + $("#nickname").val() + ' enviou às </span><i>'
                          + '<time>' + time.getHours() + ':' + time.getMinutes() + '</strong></time><br>'
                          + text + '</i></div></li>');
             if(qnt_msg > 1){
              $("#public_key").addClass('d-none');
              $("#message").removeClass('d-none');
             }
             socket.emit("send", text);
        }
    });

    $("#number_input").keypress(function(e){
        if(e.which == 13) {
             var text = $("#number_input").val();
             $("#number_input").val('');
             var time = new Date();
             $(".chat").append('<li class=""><div class="msg"><span><strong>Cliente '
                          + $("#nickname").val() + ' enviou às </span><i>'
                          + '<time>' + time.getHours() + ':' + time.getMinutes() + '</strong></time><br>'
                          + text + '</i></div></li>');
             if(qnt_msg > 1){
              $("#public_key").addClass('d-none');
              $("#message").removeClass('d-none');
             }
             socket.emit("send", text);
        }
    });

    /*socket.on("chat", function(client,msg) {
     if (ready) {
        var time = new Date();
        $(".chat").append('<li class="other"><div class="msg"><span>' +
                     client + ':</span><p>' + msg + '</p><time>' + time.getHours() + ':' +
                     time.getMinutes() + '</time></div></li>');
     }
   });*/
});
