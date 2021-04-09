const modalButton = document.getElementById('js-modalButton');
const closeButton = document.getElementById('js-closeButton');
const agreeButton = document.getElementById('js-agreeButton');
const submitButton = document.getElementById('js-submitButton');

const checkBox = document.getElementById('js-check');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('js-modalContent');

function openModal() {
    modal.style.display = 'block';
}
function closeModal() {
    modal.style.display = 'none';
}


modalButton.addEventListener('click', openModal);

closeButton.addEventListener('click', closeModal);


modalContent.onscroll = function () {
    const height = modalContent.offsetHeight;
    const scrollHeight = modalContent.scrollHeight;
    const scrollTop = modalContent.scrollTop;
    const scrollPosition = height + scrollTop;
    const proximity = 0;

    if ((scrollHeight - scrollPosition) / scrollHeight <= proximity) {
        agreeButton.disabled = false;
        agreeButton.addEventListener('click', () => {
            checkBox.disabled = false;
            checkBox.checked = true;
            closeModal();
        });
    }
};


submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (checkBox.checked) {
        location.href = "register-done.html";
    } else {
        alert('利用規約を読み、同意する場合は「同意する」を押してください');
    }
}, false);
