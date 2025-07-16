export const useEmployeeProfile = () => {
    const validateFirstName = (firstName: string): string => {
        return firstName === "" ? "First name can't be empty" : ""
    }

    const validateLastName = (lastName: string): string => {
        return lastName === "" ? "Last name can't be empty" : ""
    }

    const validateEmail = (email: string): string => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
        if (!email) return "Email is required";
        if (!regex.test(email)) return "Please enter a valid email address";
        if (email.length > 254) return "Email cannot exceed 254 characters";
        
        return "";
    }

    const validatePhoneNumber = (phoneNumber: string): string => {
        if (!phoneNumber) return "Phone number cannot be empty";
        
        if (!/^\+?\d+$/.test(phoneNumber)) {
            return "Phone number must contain only numbers and an optional '+' at the beginning";
        }
        
        const digitsOnly = phoneNumber.replace(/^\+/, '');
        if (digitsOnly.length < 8) {
            return "Phone number must have at least 8 digits";
        }
        
        if (phoneNumber.length > 16) { // + plus 15 digits
            return "Phone number too long (max 15 digits)";
        }
        
        return "";
    }

    return { validateFirstName, validateLastName, validateEmail, validatePhoneNumber }
}