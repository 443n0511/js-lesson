const submitButton = document.getElementById('js-submitButton');
submitButton.disabled = true;

const elementForName = document.getElementById("js-nameErrorMessage");
const elementForPassword = document.getElementById("js-passwordErrorMessage");

class Validation {
    errorMessage
}

class PasswordValidation extends Validation {
    errorMessage = null
    messageViewElement = null
    static validationExgr = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,}$/
    static validationMessage = "8文字以上の大小の英数字を交ぜたものにしてください。"

    constructor(element){
        super();
        this.messageViewElement = element
    }
    clearErrorMessage() {
        this.errorMessage = `password:""`;
        this.messageViewElement.textContent = "";
    }
    createErrorMessage() {
        this.errorMessage = `password:${PasswordValidation.validationMessage}`;
        this.messageViewElement.textContent = PasswordValidation.validationMessage;
        this.messageViewElement.classList.add("error-message");
    }

    isValid(value){
        return PasswordValidation.validationExgr.test(value)
    }
    allValid(){
        if(this.errorMessage === `password:""`){
        return true
    }
}
}
class NameValidation extends Validation {
    errorMessage = null
    messageViewElement = null
    static maxCharacters = 15
    static validationMessage = "※ユーザー名は15文字以下にしてください。"
    constructor(element){
        super();
        this.messageViewElement = element
    }
    clearErrorMessage() {
        this.errorMessage = `name:""`;
        this.messageViewElement.textContent = "";
    }
    createErrorMessage() {
        this.errorMessage = `name:${NameValidation.validationMessage}`;
        this.messageViewElement.textContent = NameValidation.validationMessage;
        this.messageViewElement.classList.add("error-message");
    }

    isValid(value){
        return value > NameValidation.maxCharacters
    }
    allValid(){
        if(this.errorMessage === `name:""`){
        return true
    }
}
}

const nameValidationIns = new NameValidation(elementForName);
const passwordValidationIns = new PasswordValidation(elementForPassword);

yourName.addEventListener('input', handleNameChanges);
yourPassword.addEventListener('input', handlePasswordChanges);


function handleNameChanges(e) {
    if (nameValidationIns.isValid(e.target.value.length)) {
        nameValidationIns.createErrorMessage();
        this.after(passwordValidationIns.messageViewElement);
    } else {
        nameValidationIns.clearErrorMessage();
    }
    console.log(nameValidationIns.errorMessage)
    checkFlags();
}

function handlePasswordChanges(e) {
    if (passwordValidationIns.isValid(e.target.value)) {
        passwordValidationIns.clearErrorMessage()
    } else {
        passwordValidationIns.createErrorMessage();
        this.after(passwordValidationIns.messageViewElement);
    }
    console.log(passwordValidationIns.errorMessage)
    checkFlags();
}

function checkFlags() {
    if (nameValidationIns.allValid() && passwordValidationIns.allValid()) {
        submitButton.disabled = false;
    }else{
        submitButton.disabled = true;
    }
}

function getFormData(e){
    e.preventDefault();

	const inputName = document.getElementById('yourName').value;
    const inputPassword = document.getElementById('yourPassword').value;
	const inputToken = document.getElementById('token').value;

    const values =  {
        name:inputName,
        password:inputPassword,
        token:inputToken
    };
    toLogin(values)
};
submitButton.addEventListener('click', getFormData);


async function toLogin(formData) {
    let result;
    try {
        result = await registeredCheck(formData);
    } catch (err) {
        result = false;
    }
    if(result){
        const tokenValue = formData.token;
        localStorage.setItem("token",tokenValue);
        location.href="index.html";
    } else {
        location.href="failure.html";
    }
};

async function registeredCheck(user) {
    return new Promise((resolve) => {
        const users = [
            {
                name: "test1",
                password: "N302aoe3"
            },
            {
                name: "test2",
                password: "N302aoe4"
            },
            {
                name: "test3",
                password: "N302aoe5"
            },
        ];
        const checked = users.some(value => user.name === value.name && user.password === value.password);
        return resolve(checked);
    });
};