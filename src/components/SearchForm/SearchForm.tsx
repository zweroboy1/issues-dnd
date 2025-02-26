import { Form, Button, InputGroup } from "react-bootstrap";

const SearchForm = () => {
  return (
    <Form>
      <InputGroup className="w-100">
        <Form.Control type="text" placeholder="Enter repo URL" className="flex-grow-1 me-2" />
        <Button variant="primary">Load issues</Button>
      </InputGroup>
    </Form>
  );
};

export default SearchForm;
