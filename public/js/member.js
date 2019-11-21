function join() {
	// id 중복검사
	$('#j_id').keyup(function(e){
		var j_id = $("#j_id").val();

		$.ajax({
			url: "/member/join/check",
			data: {id: j_id}, 
			success: function(result){
				if(j_id == "") {
					$("#idCheck").text("[ID입력]").css("color", "black");
				} else if(result == "NO") {
					$("#idCheck").text("[ID중복]").css("color", "red");
				} else {
					$("#idCheck").text("[사용가능]").css("color", "green");
				}
			}
		});
	});
	
	// 회원가입 하기
	$('#j_submit').click(function(){
		var j_id = $("#j_id").val();
		var j_pw = $("#j_pw").val();
		
		$.ajax({
			url: "/member/join/do",
			data: {id: j_id, pw: j_pw}, 
			success: function(result){
				$("#j_id").val("");
				$("#j_pw").val("");

				if(result != "OK") {
					alert("회원가입 실패 ㅜㅠ");
				} else {
					alert(j_id + "님 회원가입 되셨어용!!");
					location.href = "#loginPage";
				}
				
			}
		});
	});
}

 /*************************************************************************** */
 /*
function login() {
	$("#l_Submit").click(function(){
		alert("fffsfs");
		var l_id = $("#l_id").val();
		var l_pw = $("#l_pw").val();
		
		
		$.ajax({
			url: "/member/login/do",
			type: "POST",
			data: {wst_id: l_id, wst_password: l_pw},
			success: function(result){
				
				$("#l_id").val("");
				$("#l_pw").val("");

				if(result != "OK") {
					alert("로그인 실패 ㅜㅠ");
				}
				
			}
		});
	});
}
*/

function logout() {
	$("#logout").click(function(){
		var ok = confirm("로그아웃 하시겠습니까?");

		if(ok) {
			location.href = "/member/logout";
		}
	});
}