import React from 'react';
import { Glyphicon, Col, Nav, NavItem } from 'react-bootstrap';

import NesoListTab          from './NesoListTab';
import NesoImageTab         from './NesoImageTab';
import NesoSearchPane       from './NesoSearchPane';
import NesoDataLoader       from '../../data/NesoDataLoader';
import NesoDescriptionModal from '../../common/NesoDescriptionModal'

class IndexRoute extends React.Component {
  constructor() {
    super();
    this.state = {
      filteredMembers: [],
      selectedNeso: null,
      neso: null,
      selectedNesoTab: "list",
    };

    this.open             = this.open.bind(this);
    this.close            = this.close.bind(this);
    this.changeNesoTab    = this.changeNesoTab.bind(this);
    this.updateMemberList = this.updateMemberList.bind(this);
  }

  componentDidMount() {
    // console.log(document.getElementById('loading').remove())
    const self = this;
    (async function(){
      self.setState({ neso: await NesoDataLoader() });
    })();
  }

  open(selectedNeso) {
    this.setState({ selectedNeso });
  }

  close() {
    this.setState({ selectedNeso: null });
  }

  changeNesoTab(selectedNesoTab) {
    this.setState({ selectedNesoTab });
  }

  updateMemberList(filteredMembers, a) {
    this.setState({ filteredMembers });
  }

  render() {
    const { neso, filteredMembers, selectedNeso, selectedNesoTab } = this.state; 

    return (
      <div className="container">
        <div>
          <NesoSearchPane neso={neso} onChange={this.updateMemberList}/>
          <Col>
            <Nav bsStyle="pills" activeKey="" onSelect={this.changeNesoTab}>
              <NavItem eventKey="thumbnail" active={selectedNesoTab === "thumbnail"}><Glyphicon glyph="picture" /> 画像で表示</NavItem>
              <NavItem eventKey="list" active={selectedNesoTab === "list"}><Glyphicon glyph="list" /> 表で表示</NavItem>
            </Nav>
          </Col>
          <br/>
          {
            selectedNesoTab === "thumbnail" &&
              <NesoImageTab data={filteredMembers} onClick={this.open}/>
          }
          {
             selectedNesoTab === "list" &&
              <NesoListTab data={filteredMembers} onRowClick={this.open}/>
          }
          <NesoDescriptionModal selectedNeso={selectedNeso} onClose={this.close}/>
        </div>
      </div>
    );
  }
}

export default IndexRoute
