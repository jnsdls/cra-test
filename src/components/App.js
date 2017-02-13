import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import '../styles/App.css';

import {connect} from 'react-redux';

import {ADD_GAME} from '../actions/games';
import {PING} from '../actions/ping';

import {Observable} from 'rxjs';

class App extends Component {

  componentDidMount(){

    const socket$ = Observable.webSocket('wss://echo.websocket.org');

    const WebSocketTest = (test) =>
      socket$.multiplex(
        () => JSON.stringify({sub: test}),
        () => JSON.stringify({unsub: test}),
        d=> d
      )
        .do(e => console.log(e))
        .retryWhen(
          error$ => error$.switchMap(err =>
          navigator.onLine ?
          Observable.timer(1000) :
          Observable.fromEvent(document, 'online')
          )
        );

    WebSocketTest('meow')
      .subscribe(event => console.log(event));


    const {dispatch} = this.props;

    setTimeout(() => {
      dispatch({type: ADD_GAME, payload: {
        title: 'Game 1'
      }})
    }, 100);
    setTimeout(() => {
      dispatch({type: ADD_GAME, payload: {
        title: 'Game 2'
      }})
    }, 1000);
    setTimeout(() => {
      dispatch({type: ADD_GAME, payload: {
        title: 'Game 3'
      }})
    }, 4000);


  }

  render() {
    const {games, ping, dispatch} = this.props;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <ul className="App-intro">
          {games.map(game => <li key={game.title}>{game.title}</li>)}
        </ul>
        <div>
          <h3>is pinging: {ping.isPinging.toString()}</h3>
          <button onClick={() => {
            dispatch({type: PING})
          }}>send ping</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state
};

export default connect(mapStateToProps)(App);
