import { useNavigate, useRouteError } from 'react-router';
import LinkButton from './LinkButton';

function Error() {
  // const navigate = useNavigate();

  // extract actual error thrown
  const error = useRouteError();

  // console.log(error);

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.message || error.data}</p>

      <LinkButton to={'-1'}>&larr; Go back</LinkButton>

      {/* <button onClick={() => navigate(-1)}>&larr; Go back</button> */}
    </div>
  );
}

export default Error;
