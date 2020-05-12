import React, { Component } from 'react'
import { Link, Route, Router, Switch } from 'react-router-dom'
import { Grid, Menu, Segment } from 'semantic-ui-react'

import Auth from './auth/Auth'
import { LogIn } from './components/LogIn'
import { NotFound } from './components/NotFound'
import { Teams } from './components/teams/Teams'
import { Team } from './components/teams/Team'
import { EditTeam } from './components/teams/TeamEdit'
import { Players } from './components/players/Players'
import { EditPlayer } from './components/players/PlayerEdit'
import { Games } from './components/games/Games'
import { EditGame } from './components/games/GameEdit'


export interface AppProps {}

export interface AppProps {
  auth: Auth
  history: any
}

export interface AppState {}

export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogin() {
    this.props.auth.login()
  }

  handleLogout() {
    this.props.auth.logout()
  }

  render() {
    return (
      <div>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={16}>
                <Router history={this.props.history}>
                  {this.generateMenu()}

                  {this.generateCurrentPage()}
                </Router>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    )
  }

  generateMenu() {
    return (
      <Menu>
        {/* <Menu.Item name="home">
          <Link to="/">Home</Link>
        </Menu.Item> */}
        <Menu.Item name="Teams">
          <Link to="/">Teams</Link>
        </Menu.Item>
        <Menu.Item name="Players">
          <Link to="/players">Players</Link>
        </Menu.Item>
        <Menu.Item name="Games">
          <Link to="/games">Games</Link>
        </Menu.Item>

        <Menu.Menu position="right">{this.logInLogOutButton()}</Menu.Menu>
      </Menu>
    )
  }

  logInLogOutButton() {
    if (this.props.auth.isAuthenticated()) {
      return (
        <Menu.Item name="logout" onClick={this.handleLogout}>
          Log Out
        </Menu.Item>
      )
    } else {
      return (
        <Menu.Item name="login" onClick={this.handleLogin}>
          Log In
        </Menu.Item>
      )
    }
  }

  generateCurrentPage() {
    if (!this.props.auth.isAuthenticated()) {
      return <LogIn auth={this.props.auth} />
    }

    return (
      <Switch>
        <Route
          path="/"
          exact
          render={props => {
            return <Teams {...props} auth={this.props.auth} />
          }}
        />

        <Route
          path="/team/edit/:Id"
          exact
          render={props => {
            return <EditTeam {...props} auth={this.props.auth} />
          }}
        />

        <Route
          path="/team/:teamId"
          exact
          render={props => {
            return <Team {...props} auth={this.props.auth} />
          }}
        />

        <Route
          path="/games"
          exact
          render={props => {
            return <Games {...props} auth={this.props.auth} />
          }}
        />

        <Route
          path="/game/edit/:Id"
          exact
          render={props => {
            return <EditGame {...props} auth={this.props.auth} />
          }}
        />

        <Route
          path="/players"
          exact
          render={props => {
            return <Players {...props} auth={this.props.auth} />
          }}
        />

        <Route
          path="/player/edit/:Id"
          exact
          render={props => {
            return <EditPlayer {...props} auth={this.props.auth} />
          }}
        />

        <Route component={NotFound} />
      </Switch>
    )
  }
}
