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