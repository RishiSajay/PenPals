import Card from 'react-bootstrap/Card';

interface definitionProps {
    word: String;
}
function Definition(props: definitionProps) {
    return(
        <div>
            <Card>
                <Card.Body>
                    <Card.Title>
                        {`Word: ${props.word}`}
                    </Card.Title>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Definition;