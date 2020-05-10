import React from 'react'
import { History } from 'history'
import { Form, Button, Label, Input } from 'semantic-ui-react'

import Auth from '../../auth/Auth'
import { CreateGameRequest } from '../../types/GameRequest'
import { createGame } from '../../api/games'


interface CreateGameProps {
    match: {
        params: {
            teamId: string
        }
    }
    auth: Auth
    history: History
}

interface CreateGameState {
    game: CreateGameRequest
}

export class CreateGame extends React.PureComponent<CreateGameProps, CreateGameState> {
    state: CreateGameState = {
        game: {} as CreateGameRequest,
    }

    componentDidMount() {
        const game = { ...this.state.game, ['teamId']: this.props.match.params.teamId }
        this.setState(() => ({ game }))
    }
    
    handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        await createGame(this.props.auth.getIdToken(), this.state.game)
        this.props.history.push(`/team/${this.props.match.params.teamId}`)
    }
    
    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, type, value} = event.target
        if (type === 'text') {
            const game = { ...this.state.game, [name]: value }
            this.setState(() => ({ game }))
        }

        if (type === 'number') {
            const game = { ...this.state.game, [name]: parseInt(value) }
            this.setState(() => ({ game }))
        }

        if (type === 'date') {
            const game = { ...this.state.game, [name]: value.toString() }
            this.setState(() => ({ game }))
        }
    }

    render(): JSX.Element {
        return (
        <div>
            <h1>Create new game</h1> <i>(* mandatory field)</i>

            <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                    <Label>Opponent </Label>
                    <Input
                        label={{ icon: 'asterisk' }}
                        labelPosition='right corner'
                        type='text'
                        name='opponentTeam'
                        placeholder='opponent team name'
                        onChange={this.handleChange}
                    />
                </Form.Field>

                <Form.Field>
                    <Label>Location </Label>
                    <Input
                        label={{ icon: 'asterisk' }}
                        labelPosition='right corner'
                        type='text'
                        name='location'
                        placeholder='event address'
                        onChange={this.handleChange}
                    />
                </Form.Field>

                <Form.Field>
                    <Label>Date </Label>
                    <Input
                        label={{ icon: 'asterisk' }}
                        labelPosition='right corner'
                        type='date'
                        name='date'
                        placeholder='event date'
                        onChange={this.handleChange}
                    />
                </Form.Field>

                <Form.Field>
                    <Label>teamScore: </Label>
                    <Input
                        type='number'
                        name='teamScore'
                        placeholder='team score'
                        onChange={this.handleChange}
                    />
                </Form.Field>

                <Form.Field>
                    <Label>opponentScore: </Label>
                    <Input
                        type='number'
                        name='opponentScore'
                        placeholder='opponent score'
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Button type='submit'>Save</Button>
            </Form>
        </div>
        )
    }
}