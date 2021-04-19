const submitButton = document.getElementById('js-submitButton');
submitButton.disabled = true;

const p = document.createElement("p");
let errorMsg = "";

const flugs = {
    name: false,
    password: false
};

function createErrorMessage() {
    p.textContent = errorMsg;
    p.classList.add("error-message");
}

function clearErrorMessage() {
    errorMsg = "";
    p.textContent = errorMsg;
}


yourName.addEventListener('input', handleNameChanges);
yourPassword.addEventListener('input', handlePasswordChanges);


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


