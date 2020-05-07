import dateFormat from 'dateformat'
import { History } from 'history'
import update from 'immutability-helper'
import * as React from 'react'
import {
  Button,
  Checkbox,
  Divider,
  Grid,
  Header,
  Icon,
  Input,
  Image,
  Loader
} from 'semantic-ui-react'

import { createTeam, getTeams, deleteTeam, patchTeam } from '../api/teams'
import Auth from '../auth/Auth'
import { Team } from '../types/teams'

interface TeamsProps {
  auth: Auth
  history: History
}

interface TeamsState {
  teams: Team[]
  newTeamName: string
  newSport: string
  newSeason: string
  loadingTeams: boolean
}

export class Teams extends React.PureComponent<TeamsProps, TeamsState> {
  state: TeamsState = {
    teams: [],
    newTeamName: '',
    newSport: '',
    newSeason: '',
    loadingTeams: true
  }

  handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newTeamName: event.target.value })
  }

  onEditButtonClick = (teamId: string) => {
    this.props.history.push(`/teams/${teamId}/edit`)
  }

  onTeamCreate = async (event: React.ChangeEvent<HTMLButtonElement>) => {
    try {
      // const dueDate = this.calculateDueDate()
      const newTeam = await createTeam(this.props.auth.getIdToken(), {
        name: this.state.newTeamName,
        sport: this.state.newSport,
        season: this.state.newSeason
      })
      this.setState({
        teams: [...this.state.teams, newTeam],
        newTeamName: ''
      })
    } catch {
      alert('Team creation failed')
    }
  }

  onTeamDelete = async (teamId: string) => {
    try {
      await deleteTeam(this.props.auth.getIdToken(), teamId)
      this.setState({
        teams: this.state.teams.filter(team => team.teamId != teamId)
      })
    } catch {
      alert('Team deletion failed')
    }
  }

  onTeamCheck = async (pos: number) => {
    try {
      const team = this.state.teams[pos]
      await patchTeam(this.props.auth.getIdToken(), team.teamId, {
        name: team.name,
        sport: team.sport,
        season: team.season,
        retired: team.retired
      })
      this.setState({
        teams: update(this.state.teams, {
          [pos]: { retired: { $set: !team.retired }
         }
        })
      })
    } catch {
      alert('Todo deletion failed')
    }
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
        <Header as="h1">Teams</Header>

        {this.renderCreateTeamInput()}

        {this.renderTeams()}
      </div>
    )
  }

  renderCreateTeamInput() {
    return (
      <Grid.Row>
        <Grid.Column width={16}>
          <Input
            action={{
              color: 'teal',
              labelPosition: 'left',
              icon: 'add',
              content: 'New task',
              onClick: this.onTeamCreate
            }}
            fluid
            actionPosition="left"
            placeholder="To change the world..."
            onChange={this.handleNameChange}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Divider />
        </Grid.Column>
      </Grid.Row>
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
          Loading TEAMs
        </Loader>
      </Grid.Row>
    )
  }

  renderTeamsList() {
    return (
      <Grid padded>
        {this.state.teams.map((team, pos) => {
          return (
            <Grid.Row key={team.teamId}>
              <Grid.Column width={1} verticalAlign="middle">
                <Checkbox
                  onChange={() => this.onTeamCheck(pos)}
                  checked={team.retired}
                />
              </Grid.Column>
              <Grid.Column width={6} verticalAlign="middle">
                {team.name}
              </Grid.Column>
              <Grid.Column width={3} floated="right">
                {team.sport}
              </Grid.Column>
              <Grid.Column width={3} floated="right">
                {team.season}
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="blue"
                  onClick={() => this.onEditButtonClick(team.teamId)}
                >
                  <Icon name="pencil" />
                </Button>
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="red"
                  onClick={() => this.onTeamDelete(team.teamId)}
                >
                  <Icon name="delete" />
                </Button>
              </Grid.Column>
              {team.teamPicture && (
                <Image src={team.teamPicture} size="small" wrapped />
              )}
              <Grid.Column width={16}>
                <Divider />
              </Grid.Column>
            </Grid.Row>
          )
        })}
      </Grid>
    )
  }

  // calculateDueDate(): string {
  //   const date = new Date()
  //   date.setDate(date.getDate() + 7)

  //   return dateFormat(date, 'yyyy-mm-dd') as string
  // }
}
