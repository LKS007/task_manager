import React from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { fetch, fetchJson } from './Fetch';
import Routes from 'routes';

export default class EditPopup extends React.Component {
  state = {
    task: {
      id: null,
      name: '',
      description: '',
      state: null,
      author: {
        id: null,
        first_name: null,
        last_name: null,
        email: null
      },
      assignee: {
        id: null,
        first_name: null,
        last_name:  null,
        email: null
      }
    },
    isLoading: true,
  }

  loadCard = (cardId) => {
    this.setState({ isLoading: true });
    const params = {
      method: 'GET',
      route: Routes.api_v1_task_path,
      resource: cardId
    };

    fetchJson(params).then(({data}) => {
      this.setState({ task: data});
      this.setState({ isLoading: false });
    });
    
  }

  componentDidUpdate (prevProps) {
    if (this.props.cardId != null && this.props.cardId !== prevProps.cardId) {
      this.loadCard(this.props.cardId);
    };
  }

  handleNameChange = (e) => {
    this.setState({ task: { ...this.state.task, name: e.target.value }});
  }

  handleDecriptionChange = (e) => {
    this.setState({ task: { ...this.state.task, description: e.target.value }});
  }

  handleCardEdit = () => {
    const params = {
      method: 'PUT',
      route: Routes.api_v1_task_path,
      resource: this.props.cardId,
      body: {
        ...this.state.task
      }
    };
    fetchJson(params).then( response => {
      if (response.status == 200) {
        this.props.onClose(this.state.task.state);
      }
      else {
        alert(`Update failed! ${ response.status } - ${ response.statusText }`);
      }
    }).catch( error => {
      alert(error.message);
    });
  }

  handleCardDelete = () => {
    const params = {
      method: 'DELETE',
      route: Routes.api_v1_task_path,
      resource: this.props.cardId
    };
    fetchJson(params).then( response => {
      if (response.status == 200) {
        this.props.onClose(this.state.task.state);
      }
      else {
        alert(`DELETE failed! ${ response.status } - ${response.statusText}`);
      }
    }).catch( error => {
      alert(error.message);
    });
  }

  render () {
    const {show, onClose} = this.props;
    const {task, isLoading} = this.state;
    if (isLoading) {
      return (
        <Modal show={show} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Info
            </Modal.Title>
          </Modal.Header>
           <Modal.Body>
            Your task is loading. Please be patient.
          </Modal.Body>
           <Modal.Footer>
            <Button onClick={onClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      )
    }
    return (
      <div>
        <Modal show={show} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Task # {task.id} [{task.state}]
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <FormGroup controlId="formTaskName">
                <ControlLabel>Task name:</ControlLabel>
                <FormControl
                  type="text"
                  value={task.name}
                  placeholder='Set the name for the task'
                  onChange={this.handleNameChange}
                />
              </FormGroup>
              <FormGroup controlId="formDescriptionName">
                <ControlLabel>Task description:</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  value={task.description}
                  placeholder='Set the description for the task'
                  onChange={this.handleDecriptionChange}
                />
              </FormGroup>
            </form>
            Author: {task.author.first_name} {task.author.last_name}
          </Modal.Body>

          <Modal.Footer>
            <Button bsStyle="danger" onClick={this.handleCardDelete}>Delete</Button>
            <Button onClick={onClose}>Close</Button>
            <Button bsStyle="primary" onClick={this.handleCardEdit}>Save changes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}