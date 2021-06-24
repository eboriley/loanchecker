export default function validateInfo(values) {
    let errors = {};

    if (!values.name.trim()) {
        errors.name = "Full name required"
    }

    if (!values.location) {
        errors.location = 'Location required';
    }

    if (!values.phone) {
        errors.phone = 'Phone number required';
    }

    if (!values.principal) {
        errors.principal = 'Principal amount required';
    }

    return errors;
}