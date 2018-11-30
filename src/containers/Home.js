import React, { Component } from 'react'
import Form from '../components/Form.js'
import { Transition } from 'react-transition-group'
import { toggleBackdrop } from '../store/actions/UIActions'
import { connect } from 'react-redux'

class Home extends Component {

  showForm = () => {
    this.props.toggleBackdrop(true);
  }

    render () {
      const transitionStyles = {
        entering: 1,
        entered:  1,
        exiting:  0,
        exited:  0,
    };
      return (
        <React.Fragment>
          <Transition
          in={this.props.form}
          timeout={500}
          onEnter={node => node.offsetHeight}
          mountOnEntering
          unmountOnExit>
            {state => (
              <div>
                <Form style={{
                  transition: 'opacity .5s ease-out',
                  opacity: transitionStyles[state]
                }} />
              </div>
            )}
          </Transition>

          <section id="home">
            <h1>Raspberry kingdom</h1>
            <div className="button" onClick={this.showForm}>Enter the gates</div>
          </section>
        </React.Fragment>
      );
    }

};

const mapStateToProps = state => {
  return {
    backdrop: state.ui.showBackdrop,
    form: state.ui.showForm
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleBackdrop: (showForm) => dispatch(toggleBackdrop(showForm)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
