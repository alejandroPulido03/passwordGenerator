const setterPassword = document.forms['passwordSetter'];
const sendButton = setterPassword[5 /*Button*/];
const viewerPassword = document.getElementById('passwordSpace');
const clipboard = document.getElementById('clipboardButton');

const dictionaryAscciCodes = {
    includeUpper: [65,90],
    includeLower: [97, 122],
    includeNums: [48, 57],
    includeSymbs: [35, 38]
}

sendButton.onclick = () => doAPass();

const warning = (typeError) =>{
    document.querySelector('.passwordGenerator-container').insertAdjacentHTML('beforeend', `<span class='warning'>${typeError}</span>`)
    
    setTimeout(()=> [... document.getElementsByClassName('warning')].forEach((e) => e.classList.add('warning-close')), 2700)

}

const doAPass = () => {
    let lengthVal = setterPassword['passwordLength'].value;
    const paramsTypes = [ ... setterPassword.elements].slice(1,5);
    let paramsAcepted = paramsTypes.filter(check => check.checked == true)

    if(lengthVal > 0 && lengthVal <=100 && paramsAcepted.length > 0) {
        viewerPassword.value = createPass(paramsAcepted, lengthVal)
    }
    else if (paramsAcepted.length == 0) warning('Select the params for your password')
    else warning('The length of the password must be between 1 and 100')
}

const setCode = (range) => Math.floor(Math.random() * (range[1] - range[0]) + range[0])

const createPass = (types, passLength) => {
    let password = ''
    for (let index = 0; index < passLength; index++) {
        let typo = types[Math.floor(Math.random() * types.length)].id;
        let codeChar = setCode(dictionaryAscciCodes[typo]);
        password += String.fromCharCode(codeChar);
    }
    return password;
}

//TODO: Do the copy button func

clipboard.onclick = () =>{
    viewerPassword.focus();
    document.execCommand('selectall');
    document.execCommand('copy');
    document.querySelector('.passwordGenerator-container').classList.toggle('clipboard-succes')
    setTimeout(() => {
        document.querySelector('.passwordGenerator-container').classList.toggle('clipboard-succes')
    }, 2000);
}