import React from 'react'

class ErrorRoute extends React.Component {
  render(){
    return <div className="container">
      <h3>404 Not Found</h3>
      <p>ファイルがみつからないよ</p>
      <a href="#/">トップへ戻る</a>
    </div>
  }
}

export default ErrorRoute