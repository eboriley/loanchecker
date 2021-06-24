import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useForm from './UseForm'
import validate from './ValidateInfo'

const BackgroundContainer = styled.div`
/* height: 100vh; */
/* width: 100%; */
border: 1px solid black;
background-image: url("../images/photo-gradent.jpg");
background-repeat: no-repeat;
background-size: cover;
`;

const Container = styled.div`
display: flex;
flex-direction: column;
/* position: fixed; */
/* top: 50%;
left: 50%; */
/* transform: translate(-50%, -50%);  */
margin: auto;
max-width: 450px;
align-items: center;
background-color: #fff;
padding: 3rem;
border-radius: 15px;
border: none;

a{
  color: blue;
}

button {
    background-color: hsl(222, 100%, 16%);
    color: #fff;
    border-radius: 15px;
    width: 100%;
    border: none;
    padding: 1.2rem 0;
    font-weight: 600;
    font-size: 16px;
    transition:150ms cubic-bezier(.17,.67,.83,.67);
    &:hover{
      background-color: hsl(222, 100%, 28%) ;
      cursor: pointer;
    }

  }

  .slider {
    width: 100%;
  }

  .interest-container {
      display: flex;
      justify-content: space-between;
  }

  .money{
      color : hsl(207, 70%, 28%);
      font-weight: 700;
  }
  .terms_and_conditions{
    display: flex;
    justify-content:center;
    align-items: center;
    margin-top: .5rem;
  }

  .terms{
    font-size: .7rem;
  }
`;



const InputField = styled.div`
  display: flex;
  width: 350px;
  flex-direction: column;
  border: none;
  border-radius: 10px;
  background-color: none;
  margin: .7rem 0;
  /* box-shadow: inset 0 0 2px #999999; */

  span {
   color: darkgray;
  font-family: sans-serif;
  /* font-size: .7rem; */
  margin-bottom: 5px;
  display: inline-block;
  position: absolute;
  transform: translate(.8rem, 1.5rem);
  transition: all 150ms cubic-bezier(.17,.67,.83,.67);
  }

  .input_label{
    transform: translate(.8rem, .9rem);
        visibility: visible;
        font-size:.7em;
        color: #979797;
        z-index: 10;
  }

  .error_border{
      border: 1px solid red;
      box-shadow: none;
    }

  input {
    border: 1px solid hsl(215, 3%, 96%);
    border-radius: 15px;
    outline: none;
    background: none;
    font-size: 14px;
    margin-top: .4rem;
    padding: 1.7rem .8rem .7rem;
    /* box-shadow: inset 0 0 3px #999999; */
    z-index: 9;
    transition:150ms cubic-bezier(.17,.67,.83,.67);

    &:hover{
      border: 1px solid hsl(218, 96%, 33%);
      cursor: pointer;
    }


    &:focus {
        border: 1px solid hsl(218, 96%, 33%);
        box-shadow:  0px 0px 9px -2px rgba(0,0,0,0.45);
    }

    &:focus + span {
        transform: translate(.8rem, .9rem);
        visibility: visible;
        font-weight: bold;
        font-size:.7em;
        color: hsl(218, 96%, 33%);
      /* text-shadow: 1px 0 0 #fff,
      -1px 0 0 #fff, 2px 0 0 #fff,
      -2px 0 0 #fff, 0 1px 0 #fff,
      0 -1px 0 #fff, 0 2px 0 #fff, 0
      -2px 0 #fff; */
    }
  
  }

  small {
    color: red;
    margin: .2rem 0 0 .7rem;
  }

  .error_icon {
    width: 1.3rem;
    position: absolute;
    transform: translate(19rem, 1.4rem);
    transition: all 150ms cubic-bezier(.17,.67,.83,.67);
    visibility: hidden;
  }

  .error_icon_visible {
    width: 1.3rem;
    position: absolute;
    transform: translate(19rem, 1.4rem);
    transition: all 150ms cubic-bezier(.17,.67,.83,.67);
    visibility: visible;
  }

  &:focus-within > .error_icon{
    display: none;
  }

  .view_password {
    src: url("../images/view.svg");
    width: 1.3rem;
    position: absolute;
    transform: translate(19rem, 1.4rem);
    transition: all 150ms cubic-bezier(.17,.67,.83,.67);
    z-index: 100;
  }

  .hide_password {
    display: none;
  }
  `;


const twoDecimalPlaces = Math.pow(10, 2)
const totalInterest = (p, t, r) => {
    const amount = p * Math.pow((1 + (r / 12)), t)
    const interest = amount - p;
    return Math.round(interest * twoDecimalPlaces) / twoDecimalPlaces;
}

const totalRepayment = (p, t, r) => {
    if (t > 1) {
        const amount = p * Math.pow((1 + (r / 12)), t)
        const totalRepayment = amount + p;
        return Math.round(totalRepayment * twoDecimalPlaces) / twoDecimalPlaces;
    } else {
        const amount = p * Math.pow((1 + (r / 12)), t)
        const interest = amount - p;
        return Number(p) + interest;
    }

}

