import React, { Component, PropTypes } from 'react';
import { login as loginConnector } from './lib/auth/connectors';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'  ;

const Name = ({ name, color }) => {
    console.log('Render Render Render!');
    return <div style={{ color }}>My Name Is {name.toLowerCase()}</div>;
}
Name.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string,
};

const Person = ({ person, children }) => (
  <div>
    Info of person
    {React.cloneElement(children, { name: person.name })}
  </div>
);


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.login(this.state);
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label>Username</Label>
          <Input
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={e => this.setState({ username: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Person person={{ name: 'Giova' }} >
            <Name color="red" />
          </Person>

          <Label>Password</Label>
          <Input
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default loginConnector(Login);
