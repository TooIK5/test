 // At least one upper case English letter, (?=.*?[A-Z])
// At least one lower case English letter, (?=.*?[a-z])
// At least one digit, (?=.*?[0-9])
// At least one special character, (?=.*?[#?!@$%^&*-])
// Minimum eight in length .{8,} (with the anchors)

let nameValid = (value) => {
    fieldsState["firstName"].isValid =  value != '';
    toggleClass([firstnameField, firstnameField__redLabel], value != '');
}

let mailValid = (value) => {
    let pattern = /^[a-zA-Z_0-9]+?\.[a-zA-Z0-9]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let isMatch = value.match(pattern);
     fieldsState["E-mail"].isValid = !!isMatch;
    toggleClass([emailField, inputEmail__redLabel], !!isMatch);
}

let lastNameValid = (value) => {
         fieldsState["lastName"].isValid = value != '';
         console.log("lastNameValid: ", value);
        toggleClass([lastNameField, lastnameField__redLabel], value != '');
}

let passValid = (value) => {
        let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        let isMatch = value.match(pattern);
        fieldsState["password"].isValid = !!isMatch;
        fieldsState["confPass"].isValid = compirePasswords();
        toggleClass([confirmPassField, confirmPassField__redLabel], compirePasswords());  
        toggleClass([passField, passField__redLabel], !!isMatch);
}

let passConfirm = (value) => {
        toggleClass([confirmPassField, confirmPassField__redLabel], compirePasswords()); 
        compirePasswords() ? fieldsState["confPass"].isValid = true : fieldsState["confPass"].isValid = false; 
}

let compirePasswords = () => {
    return fieldsState["confPass"].value === fieldsState["password"].value ? true : false;
}