const monthlyRepayment = (p, t, r) => {
    if (t > 1) {
        const amount = p * Math.pow((1 + (r / 12)), t)
        const monthlyRepayment = (amount + p) / t;
        return Math.round(monthlyRepayment * twoDecimalPlaces) / twoDecimalPlaces;
    } else {
        const amount = p * Math.pow((1 + (r / 12)), t)
        const interest = amount - p;
        return Number(p) + interest;
    }

}

const LoanPage = (props) => {
    const { handleChange, values, handleSubmit, errors } = useForm(validate);

    const [isName, setIsName] = useState(false)
    const [isLocation, setIsLocation] = useState(false)
    const [isPhone, setIsPhone] = useState(false)
    const [isPrincipal, setIsPrincipal] = useState(false)

    const handleUpdatedField = () => {
        if (values.name === '') {
            setIsName(false)
        } else setIsName(true)

        if (values.location === '') {
            setIsLocation(false)
        } else setIsLocation(true)

        if (values.phone === '') {
            setIsPhone(false)
        } else setIsPhone(true)
        if (values.principal === '') {
            setIsPrincipal(false)
        } else setIsPrincipal(true)

    }


    const displayInMonths = (months) => {
        if (months == 1) {
            return ""
        }
        if (months % 12 == 0) {
            return ""
        }

        if (months > 12) {
            const displayMonths = months % 12;
            if (displayMonths === 1) { return `${displayMonths} month` }
            return `${displayMonths} months`;
        } else return `${months} months`;
    }

    const displayInyears = (months) => {
        if (months >= 12) {
            const displayYears = months / 12
            if (Math.trunc(displayYears) === 1) { return `${Math.trunc(displayYears)} year` }
            return `${Math.trunc(displayYears)} years`
        } else return ""
    }

    const displayMothsandYears = (m, y) => {
        if (!m) return ``;
        return `( ${m} ${y})`
    }

    const displayFulDuration = v => {
        if (v > 1) { return `${v} months` }
        return `${v} month`
    }
    useEffect(() => {
        handleUpdatedField()
    })

    return (
        <>
            <BackgroundContainer>
                <Container>
                    <h1>Our loan form</h1>
                    <span>Already have an account? <a href="#">Sign in</a></span>
                    <form onSubmit={handleSubmit}>
                        <InputField >
                            <input className={errors.name && "error_border"}
                                type="text" name="name" value={values.name} onChange={handleChange} />
                            <span className={!isName ? "" : "input_label"}>Full name</span>
                            <img className={!errors.name ? "error_icon" : "error_icon_visible"} src="../images/error.svg" alt="error-icon" />
                            {errors.name && <small>{errors.name}</small>}
                        </InputField>
                        <InputField >
                            <input className={errors.location && "error_border"}
                                type="text" name="location" value={values.location} onChange={handleChange} />
                            <span className={!isLocation ? "" : "input_label"}>Location</span>
                            <img className={!errors.location ? "error_icon" : "error_icon_visible"} src="../images/error.svg" alt="error-icon" />
                            {errors.location && <small>{errors.location}</small>}
                        </InputField>
                        <InputField >
                            <input className={errors.phone && "error_border"}
                                name="phone" value={values.phone} onChange={handleChange} />
                            <span className={!isPhone ? "" : "input_label"}>Phone</span>
                            <img className={!errors.phone ? "error_icon" : "error_icon_visible"} src="../images/error.svg" alt="error-icon" />
                            {errors.phone && <small>{errors.phone}</small>}
                        </InputField>
                        {/* put a div here to widen the space */}
                        <InputField >
                            <input className={errors.principal && "error_border"} type="number"
                                name="principal" value={values.principal} onChange={handleChange} />
                            <span className={!isPrincipal ? "" : "input_label"}>Principal amount</span>
                            <img className={!errors.principal ? "error_icon" : "error_icon_visible"} src="../images/error.svg" alt="error-icon" />
                            {errors.principal && <small>{errors.principal}</small>}
                        </InputField>

                        <h4>Interest rate 15%</h4>

                        <p>Payment term: <span>
                            {displayFulDuration(values.months)} {displayMothsandYears(displayInyears(values.months), displayInMonths(values.months))}</span></p>

                        <input className="slider" type="range" name="months" min="1" max="60" onChange={handleChange} />

                        <div>
                            <h4>Your estimated repayment will be estimated</h4>
                            <p className="money">GHS {monthlyRepayment(values.principal, values.months, 0.15)}</p>
                            <div className="interest-container">
                                <div><p >Total repayment</p> <p className="money">GHS {totalRepayment(values.principal, values.months, 0.15)}</p></div>
                                <div><p>Total interest paid</p> <p className="money">GHS {totalInterest(values.principal, values.months, 0.15)}</p></div>
                            </div>

                        </div>
                        <button type="submit">Take loan</button>
                        <div className="terms_and_conditions">
                            <input type="checkbox" />
                            <span className="terms">I have read and agree to the <a href="#">Terms and Conditions</a></span>
                        </div>

                    </form>

                </Container>
            </BackgroundContainer>
        </>
    )
}

export { totalRepayment, totalInterest, monthlyRepayment };

export default LoanPage
