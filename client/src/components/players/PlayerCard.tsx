import React from 'react'
import { History } from 'history'
import { Card, Image, Icon } from 'semantic-ui-react'

import Auth from '../../auth/Auth'
import { PlayerItem } from '../../types/players'

interface PlayerProps {
  player: PlayerItem
  auth: Auth
  history: History
}

interface PlayerState {
  player: PlayerItem
}

export class PlayerCard extends React.PureComponent<PlayerProps, PlayerState> {
  state: PlayerState = {
    player: {} as PlayerItem,
  }

  async componentDidMount() {
    try {
      const player = this.props.player
      this.setState({
        player,
      })
    } catch (e) {
      alert(`Failed to fetch teams: ${e.message}`)
    }
  }

  onEditClick() {
    this.props.history.push(`/player/edit/${this.state.player.SK}`)
  }

  render(): JSX.Element {
    return (
        <Card color='olive' onClick={() => this.onEditClick()}>
        <Image src={this.state.player.playerPicture} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{this.state.player.firstName} {this.state.player.lastName}</Card.Header>
          <Card.Meta>
            <span className='date'>Born in: {this.state.player.yearOfBirth}</span>
          </Card.Meta>
          <Card.Meta>
            <span className='date'>Position: {this.state.player.position}</span>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
            Jersey #: {this.state.player.jerseyNumber}
        </Card.Content>
      </Card>
    )
  }
}


