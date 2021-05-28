const socket = io()

$('#loginBox').show()
$('#msgBox').hide()

$('#btnStart').click(() => {
    socket.emit('login', {
        username:$('#inpUsername').val(),
        password:$("#inpPassword").val()
    })
})

socket.on('logged_in',() => {
    $('#loginBox').hide()
    $('#msgBox').show()
})

socket.on('login_failed',() => {
    window.alert("Enter correct username and password")
})

$('#msgBtn').click(()=>{
    socket.emit('msg_send',{
        to: $('#toWhere').val(),
        msg: $('#msgText').val()
    })
})

socket.on('msg_rcvd',(data) => {
    $('#msgUl').append('<li>'+"["+data.from+"]: "+data.msg+'</li>')
})