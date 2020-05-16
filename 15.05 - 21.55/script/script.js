var $ = (id) => {return document.getElementById(id)}
function message(text) {
    let br = document.createElement('br')
    $('result').append(text);
    $('result').appendChild(br)
}

window.onload = () => {

    var socket = new WebSocket("ws://user-ks-7.hldns.ru:30434/chat/server.php");

    socket.onopen = function() {
        message("Соединение установлено");
    };

    socket.onerror = function(error) {
        message("Ошибка при соединении" + (error.message ? error.message : "") + " ");
    }

    socket.onclose = function() {
        message("Соединение закрыто ");
    }

    socket.onmessage = function(event) {
        var data = JSON.parse(event.data);
        console.log(`Тип сообщения ${data.type}, Содержание ${data.message}`)
        message(data.message);
        // message(data.type + " - " + data.message);
    }

    $("chat").addEventListener('submit',function() {

        var message = {
            chat_message:$("chat-message").value,
            chat_user:$("chat-user").value,
        };

        $('chat-user').setAttribute('type','hidden')

        socket.send(JSON.stringify(message));

        return false;
    });
};