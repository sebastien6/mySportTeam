import React from 'react'
import { History } from 'history'
import { Card, Image, Icon } from 'semantic-ui-react'

import Auth from '../../auth/Auth'
import { GameItem } from '../../types/games'

interface GameProps {
  game: GameItem
  auth: Auth
  history: History
}

interface GameState {
  game: GameItem
  win: string
}

export class GameCard extends React.PureComponent<GameProps, GameState> {
  state: GameState = {
    game: {} as GameItem,
    win: 'notPlay'
  }

  async componentDidMount() {
    try {
      const game = this.props.game
      const win = this.teamWin(this.props.game.teamScore, this.props.game.opponentScore)
      this.setState({
        game,
        win
      })
    } catch (e) {
      alert(`Failed to fetch teams: ${e.message}`)
    }
  }

  teamWin(t: number, o: number): string {
    if (t > o){
        return 'win'
    } else if (t < o) {
        return 'tie'
    } else if (t === o) {
        return 'tie'
    }

    return 'loose'
     
  }

  pickColor(): any {
    if (this.state.win === 'win') {
        return 'blue'
    } else if (this.state.win === 'tie') {
        return 'orange'
    } else if (this.state.win === 'loose') {
        return 'red'
    } else {
        return 'grey'
    }
  }

  render() {
    return (
        <Card color={this.pickColor()}>
        <Image src={this.state.game.gamePicture} wrapped ui={false} />
        <Card.Content>
          <Card.Header>vs {this.state.game.opponentTeam}</Card.Header>
          <Card.Meta>
            <p className='location'>Location: {this.state.game.location}</p>
            <p className='date'>Date: {this.state.game.date}</p>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
            <Icon name={this.state.win === 'win' ? 'winner' : undefined} />{this.state.game.teamScore} - {this.state.game.opponentScore}<Icon name={this.state.win === 'loose' ? 'winner' : undefined} />
            
        </Card.Content>
      </Card>
    )
  }
}


