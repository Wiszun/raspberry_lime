import React, { Component } from 'react';

class Backdrop extends Component {
    render () {

      return (
        <div className="backdrop" style={this.props.style} onClick={this.props.dismissBackdrop}></div>
      );
    }

};

export default Backdrop;
