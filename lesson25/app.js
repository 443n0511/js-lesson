const checkBox = document.getElementById('js-check');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('js-modalContent');

const modalButton = document.getElementById('js-modalButton');
const closeButton = document.getElementById('js-closeButton');
const agreeButton = document.getElementById('js-agreeButton');
const submitButton = document.getElementById('js-submitButton');
submitButton.disabled = true;

const p = document.createElement("p");
let errorMsg = "";

const flugs = {
    name: false,
    email: false,
    check: false,
    password: false
};


function openModal() {
    modal.style.display = 'block';
}
function closeModal() {
    modal.style.display = 'none';
}

modalButton.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);


modalContent.onscroll = function () {
    const offsetHeight = this.offsetHeight;
    const scrollHeight = this.scrollHeight;
    const scrollTop = this.scrollTop;
    const scrollPosition = offsetHeight + scrollTop;
    const proximity = 0;

    if ((scrollHeight - scrollPosition) / scrollHeight <= proximity) {
        agreeButton.disabled = false;
        agreeButton.addEventListener('click', () => {
            checkBox.disabled = false;
            checkBox.checked = true;
            closeModal();
            flugs.check = true;
            checkFlags();
        });
    }
};

function createErrorMessage() {
    p.textContent = errorMsg;
    p.classList.add("error-message");
}

function clearErrorMessage() {
    errorMsg = "";
    p.textContent = errorMsg;
}


function handleNameChanges() {
    const maxCharacters = 15;
    if (this.value.length > maxCharacters) {
        errorMsg = "※ユーザー名は15文字以下にしてください。";
        createErrorMessage();
        this.after(p);
        flugs.name = false;
    } else {
        clearErrorMessage();
        flugs.name = true;
    }
    checkFlags();
}

function handleEMailChanges() {
    const emailValidation = /.+@.+\..+/;
    if (emailValidation.test(this.value)) {
        clearErrorMessage();
        flugs.email = true;
    } else {
        errorMsg = "メールアドレスの形式が異なっています。";
        createErrorMessage();
        this.after(p);
        flugs.email = false;
    }
    checkFlags();
}

function handlePasswordChanges() {
    const passwordValidation = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,}$/;
    if (passwordValidation.test(this.value)) {
        clearErrorMessage();
        flugs.password = true;
    } else {
        errorMsg = "8文字以上の大小の英数字を交ぜたものにしてください。";
        createErrorMessage();
        this.after(p);
        flugs.password = false;
    }
    checkFlags();
}

function checkFlags() {
    const result = Object.values(flugs).every(value => value);
    if (result) {
        submitButton.disabled = false;
    }else{
        submitButton.disabled = true;
    }
}

yourName.addEventListener('input', handleNameChanges);
yourEmail.addEventListener('input', handleEMailChanges);
yourPassword.addEventListener('input', handlePasswordChanges);