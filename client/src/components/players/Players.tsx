import { History } from 'history'
import * as React from 'react'
import {
  Card,
  Grid,
  Header,
  Icon,
  Image,
  Loader,
  CardGroup,
  Button,
  Divider
} from 'semantic-ui-react'

import { getPlayers, getPlayer } from '../../api/players'
import Auth from '../../auth/Auth'
import { PlayerItem } from '../../types/players'
import { PlayerCard } from './PlayerCard'

interface PlayersProps {
  auth: Auth
  history: History
}

interface PlayersState {
  players: PlayerItem[]
  loadingPlayers: boolean
}

export class Players extends React.PureComponent<PlayersProps, PlayersState> {
  state: PlayersState = {
    players: [],
    loadingPlayers: true
  }

  async componentDidMount() {
    try {
      const players = await getPlayers(this.props.auth.getIdToken())
      this.setState({
        players,
        loadingPlayers: false
      })
    } catch (e) {
      alert(`Failed to fetch teams: ${e.message}`)
    }
  }

  render() {
    return (
      <div>
        <Header as="h1">PLAYERS</Header>

        <Button type="submit">
          New Player
        </Button>
        <Divider />

        {this.renderPlayers()}
      </div>
    )
  }

  renderPlayers() {
    if (this.state.loadingPlayers) {
      return this.renderLoading()
    }

    return this.renderPlayersList()
  }

  renderLoading() {
    return (
      <Grid.Row>
        <Loader indeterminate active inline="centered">
          Loading Players
        </Loader>
      </Grid.Row>
    )
  }

  handleClick(teamId: string) {
    this.props.history.push(`/team/${teamId}`)
  }

  renderPlayersList() {
    const playerComponents = this.state.players.map(item => <PlayerCard {...this.props} key={item.SK} player={item}/>)

    return (
      <CardGroup>
        {playerComponents}
      </CardGroup>
    )
  }
}
