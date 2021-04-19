const submitButton = document.getElementById('js-submitButton');
submitButton.disabled = true;

const p = document.createElement("p");


class passwordValidation {
    errorMessage = null

    static validationExgr = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,}$/
    static validationMessage = "8文字以上の大小の英数字を交ぜたものにしてください。"

    clearErrorMessage() {
        this.errorMessage = `password:""`;
        p.textContent = "";
    }
    createErrorMessage() {
        this.errorMessage = `password:${passwordValidation.validationMessage}`;
        p.textContent = passwordValidation.validationMessage;
        p.classList.add("error-message");
    }

    isValid(value){
        return passwordValidation.validationExgr.test(value)
    }
    allValid(){
        if(this.errorMessage === `password:""`){
        return true
    }
}
}
class nameValidation {
    errorMessage = null
    static maxCharacters = 15
    static validationMessage = "※ユーザー名は15文字以下にしてください。"

    clearErrorMessage() {
        this.errorMessage = `name:""`;
        p.textContent = "";
    }
    createErrorMessage() {
        this.errorMessage = `name:${nameValidation.validationMessage}`;
        p.textContent = nameValidation.validationMessage;
        p.classList.add("error-message");
    }

    isValid(value){
        return value > nameValidation.maxCharacters
    }
    allValid(){
        if(this.errorMessage === `name:""`){
        return true
    }
}
}

const nameValidationIns = new nameValidation();
const passwordValidationIns = new passwordValidation();

yourName.addEventListener('input', handleNameChanges);
yourPassword.addEventListener('input', handlePasswordChanges);


function handleNameChanges(e) {
    if (nameValidationIns.isValid(e.target.value.length)) {
        nameValidationIns.createErrorMessage();
        this.after(p);
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
        this.after(p);
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


