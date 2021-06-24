import { useState, useEffect } from 'react';
import { totalRepayment, totalInterest, monthlyRepayment } from './LoanPage'
import db from '../firebase'

const useForm = (validate) => {
    const [values, setValues] = useState({
        name: '',
        location: '',
        phone: '',
        principal: '',
        months: '',
    });

    const [errors, setErrors] = useState({});


    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };



    const person = {
        id: '',
        name: '',
        location: '',
        loans: []
    }

    const loan = {
        id: '',
        principal: '',
        interest: '',
        totalAmount: '',
        deduction: '',
        loanDate: '',
        repaymentDuration: '',
    }


    const handleSubmit = e => {
        e.preventDefault();

        setErrors(validate(values));
        setIsSubmitting(true);
        if (Object.keys(errors).length === 0 && isSubmitting) {
            db.collection('debtors').doc("m4AoQYGisAN1f0WQfPvf").collection('loans').add({
                principal : values.principal,
                interest : totalInterest(values.principal, values.months, 0.15),
                totalAmount : totalRepayment(values.principal, values.months, 0.15),
                deduction : monthlyRepayment(values.principal, values.months, 0.15),
                loanDate : new Date().toLocaleString(),
                repaymentDuration : values.months,
                }).then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                }).then(alert("debtor added"))
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        }

        // loan.principal = values.principal
        // loan.interest = totalInterest(values.principal, values.months, 0.15)
        // loan.totalAmount = totalRepayment(values.principal, values.months, 0.15)
        // loan.deduction = monthlyRepayment(values.principal, values.months, 0.15)
        // loan.loanDate = new Date().toLocaleString()
        // loan.repaymentDuration = values.months

        // console.log(loan)

    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            return ''
        }
    }, [errors]);

    return { handleChange, values, handleSubmit, errors }
}

export default useForm