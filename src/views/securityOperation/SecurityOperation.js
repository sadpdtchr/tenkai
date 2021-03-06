import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Container,
  Row,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  ButtonToolbar
} from 'react-bootstrap';
import TenkaiTable from 'components/Table/TenkaiTable';
import * as col from 'components/Table/TenkaiColumn';

import { CardTenkai } from 'components/Card/CardTenkai.jsx';
import CButton from 'components/CustomButton/CustomButton.jsx';

import * as actions from 'stores/securityOperation/actions';
import * as selectors from 'stores/securityOperation/reducer';
import EditSecurityOperation from 'views/securityOperation/editSecurityOperation';
import security_policies from 'policies.js';
import SimpleModal from 'components/Modal/SimpleModal.jsx';

class SecurityOperation extends Component {
  state = {
    inputFilter: ''
  };

  componentDidMount() {
    this.props.dispatch(actions.load());
  }

  onSaveClick(data) {
    this.props.dispatch(actions.save(data));
    this.setState({
      showInsertUpdateForm: false,
      editItem: {},
      editMode: false
    });
  }

  handleConfirmDelete() {
    this.props.dispatch(
      actions.deleteSecurityOperation(this.state.itemToDelete.ID)
    );
    this.setState({ showConfirmDeleteModal: false, itemToDelete: {} });
  }

  policies = (cell, row) => {
    return row.policies.map(policyItem => (
      <div key={security_policies.get(policyItem)}>
        {policyItem} - {security_policies.get(policyItem)}
      </div>
    ));
  };

  onEdit = item => {
    this.setState({
      showInsertUpdateForm: true,
      editItem: item,
      editMode: true
    });
    window.scrollTo(0, 0);
  };

  onDelete = item => {
    this.setState({ itemToDelete: item }, () => {
      this.setState({ showConfirmDeleteModal: true });
    });
  };

  render() {
    let columns = [];
    columns.push(col.addCol('name', 'Role', '30%'));
    columns.push(col.addColBtn('policies', 'Policies', this.policies, '50%'));
    columns.push(col.addEdit(this.onEdit));
    columns.push(col.addDelete(this.onDelete));

    const data = this.props.securityOperation.list.filter(
      d =>
        this.state.inputFilter === '' || d.name.includes(this.state.inputFilter)
    );

    return (
      <div className="content">
        <SimpleModal
          showConfirmDeleteModal={this.state.showConfirmDeleteModal}
          handleConfirmDeleteModalClose={() =>
            this.setState({ showConfirmDeleteModal: false, itemToDelete: {} })
          }
          title="Confirm"
          subTitle="Delete"
          message="Are you sure you want to delete this Role?"
          handleConfirmDelete={this.handleConfirmDelete.bind(this)}
        ></SimpleModal>
        <Container fluid>
          <Row>
            <Col md={12}>
              <CardTenkai
                title=""
                content={
                  <div align="right">
                    <ButtonToolbar style={{ display: 'block' }}>
                      <CButton
                        className="pull-right"
                        variant="primary"
                        onClick={() =>
                          this.setState({
                            showInsertUpdateForm: true,
                            editItem: {},
                            editMode: false
                          })
                        }
                      >
                        New Role
                      </CButton>
                    </ButtonToolbar>
                  </div>
                }
              />
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              {this.state.showInsertUpdateForm ? (
                <EditSecurityOperation
                  editMode={this.state.editMode}
                  editItem={this.state.editItem}
                  saveClick={this.onSaveClick.bind(this)}
                  cancelClick={() =>
                    this.setState({
                      showInsertUpdateForm: false,
                      editItem: {},
                      editMode: false
                    })
                  }
                />
              ) : null}
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <CardTenkai
                title="Roles"
                content={
                  <form>
                    <div className="col-md-8">
                      <FormGroup>
                        <FormLabel>Search</FormLabel>
                        <FormControl
                          value={this.state.inputFilter}
                          onChange={e =>
                            this.setState({ inputFilter: e.target.value })
                          }
                          style={{ width: '100%' }}
                          type="text"
                          placeholder="Search using any field"
                          aria-label="Search using any field"
                        ></FormControl>
                      </FormGroup>
                    </div>
                    <TenkaiTable columns={columns} data={data} />
                  </form>
                }
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  securityOperation: selectors.getState(state)
});

export default connect(mapStateToProps)(SecurityOperation);
