const inputValidateCheck = target => {
	const $err = target.parentNode.children[2];
    $err.innerHTML = "";

    if(target.name === "email") {
        const reg = /^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{1,5}$/;
        
        if (!reg.test(target.value)) {
            return $err.innerHTML = "이메일을 잘못 입력했습니다.";
        };
    };
    if(target.name === "nickname") {
        const reg = /^[가-힣|a-z|A-Z|0-9|\*]{2,12}$/;

        if(!reg.test(target.value)) {
            return $err.innerHTML = "닉네임을 잘못 입력했습니다.";
        };
    };
    if(target.name === "password") {
        const reg = /(?=.*[a-zA-Z]+)(?=.*[0-9]+).{8,20}/;

        if (!reg.test(target.value)) {
            return $err.innerHTML = "비밀번호는 대문자 포함하여 8자 이상 입력해야 합니다.";
        };
    };
    if(target.name === "password_ck") {
        if(document.forms[0].password.value !== target.value) {
            return $err.innerHTML = "비밀번호를 일치하지 않습니다.";
        };
    };

    return true;
};

window.onload = _ => {
	const $inputs = [...document.querySelectorAll("form > div > input")];
	
    document.forms[0].addEventListener("submit", event => {
        event.preventDefault();

        if(inputValidateCheck) event.target.submit();
    });
    $inputs.forEach(item => {
        item.addEventListener("focus", ({ target }) => {
            target.parentNode.style.border = "1px solid black";
        });
    });
    $inputs.forEach(item => {
        item.addEventListener("focusout", ({ target }) => {
            inputValidateCheck(target);

            target.parentNode.style.border = "#ddd";
        });
    });
};