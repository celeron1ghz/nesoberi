import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, Thumbnail, Col } from 'react-bootstrap';

class NesoImageTab extends React.Component {
  render(){
    const { data, onClick } = this.props;

    return  <div>
      <p className="text-muted">
        <Glyphicon glyph="exclamation-sign"/> 画像をクリックすると詳細画面が開きます
      </p>
      {
        data.map(c => {
          return <Col key={c.image} xs={6} sm={3} md={2} lg={2}>
            <Thumbnail
              responsive="true"
              src={c.image}
              alt={c.series.series + " " + c.member.emoji + c.member.name}
              style={{
                width: "100%",
                height: "150px",
                borderColor: c.member.color,
                backgroundColor: c.member.color,
                borderWidth: "2px",
                position: "relative",
              }}
              onClick={onClick.bind(this,c)}>
              <div className="caption text-center" style={{
                position: "absolute",
                bottom: "-5px",
                left: "0",
                width: "100%",
                color: "white",
                fontFamily: "monospace",
              }}>
              </div>
            </Thumbnail>
          </Col>
        })
      }
    </div>
  }
}

NesoImageTab.propTypes = {
  data: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default NesoImageTab
