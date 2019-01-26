import React from 'react'
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { fetchJson } from './Fetch';
import Routes from 'routes';
import UserSelect from './UserSelect';

export default class EditPopup extends React.Component {
  state = {
    name: '',
    description: '',
    assignee: {
      id: null,
      first_name: null,
      last_name:  null,
      email: null
    }
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  }

  handleDecriptionChange = (e) => {
    this.setState({ description: e.target.value });
  }

  handleCardAdd = () => {
    const params = {
      method: 'POST',
      route: Routes.api_v1_tasks_path,
      body: {
        ...this.state,
        assignee_id: this.state.assignee.id
      }
    };
    fetchJson(params).then( response => {
      if (response.status == 201) {
        this.props.onClose(true);
      }
    }).catch( error => {
      alert(error.message);
    });
  }

  handleAssigneeChange = (value) => {
    this.setState({ assignee: value });
  }

  render () {
    const {show, onClose} = this.props;
    const {name, description} = this.state;
    return <div>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            New task
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <FormGroup controlId="formTaskName">
              <ControlLabel>Task name:</ControlLabel>
              <FormControl
                type="text"
                value={name}
                placeholder='Set the name for the task'
                onChange={this.handleNameChange}
              />
            </FormGroup>
            <FormGroup controlId="formDescriptionName">
              <ControlLabel>Task description:</ControlLabel>
              <FormControl
                componentClass="textarea"
                value={description}
                placeholder='Set the description for the task'
                onChange={this.handleDecriptionChange}
              />
            </FormGroup>
            <FormGroup controlId="formAssigneeId">
              <ControlLabel>Assignee</ControlLabel>
              <UserSelect
                id="Assignee"
                onChange={this.handleAssigneeChange}
                value={this.state.assignee}
              />
            </FormGroup>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={onClose}>Close</Button>
          <Button bsStyle="primary" onClick={this.handleCardAdd}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  }
}