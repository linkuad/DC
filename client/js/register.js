window.onload =_=>{
    inputs.email.addEventListener('input', () => showErase(inputs.email))
    //inputs.email.addEventListener('focusout', () => inputChk(inputs.email))
    inputs.nickname.addEventListener('input', () => showErase(inputs.nickname))
    inputs.password.addEventListener('input', () => showErase(inputs.password))
    inputs.password_ck.addEventListener('input', () => showErase(inputs.password_ck))
}


const inputs = {
    email : document.querySelector('input[name=email]'),
    nickname : document.querySelector('input[name=nickname]'),
    password : document.querySelector('input[name=password]'),
    password_ck : document.querySelector('input[name=password_ck]'),
}

const erase = ele =>{
    ele.parentNode.children[0].value = '';
    ele.parentNode.children[1].style.display = 'none';
    ele.parentNode.children[0].focus();
}

function showErase(ele) {
    if(ele.value.length > 0){
        ele.parentNode.children[1].style.display = 'block';
    }else{
        ele.parentNode.children[1].style.display = 'none';
    }
}

function inputChk(ele){
    ele.parentNode.children[2].innerHTML = 'ㅇㅇ'
}
