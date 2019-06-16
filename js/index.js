var users;
function getUsers(){
	fetch('https://jsonplaceholder.typicode.com/users')
	  .then(response => response.json())
	  .then(json => saveUsers(json))
}
function getUserPosts(uId){
	fetch('https://jsonplaceholder.typicode.com/posts?userId='+uId)
	  .then(response => response.json())
	  .then(json => setHist(json))
}
function getUserComments(uId){
        fetch('https://jsonplaceholder.typicode.com/comments?postId='+uId)
          .then(response => response.json())
          .then(json => setComm(json))
}
function saveUsers(data){
	var Selection = document.getElementById("USR_FIELD");
	//prepare first line
	Selection.innerHTML+="<option value=\"0\">Select a User</option>";
	users=data;
//	console.log(users);

	//get the users
	users.forEach(function(user){
//		console.log(user);
		Selection.innerHTML += '<option value=\"'+user.id+'\">'+user.username+'</option>';
	});
}

function setHist(data){
//	console.log("got data");
//	console.log(data);
	var tab = document.getElementById("HIS_FIELD");
	tab.innerHTML += "<div>";
	data.forEach(function(comment){
		tab.innerHTML += "<p>";
		tab.innerHTML += "-"+comment.title+"<br>";
		tab.innerHTML += ""+comment.body+"<br>";
		tab.innerHTML += "</p>";
		tab.innerHTML += "Comments:";
		tab.innerHTML += "<p id="+comment.id+">";
		tab.innerHTML += "</p>";
		getUserComments(comment.id);
	tab.innerHTML += "<br>";
	tab.innerHTML += "<br>";
	tab.innerHTML += "<br>";
	tab.innerHTML += "--------------------------------------------------------------------";
	});
	tab.innerHTML += "</div>";
}

function setComm(data){
	var filter = (email_address) => email_address.email.replace(/@.*./gi, '@----.---');
console.log(data);
	var filtered = data.map(filter);
//	console.log(filtered);
	data.forEach(function(comment,index){
//		console.log(comment);
//		console.log(index);
	var tab = document.getElementById(comment.postId);
//	tab.innerHTML += "<p>";
		tab.innerHTML += '|      \"'+ comment.name + '\"\(' + filtered[index]+'\)<br>';
		tab.innerHTML += '|      '+comment.body + '<br>';
//	tab.innerHTML += "</p>";
	});
//	console.log(data);
}

function getHist(uId){
	//reset history every time
	resetHist();

	//valid user selected
	if(uId){
//	console.log(uId);
		getUserPosts(uId);
	}
}
function resetHist(){
	document.getElementById("HIS_FIELD").innerHTML = "Post History:<br>";
	console.log("reset");
}
