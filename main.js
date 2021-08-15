const setterPassword = document.forms['passwordSetter'];
const sendButton = setterPassword[5 /*Button*/];
const viewerPassword = document.getElementById('passwordSpace');

const dictionaryAscciCodes = {
    includeUpper: [65,90],
    includeLower: [97, 122],
    includeNums: [48, 57],
    includeSymbs: [35, 38]
}

sendButton.onclick = () => doAPass();

const warning = (typeError) =>{
    //TODO: Do the popup of the errors (the number of the error give the text)
    return 300
}

const doAPass = () => {
    let lengthVal = setterPassword['passwordLength'].value;
    //TODO: Verify if lenght > 0
    let lengthPassword = lengthVal <= 300 ? lengthVal : warning(100) ;
    //TODO: Verify if is there some param (length > 0)
    let paramsTypes = [ ... setterPassword.elements].slice(1,5);
    let paramsAcepted = paramsTypes.filter(check => check.checked == true)

    viewerPassword.innerText = createPass(paramsAcepted, lengthPassword)
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