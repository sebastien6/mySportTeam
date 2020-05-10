import { History } from 'history'
import * as React from 'react'
import {
  Card,
  Grid,
  Header,
  Icon,
  Button,
  Divider,
  Loader,
  CardGroup,
  GridRow,
  GridColumn,
} from 'semantic-ui-react'

import { getTeam } from '../../api/teams'
import { getTeamPlayers } from '../../api/players'
import { getTeamGames } from '../../api/games'
import Auth from '../../auth/Auth'
import { TeamItem } from '../../types/teams'
import { PlayerItem } from '../../types/players'
import { GameItem } from '../../types/games'
import { PlayerCard } from '../players/PlayerCard'
import { GameCard } from '../games/GameCard'
import { deleteTeam } from '../../api/teams'

interface TeamProps {
  match: {
    params: {
      teamId: string
    }
  }
  auth: Auth
  history: History
}

interface TeamState {
  team: TeamItem
  players: PlayerItem[]
  games: GameItem[]
  loading: boolean
}

export class Team extends React.PureComponent<TeamProps, TeamState> {
  state: TeamState = {
    team: {} as TeamItem,
    players: [],
    games: [],
    loading: true
  }

  async componentDidMount() {
    try {
      const team = await getTeam(this.props.auth.getIdToken(), this.props.match.params.teamId)
      const players = await getTeamPlayers(this.props.auth.getIdToken(), this.props.match.params.teamId)
      const games = await getTeamGames(this.props.auth.getIdToken(), this.props.match.params.teamId)

      this.setState({
        team,
        players,
        games,
        loading: false
      })

    } catch (e) {
      alert(`Failed to fetch team ${this.props.match.params.teamId}: ${e.message}`)
    }
  }

  handleEditClick(teamId: string) {
    this.props.history.push(`/team/${teamId}/edit`)
  }

  async handleDeleteClick() {
    await deleteTeam(this.props.auth.getIdToken(), this.state.team.SK)
    console.log(`team ${this.state.team.SK} deleted`)
    this.props.history.push(`/`)
  }

  handleNewPlayerClick() {
    this.props.history.push(`/player/create/${this.props.match.params.teamId}`)
  }

  handleNewGameClick() {
    this.props.history.push(`/game/create/${this.props.match.params.teamId}`)
  }

  render() {
    return (
      <div>
          <Grid>
            <GridRow>
              <GridColumn width={13} verticalAlign="middle">
              <Header as="h1">{this.state.team.name}</Header>
              </GridColumn>
              <GridColumn width={1} verticalAlign="middle">
              <Button icon onClick={() => this.handleDeleteClick()}>Edit
            <Icon name='pencil alternate' />
          </Button>
              </GridColumn>
              <GridColumn width={1} verticalAlign="middle">
              <Button icon onClick={() => this.handleDeleteClick()}> Delete
            <Icon name='delete' />
          </Button>
              </GridColumn>
            </GridRow>
          </Grid>
        
          <Divider />
          
          <Grid>
            <GridRow>
              <GridColumn width={13} verticalAlign="middle">
              <h2>Players</h2>
              </GridColumn>
              <GridColumn width={2} verticalAlign="middle">
              <Button onClick={() => this.handleNewPlayerClick()}>
                New Player
              </Button>
              </GridColumn>
            </GridRow>
          </Grid>
          
          {this.renderPlayers()}
          
          <Divider />
          <Grid>
            <GridRow>
              <GridColumn width={13} verticalAlign="middle">
              <h2>Games</h2>
              </GridColumn>
              <GridColumn width={2} verticalAlign="middle">
              <Button onClick={() => this.handleNewGameClick()}>
                New Game
              </Button>
              </GridColumn>
            </GridRow>
          </Grid>
          
          {this.renderGames()}
        
      </div>
    )
  }

  renderGames() {
    if (this.state.loading) {
      return this.renderLoading()
    }

    return this.renderGamesList()
  }

  renderPlayers() {
    if (this.state.loading) {
      return this.renderLoading()
    }

    return this.renderPlayersList()
  }

  renderLoading() {
    return (
      <Grid.Row>
        <Loader indeterminate active inline="centered">
          Fetching data
        </Loader>
      </Grid.Row>
    )
  }

  pickSportIcon(sportName: string) {
    if (sportName === 'Hockey') {
      return <Icon link name='hockey puck' />
    }
  }

  // handleClick(teamId: string) {
  //   this.props.history.push(`/teams/${teamId}`)
  // }

  renderPlayersList() {
    const playerComponents = this.state.players.map(item => <PlayerCard key={item.SK} player={item} auth={this.props.auth} history={this.props.history}/>)

    return (
      <CardGroup>
        {playerComponents}
      </CardGroup>
    )
  }

  renderGamesList() {
    const gameComponents = this.state.games.map(item => <GameCard key={item.SK} game={item} auth={this.props.auth} history={this.props.history}/>)

    return (
      <CardGroup>
        {gameComponents}
      </CardGroup>
    )
  }
}
