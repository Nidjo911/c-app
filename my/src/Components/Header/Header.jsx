import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css';



function TextLinkExample(props) {

    function btnClick() {
        /*         console.log('clickedddd') */
        props.close();
    }

    function mainClick() {
        props.toggle();
    }

    const { currentMember } = props;

    return (
            <Navbar>
            <Container>
                <Navbar.Brand onClick={mainClick}>Chat App. Made By Nikola</Navbar.Brand>
                <Navbar.Toggle />

                <Navbar.Collapse className="justify-content-end">

                    <button className='btnexit' onClick={btnClick}><i className="bi bi-box-arrow-right"></i></button>

                    <Navbar.Text>
                        Signed in as: <strong> {currentMember.username} </strong>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default TextLinkExample;