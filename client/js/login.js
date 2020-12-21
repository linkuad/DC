const inputs = {
    email : document.querySelector('input[name=email]'),
    password : document.querySelector('input[name=password]'),
};

const erase = element => {
    element.parentNode.children[0].value = "";
    element.parentNode.children[1].style.display = "none";
    element.parentNode.children[0].focus();
    element.parentNode.children[2].innerHTML = "";
};

const showErase = element => {
    element.parentNode.children[2].innerHTML = "";
	
    if(element.value.length > 0)
		return element.parentNode.children[1].style.display = "block";
	
	return element.parentNode.children[1].style.display = "none";
};

const focus = element => {
    element.parentNode.style.border = "1px solid #74C69D";
};

const inputCheck = element => {
    const $err = element.parentNode.children[2];
    $err.innerHTML = '';
	
    if(element == inputs.email){
        const reg = /^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{1,5}$/;
		
        if(!reg.test(element.value)) return $err.innerHTML = '이메일을 잘못 입력했습니다.'
    };
	
	if(element == inputs.password){
        const reg = /(?=.*[a-zA-Z]+)(?=.*[0-9]+)(?=.*[`~!@@#$%^&*|₩₩₩'₩";:₩/?]+).{8,20}/;
		
        if(!reg.test(element.value))
            return $err.innerHTML = "비밀번호는 대문자, 특수문자를 포함하여 8자 이상 입력해야 합니다."
    };
	
    element.parentNode.style.border = "1px solid #ddd";
	return $err.innerHTML = "";
};

window.onload = () => {
    inputs.email.addEventListener('input', () => showErase(inputs.email))
    inputs.password.addEventListener('input', () => showErase(inputs.password))
    
    inputs.email.addEventListener('focusout', () => inputCheck(inputs.email))
    inputs.password.addEventListener('focusout', () => inputCheck(inputs.password))

    inputs.email.addEventListener('focus', () => focus(inputs.email))
    inputs.password.addEventListener('focus', () => focus(inputs.password))
};