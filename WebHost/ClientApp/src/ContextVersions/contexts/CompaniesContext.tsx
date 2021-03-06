import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import {companyReducer} from '../../ContextVersions/reducers/companiesReducer';
import {iCompanyType} from '../components/CompanyComponent';
import {iCompaniesComponentType} from '../components/CompaniesComponent';


const CompaniesComponentInitialState: iCompaniesComponentType = {
    Companies: [{ compId: -1, compName: 'data loading...'}] as iCompanyType[]
    , isLoading: true as boolean
}
//can set e.g.. isLoading: true in here if required
export type CompanyAction =
    | { type: 'GET_COMPANIES_FETCH', isLoading: boolean}
    //below caused 'never' type issue because the data being fetched could not be parsed to t1he type (wrong type set)
    //| { type: 'GET_COMPANIES_FETCH_COMPLETE', Companies: iCompaniesComponentType[], isLoading: false
    | { type: 'GET_COMPANIES_FETCH_COMPLETE', Companies: iCompanyType[], isLoading: boolean
 }
//   | { type: 'GET_COMPANIES_RETRIEVED', isLoading: false }
  ;
//with contexts, the initial state is passed into the reducer and not handled in the reducer
//export const CompanyContext = React.createContext<{state: iCompaniesComponentType; dispatch: (action: CompanyAction) => void;}>({state: CompaniesComponentInitialState, dispatch: () => { }});
export const CompanyContext = React.createContext<{state: typeof CompaniesComponentInitialState; dispatch: (action: CompanyAction) => void;}>({state: CompaniesComponentInitialState, dispatch: () => { }});


const CompanyContextProvider = (props: any) => {
    const [state, dispatch] = React.useReducer(companyReducer, CompaniesComponentInitialState);
    return (
        <CompanyContext.Provider value={{state, dispatch}}>
            {props.children}
        </CompanyContext.Provider>
    )
}; export default CompanyContextProvider;


//type tCompanyContextProps = iCompanyType & RouteComponentProps;

// class CompanyContextProvider extends React.PureComponent<tCompanyContextProps> {
//     state = {
        
//     }
//     render(){
//         return (
//             // <React.Fragment>
//             // <p> </p>
//             // </React.ReactFragment>
//             //<CompanyContext.Provider>
//             <CompanyIniti>
//         )
//     }
// }



