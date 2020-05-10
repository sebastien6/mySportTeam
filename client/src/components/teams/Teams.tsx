import { History } from 'history'
import * as React from 'react'
import {
  Card,
  Grid,
  Header,
  Icon,
  Image,
  Button,
  Loader,
  CardGroup,
  Divider
} from 'semantic-ui-react'

import { getTeams } from '../../api/teams'
import Auth from '../../auth/Auth'
import { TeamItem } from '../../types/teams'
import { TeamCard } from './TeamCard'

interface TeamsProps {
  auth: Auth
  history: History
}

interface TeamsState {
  teams: TeamItem[]
  loadingTeams: boolean
}

export class Teams extends React.PureComponent<TeamsProps, TeamsState> {
  state: TeamsState = {
    teams: [],
    loadingTeams: true
  }

  async componentDidMount() {
    try {
      const teams = await getTeams(this.props.auth.getIdToken())
      this.setState({
        teams,
        loadingTeams: false
      })
    } catch (e) {
      alert(`Failed to fetch teams: ${e.message}`)
    }
  }

  render() {
    return (
      <div>
        <Header as="h1">TEAMS</Header>
        <Button type="submit" onClick={() => this.handleNewTeamClick()}>
          New Team
        </Button>
        <Divider />
        {this.renderTeams()}
      </div>
    )
  }

  renderTeams() {
    if (this.state.loadingTeams) {
      return this.renderLoading()
    }

    return this.renderTeamsList()
  }

  renderLoading() {
    return (
      <Grid.Row>
        <Loader indeterminate active inline="centered">
          Loading Teams
        </Loader>
      </Grid.Row>
    )
  }

  pickSportIcon(sportName: string) {
    if (sportName === 'Hockey') {
      return <Icon link name='hockey puck'/>
    }
  }

  handleClick(teamId: string) {
    this.props.history.push(`/team/${teamId}`)
  }

  handleNewTeamClick() {
    this.props.history.push(`/team/create`)
  }

  renderTeamsList() {
    const teamComponents = this.state.teams.map(item => <TeamCard key={item.SK} history={this.props.history} team={item}/>)

    return (
      <CardGroup>
        {teamComponents}
      </CardGroup>
    )
  }
}
