import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const ConditionalRoute = ({ condition, redirectPath, children, ...rest }) => {
	// * use render if children is causing issues
	return (
		<Route {...rest}>{condition ? children : <Redirect to={redirectPath} />}</Route>
	);
};

ConditionalRoute.propTypes = {
	condition: PropTypes.bool.isRequired,
	redirectPath: PropTypes.string.isRequired
};

export default ConditionalRoute;
