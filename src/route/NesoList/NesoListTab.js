import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from "react-table";
import { Glyphicon } from 'react-bootstrap';

class NesoListTab extends React.Component {
  render(){
    const { data, onRowClick } = this.props;

    return <div>
      <p className="text-muted">
        <Glyphicon glyph="exclamation-sign"/> 表の行をクリックすると詳細画面が開きます
      </p>
      <ReactTable
        className="-striped -highlight"
        defaultPageSize={9}
        pageSizeOptions={[9]}
        getTrProps={(a,b) => {
          return !!b
            ? { onClick: () => onRowClick(b.original) }
            : {};
        }}
        data={data}
        columns={[
          { 
            Header: "名前", 
            accessor: "member.name",
            width: 110,
            className: "text-center",
            Cell: row => <span style={{ color: row.original.member.color }}>{row.original.member.emoji}{row.value}</span>,
          },{ 
            Header: "シリーズ",
            accessor: "series.series",
            width: 220,
            className: "text-center",
          },{ 
            Header: "サイズ",
            accessor: "series.size",
            width: 60,
            className: "text-center",
          },{
            Header: "販売日", accessor: "series.sold_at", width: 90, className: "text-center"
          },{
            Header: "価格", 
            accessor: "series.price", 
            width: 120,
            Cell: row => row.value 
              ? <span>￥{row.original.series.price_commify}- (税込)</span>
              : <span style={{ color: "#bbb" }}>(プライズ)</span>
          },{
            Header: "駿河屋",
            accessor: "surugaya.price",
            width: 100,
            className: "text-center",
            Cell: row => row.value
              ? <span>￥{row.original.surugaya.price}-</span>
              : <span style={{ color: "#bbb" }}>(在庫なし)</span>
          }
        ]} />
    </div>
  }
}

NesoListTab.propTypes = {
  data: PropTypes.array.isRequired,
  onRowClick: PropTypes.func.isRequired,
}

export default NesoListTab
