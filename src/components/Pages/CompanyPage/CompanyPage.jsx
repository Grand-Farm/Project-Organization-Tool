import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import './CompanyPage.css'

function CompanyPage() {
    const companyStore = useSelector(store => store.company);
    console.log('This is Company store', companyStore);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'FETCH_COMPANY' });
    }, [])

    const params = useParams();
    let companyId = params.companyId;
    console.log(companyId);
    let company = companyStore.find(company => company.id === Number(companyId));
    console.log('Archiving this company', company);

    const [addingCompany, setAddingCompany] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [allocatedHours, setAllocatedHours] = useState('');
    const [fulTimeRate, setFullTimeRate] = useState('');
    const [internRate, setInternRate] = useState('');
    const [contractStart, setContractStart] = useState('');



    const addCompany = () => {
        setAddingCompany(true);
    }

    const saveForm = () => {
        dispatch({
            type: 'ADD_COMPANY',
            payload: {
                company_name: companyName,
                allocated_hours: allocatedHours,
                full_time_rate: fulTimeRate,
                intern_rate: internRate,
                contract_start: contractStart,
            }
        })
        setAddingCompany(false);
    }


    return (
        <div className='landingCompany'>
            <h1>Home</h1>
            {addingCompany ?
                <form>
                    <div>
                        <label htmlFor='name'>Company Name</label>
                        <input id='name' value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor='hours'>Allocated Hours</label>
                        <input id='hours' value={allocatedHours} onChange={(e) => setAllocatedHours(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor='fulltime'>Full Time Rate</label>
                        <input id='fulltime' value={fulTimeRate} onChange={(e) => setFullTimeRate(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor='inter'>Inter Time Rate</label>
                        <input id='intern' value={internRate} onChange={(e) => setInternRate(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor='contract'>Contract Start</label>
                        <input id='contract' value={contractStart} onChange={(e) => setContractStart(e.target.value)} />
                    </div>
                </form> :
                ''
            }
            <div>
                {addingCompany ?
                    <button onClick={saveForm}>Save Company</button> :
                    <button onClick={addCompany}>Add Company</button>
                }
            </div>
            <div className='container'>
                {companyStore.map(company => {
                    {
                        if (company.is_archived === false) {
                            return (
                                <div className='content' key={company.id}>
                                    <h3>{company.company_name}</h3>
                                    <h5>{company.allocated_hours}</h5>
                                    <h5>{company.contract_start}</h5>
                                    <button onClick={() => dispatch({
                                        type: 'ARCHIVE_COMPANY',
                                        payload: company.id
                                    })}>Archive</button>
                                </div>
                            )
                        }
                    }
                    // return (
                    //     <div className='content' key={company.id}>
                    //         <h3>{company.company_name}</h3>
                    //         <h5>{company.allocated_hours}</h5>
                    //         <h5>{company.contract_start}</h5>
                    //         <button>Archive</button>
                    //     </div>
                    // )
                })}
            </div>
        </div>
    )
}

export default CompanyPage;