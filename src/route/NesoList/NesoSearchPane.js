import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Checkbox, Accordion, Label, Panel, Glyphicon, Badge } from 'react-bootstrap';

class NesoSearchPane extends React.Component {
  constructor(){
    super();
    this.state = {
      reverseIdx: {},
      selectedKeys: { series: {}, size: {}, member: {} },
      selectedKeysLabel: null,
      filtered: null,
    };

    this.onClick     = this.onClick.bind(this);
    this.updateField = this.updateField.bind(this);
    this.createReverseIndex = this.createReverseIndex.bind(this);
  }

  componentDidMount(){
    if (this.props.neso) {
      this.createReverseIndex(this.props.neso)
    }
  }

  componentWillReceiveProps(props){
    this.createReverseIndex(props.neso);

    const param = new URLSearchParams(props.location.search);
    const selectedKeys = {};

    for (const key of ["member", "series", "size"]) {
      selectedKeys[key] = {};

      for (const k of param.getAll(key)) {
        selectedKeys[key][k] = 1;
      }
    }

    this.setState({ selectedKeys });
  }
  
  componentDidUpdate(){  
    if(!this.state.filtered) {
      this.updateField()
    }
  }

  createReverseIndex(neso){
    const reverseIdx = {};

    for(const g of neso.groups.getGroups()) {
      g.getMembers().map(m => m.name).forEach( s => { reverseIdx[s] = "member" });
    }

    neso.series.getUniqueSizes().forEach(    s => { reverseIdx[s] = "size" });
    neso.series.getUniqueSerieses().forEach( s => { reverseIdx[s] = "series" });
    this.setState({ reverseIdx });
  }

  onClick(e){
    const key      = e.target.name;
    const checked  = e.target.checked;
    const type     = this.state.reverseIdx[key];
    const selectedKeys = this.state.selectedKeys;
    const param = new URLSearchParams(this.props.location.search);

    if (checked) {
      selectedKeys[type][key] = 1;
      param.append(type, key);
    } else {
      delete selectedKeys[type][key];

      const current = param.getAll(type);
      const removed = Array.from(new Set(current)).filter(k => k !== key);

      param.delete(type);
      for (const k of removed) {
        param.append(type, k);
      }
    }

    this.setState({ selectedKeys });
    this.updateField();
    this.props.history.push("?" + param.toString());
  }

  updateField(){
    const { neso } = this.props;
    const filtered = [];

    const members = Object.keys(this.state.selectedKeys.member);
    const series  = Object.keys(this.state.selectedKeys.series);
    const sizes   = Object.keys(this.state.selectedKeys.size);

    for (const c of neso ? neso.nesoes : []) {
      const member_matched = members.length === 0 ? 1 : members.filter(f => f === c.member.name).length !== 0;
      const series_matched = series.length  === 0 ? 1 : series.filter(f => f === c.series.series).length !== 0;
      const sizes_matched  = sizes.length   === 0 ? 1 : sizes.filter(f => f === c.series.size).length !== 0;

      if (member_matched && series_matched && sizes_matched) {
        filtered.push(c);
      }
    }

    const terms = [...members, ...series, ...sizes];
    const selectedKeysLabel = terms.length === 0
      ? "すべての寝そべり"
      : terms.map(l => `"${l}"`).join(", ") + " の寝そべり";

    this.props.onChange(filtered);
    this.setState({ selectedKeysLabel, filtered });
  }

  render(){
    const { neso } = this.props;
    if (!neso) {
      return <div/>
    }

    const { selectedKeysLabel, filtered, selectedKeys } = this.state;

    return <div>
      <Accordion defaultActiveKey="">
        <Panel
          bsStyle="info" 
          eventKey="1"
          header={
            <span>
              <Glyphicon glyph="search" /> 
              {selectedKeysLabel} <Badge>{filtered ? filtered.length : 0}</Badge>
            </span>
          }>
            <div>
              <Label bsStyle="info">シリーズ</Label> &nbsp;
              { 
                neso.series.getUniqueSerieses().map(s => 
                  <Checkbox inline key={s} name={s} onClick={this.onClick} checked={selectedKeys.series[s]}>{s}</Checkbox>
                ) 
              }
            </div>
            <br/>
            <div>
              <Label bsStyle="warning">サイズ</Label> &nbsp;
              {
                neso.series.getUniqueSizes().map(s => 
                  <Checkbox inline key={s} name={s} onClick={this.onClick} checked={selectedKeys.size[s]}>{s}</Checkbox>
                ) 
              }
            </div>
            <br/>
            <div>
              <Label bsStyle="success">μ's</Label>  &nbsp;
              {
                neso.groups.getGroup("μ's").getMembers().map(m => 
                  <Checkbox inline
                    key={m.moniker}
                    name={m.name}
                    checked={selectedKeys.member[m.name]}
                    onClick={this.onClick}
                    style={{ color: m.color }}>{m.emoji || ''}{m.name}</Checkbox>
                )
              }
            </div>
            <br/>
            <div>
              <Label bsStyle="success">Aqours</Label> &nbsp;
              {
                neso.groups.getGroup("Aqours").getMembers().map(m => 
                  <Checkbox inline
                    key={m.moniker}
                    name={m.name}
                    checked={selectedKeys.member[m.name]}
                    onClick={this.onClick}
                    style={{ color: m.color }}>{m.emoji || ''}{m.name}</Checkbox>
                )
              }
            </div>
            <br/>
            <div>
              <Label bsStyle="success">SaintSnow</Label> &nbsp;
              {
                neso.groups.getGroup("SaintSnow").getMembers().map(m =>
                  <Checkbox inline
                    key={m.moniker}
                    name={m.name}
                    checked={selectedKeys.member[m.name]}
                    onClick={this.onClick}
                    style={{ color: m.color }}>{m.emoji || ''}{m.name}</Checkbox>
                )
              }
            </div>
        </Panel>
      </Accordion>
    </div>
  }
}

NesoSearchPane.propTypes = {
  neso: PropTypes.object,
  onChange: PropTypes.func.isRequired,
}

export default withRouter(NesoSearchPane)
