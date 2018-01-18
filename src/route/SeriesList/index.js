import React from 'react';
import ReactTable from "react-table";
import { Glyphicon, Badge, Col, Panel, ListGroup, ListGroupItem, Label } from 'react-bootstrap';

import NesoDataLoader       from '../../data/NesoDataLoader';
import NesoDescriptionModal from '../../common/NesoDescriptionModal'
import IconLabel            from '../../common/NesoMemberIconLabel';

class SeriesListRoute extends React.Component {
  constructor() {
    super();
    this.state = { selectedNeso: null, neso: null };
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    this.setState({ neso: NesoDataLoader() });
  }

  open(selectedNeso) {
    this.setState({ selectedNeso });
  }

  close() {
    this.setState({ selectedNeso: null });
  }

  render() {
    const { neso, selectedNeso } = this.state;
    if (!neso) {
      return <div/>
    }

    return <div className="container">
      <p className="text-muted">
        <Glyphicon glyph="exclamation-sign"/> メンバーのアイコンをクリックすると詳細画面が開きます
      </p>
      <Col smHidden mdHidden lgHidden>
        {
          Object.keys(neso.group2uniqSeries).map(group => 
            <Panel
              key={group}
              bsStyle="info"
              header={
                <span>{group} <Badge>{Object.keys(neso.group2uniqSeries[group]).length}</Badge></span>
              }>
                <ListGroup fill>
                  {
                    Object.entries(neso.group2uniqSeries[group]).map(s1 => {
                      const [key, same_series] = s1;

                      return Object.entries(same_series).map(s2 => {
                        const [size, serieses] = s2;
                      
                        return [serieses[0]].map(s => {
                          console.log()
                          return <ListGroupItem header={`${s.series} (${s.size}サイズ)`}>
                            {
                              neso.groups.getGroup(s.belongs_to).getMembers().map(m => 
                                <IconLabel
                                  key={m.name}
                                  member={m}
                                  active={!!neso.series2uniqSeries[s.series][s.size][m.moniker]}
                                  onClick={this.open.bind(this, { member: m, series: s })} />
                              )
                            }
                          </ListGroupItem>
                        })
                      
                      });
                    })
                  }
                </ListGroup>
            </Panel>
          )
        }
      </Col>
      <Col xsHidden>
        {
          Object.keys(neso.group2series).map(key => {
            const data = neso.group2series[key];

            return <div key={key}>
              <ReactTable
                className="-striped -highlight"
                defaultPageSize={data.length}
                showPagination={false}
                data={data}
                columns={[
                  { 
                    Header: <span>{key}のシリーズ <Badge>999</Badge></span>,
                    headerStyle: { backgroundColor: "#ddd" },
                    accessor: "series",
                    width: 220,
                    className: "text-center",
                  },{ 
                    Header: "サイズ",
                    headerStyle: { backgroundColor: "#ddd" },
                    accessor: "size",
                    width: 60,
                    className: "text-center",
                  },{ 
                    Header: "発売日",
                    headerStyle: { backgroundColor: "#ddd" },
                    accessor: "sold_at",
                    width: 90,
                    className: "text-center",
                  },{ 
                    Header: "価格(税込)",
                    headerStyle: { backgroundColor: "#ddd" },
                    accessor: "price",
                    width: 90,
                    className: "text-center",
                    Cell: row => row.value 
                      ? <span>￥{row.original.price_commify}-</span>
                      : <span style={{ color: "#bbb" }}>(プライズ)</span>
                  },
                  ...neso.groups.getGroup(key).getMembers().map(m => {
                    return { 
                      Header: m.emoji,
                      headerStyle: { backgroundColor: m.color },
                      accessor: "groups.map." + m.moniker,
                      width: 40,
                      resizable: false,
                      Cell: row => row.value 
                        ? <IconLabel
                            member={m}
                            active={true}
                            onClick={this.open.bind(this, { member: m, series: row.original })} />
                        : ''
                    }
                  })
                ]} />
                <br/>
            </div>
          })
        }
      </Col>
      <NesoDescriptionModal selectedNeso={selectedNeso} onClose={this.close}/>
    </div>
  }
}

export default SeriesListRoute