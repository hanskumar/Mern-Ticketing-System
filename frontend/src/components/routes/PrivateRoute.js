import React from 'react'
import { Route,Redirect } from 'react-router-dom'
import DefaultLayout from '../../layout/DefaultLayout';
import {useDispatch,useSelector} from 'react-redux'

const PrivateRoute = ({children,...rest}) => {

	const {isAuth} = useSelector(state=>state.login);
	console.log("Data form Redux.",isAuth)	

    return (
        <Route
			{...rest}
			render={({ location }) =>
				isAuth ? (
					<DefaultLayout>{children}</DefaultLayout>
				) : (
					<Redirect
						to={{
							pathname: "/",
							state: { from: location },
						}}
					/>
				)
			}
		/>
    )
}

export default PrivateRoute
