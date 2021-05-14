import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ isAuth, children, ...rest }) => {
	// * use render if children is causing issues
	return <Route {...rest}>{isAuth ? children : <Redirect to='/login' />}</Route>;
};

ProtectedRoute.propTypes = {
	isAuth: PropTypes.bool.isRequired
};

export default ProtectedRoute;
