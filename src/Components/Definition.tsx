import Card from "react-bootstrap/Card";

interface definitionProps {
  word: string;
  trans: string;
}

function Definition(props: definitionProps) {
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>{`Word: ${props.word}`}</Card.Title>
          <Card.Text>{`Translation: ${props.trans}`}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Definition;
