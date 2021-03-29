const inputs = {
    email : document.querySelector('input[name=email]'),
    nickname : document.querySelector('input[name=nickname]'),
    password : document.querySelector('input[name=password]'),
    password_ck : document.querySelector('input[name=password_ck]'),
	phone : document.querySelector('input[name=phone]'),
};

const erase = element => {
    element.parentNode.children[0].value = "";
    element.parentNode.children[1].style.display = "none";
    element.parentNode.children[0].focus();
    element.parentNode.children[2].innerHTML = "";
};

const showErase = element => {
    element.parentNode.children[2].innerHTML = '';
	
    if(element.value.length > 0)
		return element.parentNode.children[1].style.display = "block";
	
	return element.parentNode.children[1].style.display = "none";
};

const focus = ele => {
    ele.parentNode.style.border = '1px solid #74C69D';
};

const inputChk = element => {
    const $err = element.parentNode.children[2];
    $err.innerHTML = "";
	
    if(element === inputs.email){
        const reg = /^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{1,5}$/;
		
        if(!reg.test(element.value))
            return $err.innerHTML = "이메일을 잘못 입력했습니다.";
    };
	if(element === inputs.nickname){
        const reg = /^[가-힣|a-z|A-Z|0-9|\*]{2,12}$/;
		
        if(!reg.test(element.value))
            return $err.innerHTML = "닉네임을 잘못 입력했습니다.";
    };
	if(element === inputs.password){
        const reg = /(?=.*[a-zA-Z]+)(?=.*[0-9]+)(?=.*[`~!@@#$%^&*|₩₩₩'₩";:₩/?]+).{8,20}/;
		
        if(!reg.test(element.value))
			return $err.innerHTML = "비밀번호는 대문자, 특수문자를 포함하여 8자 이상 입력해야 합니다.";
    };
	if(element == inputs.password_ck){
        if(inputs.password.value !== inputs.password_ck.value)
			return $err.innerHTML = "비밀번호가 일치하지 않습니다.";
    };
	if(element === inputs.phone){
		const reg = /^.(?=^.{8,15}$)(?=.\d)(?=.[a-zA-Z])(?=.[!@#$%^&+=]).*$/;
		
		if(!reg.test(element.value))
        	return $err.innerHTML = "전화번호를 잘못 입력했습니다. - 없이 입력해주세요.";
	}
	
    element.parentNode.style.border = "1px solid #ddd";
	return $err.innerHTML = "";
};

window.onload = () => {
    inputs.email.addEventListener('input', () => showErase(inputs.email))
    inputs.nickname.addEventListener('input', () => showErase(inputs.nickname))
    inputs.password.addEventListener('input', () => showErase(inputs.password))
    inputs.password_ck.addEventListener('input', () => showErase(inputs.password_ck))
	inputs.phone.addEventListener('input', () => showErase(inputs.phone))
    
    inputs.email.addEventListener('focusout', () => inputChk(inputs.email))
    inputs.nickname.addEventListener('focusout', () => inputChk(inputs.nickname))
    inputs.password.addEventListener('focusout', () => inputChk(inputs.password))
    inputs.password_ck.addEventListener('focusout', () => inputChk(inputs.password_ck))
	inputs.phone.addEventListener('focusout', () => inputChk(inputs.phone))

    inputs.email.addEventListener('focus', () => focus(inputs.email))
    inputs.nickname.addEventListener('focus', () => focus(inputs.nickname))
    inputs.password.addEventListener('focus', () => focus(inputs.password))
    inputs.password_ck.addEventListener('focus', () => focus(inputs.password_ck))
    inputs.phone.addEventListener('focus', () => focus(inputs.phone))
};
