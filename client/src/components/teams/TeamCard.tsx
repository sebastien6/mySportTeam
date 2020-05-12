import React from 'react'
import { History } from 'history'
import { Card, Image, Icon } from 'semantic-ui-react'

// import Auth from '../../auth/Auth'
import { TeamItem } from '../../types/teams'
import { generateKeyPair } from 'crypto'

interface TeamProps {
  team: TeamItem
  history: History
}

interface TeamState {
  team: TeamItem
}

export class TeamCard extends React.PureComponent<TeamProps, TeamState> {
  state: TeamState = {
    team: {} as TeamItem,
  }

  async componentDidMount() {
    try {
      const team = this.props.team
      this.setState({
        team,
      })
    } catch (e) {
      alert(`Failed to fetch teams: ${e.message}`)
    }
  }

  pickSportIcon(sportName: string) {
    if (sportName === undefined) {
      sportName = 'None'
    }
    switch (sportName.toLowerCase()) {
        case 'hockey':
            return <Icon name='hockey puck'/>;
        case 'baseball':
            return <Icon name='baseball ball'/>;
        case 'basketball':
            return <Icon name='basketball ball'/>;
        case 'bowling':
            return <Icon name='bowling ball'/>;
        case 'football':
            return <Icon name='football ball'/>;
        case 'soccer':
            return <Icon name='futbol'/>;
        case 'golf':
            return <Icon name='golf ball'/>;
        case 'quidditch':
            return <Icon name='quidditch'/>;
        case 'table tennis':
            return <Icon name='table tennis'/>;
        case 'volleyball':
            return <Icon name='volleyball ball'/>;
    }
  }

  handleClick(teamId: string) {
    this.props.history.push(`/team/${teamId}`)
  }

  render() {
    console.log('this.state.team.name')
    return (
        <Card onClick={() => this.handleClick(this.state.team.SK)} color={this.state.team.retired ? 'grey' : 'teal'}>
            <Image src={this.state.team.teamPicture} wrapped ui={false} />
            <Card.Content>
    <Card.Header>{this.state.team.name}   
    {this.state.team.retired ? <span>&nbsp;&nbsp;(Retired)</span> : null }</Card.Header>
                <Card.Meta>
                <span className='date'>Season: {this.state.team.season}</span>
                </Card.Meta>
            </Card.Content>
            <Card.Content>
            {this.pickSportIcon(this.state.team.sport)} {this.state.team.sport}
            </Card.Content>
        </Card>
    )
  }
}


