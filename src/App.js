import React, { Component } from 'react'
import Home from './containers/Home.js'
import Navigation from './components/Navigation.js'
import About from './components/About.js'
import Offer from './components/Offer.js'
import Gallery from './components/Gallery.js'
import Contact from './components/Contact.js'
import Cookies from './components/Cookies.js'
import Privacy from './components/Privacy.js'
import Backdrop from './components/generalUI/Backdrop.js'
import NotFound from './components/NotFound.js'
import './App.scss'
import './Mobile.scss'
import Footer from './components/Footer.js'
import { Switch, Route, withRouter } from 'react-router-dom'
import { Transition } from 'react-transition-group'
import { connect } from 'react-redux'
import { tryInitAuth } from './store/actions/authActions'
import { toggleBackdrop } from './store/actions/UIActions'

class App extends Component {

  toggleNavigation = () => {
    let toggleValue = this.props.hideNav;
    if(!this.props.showForm) {
      toggleValue = !toggleValue;
    }
      this.props.toggleBackdrop(false, toggleValue);
  }

  componentDidMount() {
    this.props.tryInitAuth();
  }

  render() {
    const transitionStyles = {
      entering: 1,
      entered:  1,
      exiting:  0,
      exited:  0,
  };
    const backdrop = (
      <Transition
      in={this.props.backdrop}
      timeout={500}
      onEnter={node => node.offsetHeight}
      mountOnEntering
      unmountOnExit>
        {state => (
            <Backdrop
            style={{
              transition: 'opacity .5s ease-out',
              opacity: transitionStyles[state]
            }}
            dismissBackdrop={() => this.props.toggleBackdrop()}/>
        )}
      </Transition>
    )


    return (
      <div className="App">
      {backdrop}
        <Navigation
          toggleNavigation={this.toggleNavigation}
          activeNavigation={this.props.hideNav}/>
          <div className="transparentBoard"></div>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/offer" component={Offer}/>
          <Route path="/gallery" component={Gallery}/>
          <Route path="/contact" component={Contact}/>
          <Route path="/cookies" component={Cookies}/>
          <Route path="/privacy" component={Privacy}/>
          <Route path="*" component={NotFound }/>
        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    backdrop: state.ui.showBackdrop,
    hideNav: state.ui.hideNav,
    showForm: state.ui.showForm
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tryInitAuth: () => dispatch(tryInitAuth()),
    toggleBackdrop: (showForm, hideNav) => dispatch(toggleBackdrop(showForm, hideNav))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
