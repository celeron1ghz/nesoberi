import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'react-bootstrap';

class NesoMemberIconLabel extends React.Component {
  render(){
    const { member, active, selected, onClick } = this.props;

    return <span>
      <Label
        onClick={active ? onClick : null}
        style={{
          display: "inline-block",
          border: selected ? "2px solid red" : "2px solid gray",
          padding: "2px 3px",
          marginBottom: "5px",
          backgroundColor: selected || active ? member.color : "#eee",
        }}>
          {member.emoji}
        </Label>{' '}
    </span>
  }
}

NesoMemberIconLabel.propTypes = {
  member: PropTypes.object.isRequired,
  active: PropTypes.bool,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
}

export default NesoMemberIconLabel;