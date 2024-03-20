import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './styles.css';


const AuthLogin = ({setIsLogin, isLogin}) => {
  const { loginWithRedirect } = useAuth0();
  const [modalShow, setModalShow] = React.useState(false);
  // eslint-disable-next-line
  const [copy, setCopy] = React.useState(false);


  function MyVerticallyCenteredModal(props) {
    const copyUrl = () => {
      // setCopy(true);
      navigator.clipboard.writeText('https://chandrimakabiraj.github.io/Todo-App');
    }
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            How to Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Clicking on the "Log In" will redirect to Google authentication using Auth0.
            But this website is hosted on a Github page and not on an independent domain and hence requires
            a path to be entered instead due to which we need to do a little maipulation to authenticate
            using google authentication.<br></br>
            <br></br>
            Step 1: Click on <b>Log In</b> button.<br></br>
            Step 2: Click on <b>Authenticate by Google</b>.<br></br>
            Step 3: In place of web address , select and replace <b>"https://chandrimakabiraj.github.io/"</b> to <b>"https://chandrimakabiraj.github.io/Todo-App"</b>
            only and leave the rest part of the url as it is unchanged.
            <button onClick={copyUrl}>
              {copy === false ? 'Copy URL' : 'Copied'}
            </button><br></br>'
            Step 4: You are logged In!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClick} className="login">Log In</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const handleClick = () => {
    setIsLogin(!isLogin);
    loginWithRedirect()
  }

  /* return (
    <div>
      <button onClick={handleClick} className="login">Log In</button>
    </div>
  ); */

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Login to view your Profile
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default AuthLogin;