 // At least one upper case English letter, (?=.*?[A-Z])
// At least one lower case English letter, (?=.*?[a-z])
// At least one digit, (?=.*?[0-9])
// At least one special character, (?=.*?[#?!@$%^&*-])
// Minimum eight in length .{8,} (with the anchors)

let nameValid = (value) => {
    let pattern = /(?=.*?[#?!@$%^&*-=+/"'|])/;
    let isMatch = value.match(pattern);
    let flag = value != '' && !isMatch;
    fieldsState["firstName"].isValid = flag;
    toggleClass([firstnameField, firstnameField__redLabel], flag);
}

let lastNameValid = (value) => {
    let pattern = /(?=.*?[#?!@$%^&*-=+/"'|])/;
    let isMatch = value.match(pattern);
    let flag = value != '' && !isMatch;
    fieldsState["lastName"].isValid = flag;
    toggleClass([lastNameField, lastnameField__redLabel], flag);
}

let mailValid = (value) => {
    let pattern = /^[a-zA-Z_0-9]+?\.[a-zA-Z0-9]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let isMatch = value.match(pattern);
     fieldsState["E-mail"].isValid = !!isMatch;
    toggleClass([emailField, inputEmail__redLabel], !!isMatch);
}

let passValid = (value) => {
        let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        let isMatch = value.match(pattern);
        fieldsState["password"].isValid = !!isMatch;
        fieldsState["confPass"].isValid = compirePasswords();
        toggleClass([confirmPassField, confirmPassField__redLabel], compirePasswords());  
        toggleClass([passField, passField__redLabel], !!isMatch);
}

let passConfirm = () => {
        toggleClass([confirmPassField, confirmPassField__redLabel], compirePasswords()); 
        fieldsState["confPass"].isValid = compirePasswords(); 
}

let compirePasswords = () => {
    return fieldsState["confPass"].value === fieldsState["password"].value ? true : false;
}