import React, { Component } from 'react';
import { login as loginConnector } from './lib/auth/connectors';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  // FormText,
  Card,
  CardBlock,
  // CardText,
  // CardTitle,
  Container,
  Row,
  Col,
} from 'reactstrap';

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
      <Container>
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <div style={{ textAlign: 'center', paddingBottom: '1em', paddingTop: '2em' }}>
              <h1>CMZ ~ Login</h1>
            </div>
            <Card>
              <CardBlock>
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
                    <Label>Password</Label>
                    <Input
                      type="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={e => this.setState({ password: e.target.value })}
                    />
                  </FormGroup>
                  <Button>Login</Button>
                </Form>
              </CardBlock>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default loginConnector(Login);
