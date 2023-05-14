import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function TextLinkExample(props) {

    const { currentMember } = props;


    return (
        <Navbar>
            <Container>
                <Navbar.Brand href="#home">Chat App. Made By Nikola</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <strong> {currentMember.username} </strong>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default TextLinkExample;