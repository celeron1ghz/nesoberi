import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Carousel, Label } from 'react-bootstrap';
//import { Line, Pie } from 'react-chartjs-2';

import NesoDataLoader from '../data/NesoDataLoader';
import IconLabel      from './NesoMemberIconLabel';

class NesoDescriptionModal extends React.Component {
  constructor(){
    super();
    this.state = {
      selectedNeso: null,
      neso: null,
      /*
      lineData: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            //label: selectedNeso.name,
            //backgroundColor: selectedNeso.color,
            //borderColor: selectedNeso.color,
            label: "popo",
            backgroundColor: "red",
            borderColor: "red",
            fill: false,
            lineTension: 0,
            data: [1500, 1500, 1600, 1500, 0, 2000, 2500],
          },
        ]
      },
      lineChartOptions:{
        maintainAspectRatio: true,
        legend: {
          position: 'none',
          fillStyle: "red",
          //fillStyle: selectedNeso.color,
          color: 'rgba(0,0,0,0)',
        }
      },
      */
    };

    this.close = this.close.bind(this);
  }

  componentDidMount() {
    // console.log(document.getElementById('loading').remove())
    this.setState({ neso: NesoDataLoader() });
  }

  componentWillReceiveProps(props){
    this.setState({ show: props.show });
  }

  close(){
    this.props.onClose();
  }

  render(){
    const { selectedNeso } = this.props;
    const { neso } = this.state;
    if (!neso) {
      return <div/>;
    }

    return <div>
      <Modal show={selectedNeso != null} onHide={this.close}>
        {
          selectedNeso && (() => {
            const { member, series } = selectedNeso;
            const same_series = neso.group2uniqSeries[series.belongs_to][series.series][series.size];
            
            return <div>
              <Modal.Header closeButton>
                <Modal.Title style={{ color: member.color }}>
                  {series.series} {member.emoji}{member.name} の詳細
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Carousel style={{ width: "100%", height: "300px" }}>
                  <Carousel.Item>
                    <img width={"100%"} height={"300px"} alt="900x500" src={selectedNeso.image} />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img width={"100%"} height={"300px"} alt="900x500" src={selectedNeso.image} />
                  </Carousel.Item>
                </Carousel>
                {/*
                <h4>価格のグラフ</h4>
                <p><Line data={this.state.lineData} options={this.state.lineChartOptions}/></p>
                */}
                <h5>サイズ</h5>
                <h4>
                  {
                    neso.series.getUniqueSizes().map(s => 
                      <span key={s}>
                        <Label style={{
                          border: "1px solid gray",
                          backgroundColor: series.size === s ? member.color : "#eee",
                        }}>{s}</Label>
                        {' '}
                      </span>
                    )
                  }
                </h4>
                <h5>販売方法</h5>
                <h4>
                  {
                    series.price
                      ? <Label style={{ border: "1px solid gray", backgroundColor: member.color }}>
                          販売 （￥{series.price_commify}- {series.sold_at}～）
                        </Label>
                      : <Label style={{ border: "1px solid gray", backgroundColor: "#eee" }}>販売</Label>
                  }
                  &nbsp;
                  {
                    !series.price
                      ? <Label style={{ border: "1px solid gray", backgroundColor: member.color }}>
                          プライズ （{series.sold_at}～）
                        </Label>
                      : <Label style={{ border: "1px solid gray", backgroundColor: "#eee" }}>プライズ</Label>
                  }
                </h4>
                <hr/>
                <h5>このシリーズの発売日</h5>
                <h4>
                  {
                    same_series.map(s => 
                      <div key={s.series + s.size + s.sold_at}>
                        <div style={{ color: series.sold_at === s.sold_at ? "red" : ""}}>
                          {s.sold_at + ' '}
                        </div>
                        {
                          neso.groups.getGroup(s.belongs_to).getMembers().map(m => 
                            <IconLabel
                              key={m.name}
                              member={m}
                              active={!!s.groups.map[m.moniker]}
                              selected={series.sold_at === s.sold_at}/>
                          )
                        }
                      </div>
                    )
                  }
                </h4>
              </Modal.Body>
            </div>
          })()
        }
      </Modal>
    </div>
  }
}

NesoDescriptionModal.propTypes = {
  selectedNeso: PropTypes.object,
  onClose: PropTypes.func.isRequired,
}

export default NesoDescriptionModal
