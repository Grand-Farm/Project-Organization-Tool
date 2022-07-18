import { useSelector, useDispatch } from 'react-redux';

import './ArchivedPage.css';

function ArchivedPage() {

    const companyStore = useSelector(store => store.company);

    return (
        <div className='archivePage'>
            <h1>Archived</h1>
            <div className='container'>
                {companyStore.map(company => {
                    {
                        if (company.is_archived === true) {
                            return (
                                <div key={company.id} className='content'>
                                    <h3>{company.company_name}</h3>
                                    <h5>{company.allocated_hours}</h5>
                                    <h5>{company.contract_start}</h5>
                                </div>
                            )
                        }
                    }
                })}
            </div>
        </div>
    )
}

export default ArchivedPage;