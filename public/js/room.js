function createRoom() {
    
    // 수정필요
    $('#createRoomBtn').click(function(){
		var title = prompt("방 제목 ?", "");
		var password = prompt("비밀번호 ?", "");
		
		if(title != "") {
			//if(password == "") {
			//	password = "@";
			//}
			$.ajax({
				url: "/room/create",
				data: {title: title, pw: password}, 
				success: function(result){
	
					if(result == "OK") {
						alert("방 만들기 실패 ㅠ");
					} else {
						//location.href = "#loginPage";
						alert("방 만들기 성공");
					}
					
				}
			});
		}
	});
}

function roomCommunication() {
    var socket = io.connect('http://localhost:8005/chat', {
    	path: '/socket.io'
    });
    socket.on('join', function (data) {
    	var div = document.createElement('div');
        div.classList.add('system');
        var chat = document.createElement('div');
        div.textContent = data.chat;
        div.appendChild(chat);
        document.querySelector('#chat-list').appendChild(div);
    });
    socket.on('exit', function (data) {
        var div = document.createElement('div');
        div.classList.add('system');
        var chat = document.createElement('div');
        div.textContent = data.chat;
        div.appendChild(chat);
        document.querySelector('#chat-list').appendChild(div);
    });
    socket.on('chat', function (data) {
        var div = document.createElement('div');
        if (data.user === '#{user}') {
            div.classList.add('mine');
        } else {
            div.classList.add('other');
        }
        var name = document.createElement('div');
        name.textContent = data.user;
        div.appendChild(name);
        if (data.chat) {
            var chat = document.createElement('div');
            chat.textContent = data.chat;
            div.appendChild(chat);
        } else {
            var gif = document.createElement('img');
            gif.src = '/gif/' + data.gif;
            div.appendChild(gif);
        }
        div.style.color = data.user;
        document.querySelector('#chat-list').appendChild(div);
    });
    document.querySelector('#chat-form').addEventListener('submit', function (e) {
    e.preventDefault();
    /*
		if (e.target.chat.value) {
			var xhr = new XMLHttpRequest();
			xhr.onload = function () {
				if (xhr.status === 200) {
					e.target.chat.value = '';
				} else {
					console.error(xhr.responseText);
				}
			};
			xhr.open('POST', '/room/#{room._id}/chat');
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.send(JSON.stringify({ chat: this.chat.value }));
			}
    });
    document.querySelector('#gif').addEventListener('change', function (e) {
        var formData = new FormData();
        var xhr = new XMLHttpRequest();
        console.log(e.target.files);
        formData.append('gif', e.target.files[0]);
        xhr.onload = function () {
            if (xhr.status === 200) {
            	e.target.file = null;
            } else {
                console.error(xhr.responseText);
            }
        };
        xhr.open('POST', '/room/#{room._id}/gif');
        xhr.send(formData);
	*/
	});
    
}