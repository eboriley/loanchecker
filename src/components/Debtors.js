import styled from 'styled-components'
import {useState, useEffect} from 'react'
import db from '../firebase'
import {Link} from 'react-router-dom'
import Table from 'react-bootstrap/Table'

const Debtors = (props) => {

    const [debtors, setDebtors] = useState('');

    useEffect(() => {
        const debtorsReq = db.collection('debtors');
        debtorsReq.orderBy('name','asc').onSnapshot((snapshot) => (
            setDebtors(snapshot.docs.map((doc) => ({id: doc.id, data: doc.data()})))
        ))
    }, [])

    let debtor = []

    if(debtors){
        debtor = debtors.map(d => ({id : d.id, 
        name: d.data.name,
        location : d.data.location,
        phone: d.data.phone,
    }))
    console.log(debtor)
}

return (
    <div>
         <h1>debtors</h1>
        <Table responsive="sm">
    <thead>
       <tr>
           <th>Name</th>
           <th>location</th>
           <th>Phone</th>
           <th>Loans</th>
        </tr>
     </thead>   
        {!debtor ? <p>loading... please wait</p> : 
        debtor.map(({id,name,location,phone}) => (
            <Debtor id={id} name={name} location={location} phone={phone}/>
        ))
        }
        </Table>
    </div>
)

}

const Debtor = ({ id, name, location, phone }) => {

return   (
        <tbody>
        <tr>
            <td>{name}</td>
            <td>{location}</td>
            <td>{phone}</td>
            <td><Link to={`/loans/${id}`}>view</Link></td>
        </tr>
        </tbody>
    )
}

export default Debtors
