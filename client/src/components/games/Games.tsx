import { History } from 'history'
import * as React from 'react'
import {
  Card,
  Grid,
  Header,
  Icon,
  Image,
  Button,
  Divider,
  Loader,
  CardGroup
} from 'semantic-ui-react'

import { getGames } from '../../api/games'
import Auth from '../../auth/Auth'
import { GameItem } from '../../types/games'
import { GameCard } from './GameCard'

interface GamesProps {
  auth: Auth
  history: History
}

interface GamesState {
  games: GameItem[]
  loadingGames: boolean
}

export class Games extends React.PureComponent<GamesProps, GamesState> {
  state: GamesState = {
    games: [],
    loadingGames: true
  }

  async componentDidMount() {
    try {
      const games = await getGames(this.props.auth.getIdToken())
      this.setState({
        games,
        loadingGames: false
      })
    } catch (e) {
      alert(`Failed to fetch games: ${e.message}`)
    }
  }

  render() {
    return (
      <div>
        <Header as="h1">GAMES</Header>

        <Button type="submit">
          New Game
        </Button>
        <Divider />

        {this.renderGames()}
      </div>
    )
  }

  renderGames() {
    if (this.state.loadingGames) {
      return this.renderLoading()
    }

    return this.renderGamesList()
  }

  renderLoading() {
    return (
      <Grid.Row>
        <Loader indeterminate active inline="centered">
          Loading Games
        </Loader>
      </Grid.Row>
    )
  }

  handleClick(gameId: string) {
    this.props.history.push(`/game/${gameId}`)
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
