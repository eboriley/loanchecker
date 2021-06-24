import { useState, useEffect } from "react";
import styled from 'styled-components';
import db from '../firebase'
import {useParams} from 'react-router-dom'
import {firebase} from '../firebase'
import Table from 'react-bootstrap/Table'

const Loans = (props) => {
    const {id} = useParams();

    const [debtor, setDebtor] = useState([]);
    const [loans, setLoans] = useState();

    let getOptions = {
        source : 'cache'
    };

    useEffect(() => {
        const debtorReq = db.collection('debtors').doc(id);
        debtorReq.get(getOptions).then((doc) => {
            console.log("Cached document data:", doc.data());
            setDebtor(doc.data())
        }).catch((error) => {
            console.log("Error getting cached document:", error)
        })

        const loansReq = db.collection('debtors').doc(id).collection('loans');
        loansReq.onSnapshot((snapshot) => (
            setLoans(snapshot.docs.map((doc) => ({id: doc.id, data: doc.data()})))
        ))
    }, [])

    let loan = []

    if(loans){
        loan = loans.map(d => ({id : d.id, 
        deduction: d.data.deduction,
        interest : d.data.interest,
        loanDate: d.data.loanDate,
        principal: d.data.principal,
        repaymentDuration: d.data.repaymentDuration,
        totalAmount: d.data.totalAmount
    }))
    
  console.log(debtor.name)
}
return (
    <>
    <h1>{debtor.name}</h1>
     <Table responsive="sm">
             <thead>
           <tr>
               <th>Date</th>
               <th>Principal amount</th>
               <th>Monthly deduction</th>
               <th>Duration</th>
               <th>Total amount</th>
               <th>Interest paid</th>
            </tr> 
            </thead>
            <tbody>
    
    {!loan ? <p>loading... please wait</p> : 
     loan.map(({deduction, totalAmount, interest, loanDate, principal, repaymentDuration}) => (
     <Loan loanDate={loanDate} interest={interest} deduction={deduction} totalAmount={totalAmount} principal={principal} repaymentDuration={repaymentDuration}/>))
    }
        </tbody>
        </Table>
    </>
)
}

const Loan = ({ id, loanDate,principal, deduction, repaymentDuration, totalAmount, interest }) => {

    return   (
         <tr>
            <td>{loanDate}</td>
            <td>{principal}</td>
            <td>{deduction}</td>
            <td>{repaymentDuration}</td>
            <td>{totalAmount}</td>
            <td>{interest}</td>
            </tr>
       
        )
    }

export default Loans