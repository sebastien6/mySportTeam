import React from 'react'
import { History } from 'history'
import { Form, Button, Input, Label } from 'semantic-ui-react'

import Auth from '../../auth/Auth'
import { CreatePlayerRequest } from '../../types/PlayerRequest'
import { createPlayer } from '../../api/players'

interface CreatePlayerProps {
    match: {
        params: {
            teamId: string
        }
    }
    auth: Auth
    history: History
}

interface CreatePlayerState {
    player: CreatePlayerRequest
}

export class CreatePlayer extends React.PureComponent<CreatePlayerProps, CreatePlayerState> {
    state: CreatePlayerState = {
        player: {} as CreatePlayerRequest,
    }

    componentDidMount() {
        const player = { ...this.state.player, ['teamId']: this.props.match.params.teamId }
        this.setState(() => ({ player }))
    }
    
    handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        await createPlayer(this.props.auth.getIdToken(), this.state.player)
        this.props.history.push(`/team/${this.props.match.params.teamId}`)
    }
    
    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, type, value} = event.target
        if (type === 'text') {
            const player = { ...this.state.player, [name]: value }
            this.setState(() => ({ player }))
        }

        if (type === 'number') {
            const player = { ...this.state.player, [name]: parseInt(value) }
            this.setState(() => ({ player }))
        }
    }

    render(): JSX.Element {
        return (
        <div>
            <h1>Create new player</h1> <i>(* mandatory field)</i>

            <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                    <Label>First Name *</Label>
                    <Input
                        label={{ icon: 'asterisk' }}
                        labelPosition='right corner'
                        type='text'
                        name='firstName'
                        placeholder='first name'
                        onChange={this.handleChange}
                    />
                </Form.Field>

                <Form.Field>
                    <Label>Last Name *</Label>
                    <Input
                        label={{ icon: 'asterisk' }}
                        labelPosition='right corner'
                        type='text'
                        name='lastName'
                        placeholder='last name'
                        onChange={this.handleChange}
                    />
                </Form.Field>

                <Form.Field>
                    <Label>Born in * </Label>
                    <Input
                        label={{ icon: 'asterisk' }}
                        labelPosition='right corner'
                        type='number'
                        name='yearOfBirth'
                        placeholder='year of birth (yyyy)'
                        onChange={this.handleChange}
                        min="1900"
                        max="2099"
                        step="1"
                    />
                </Form.Field>

                <Form.Field>
                    <Label>Position: </Label>
                    <Input
                        type='text'
                        name='position'
                        placeholder='player position'
                        onChange={this.handleChange}
                    />
                </Form.Field>

                <Form.Field>
                    <Label>Jersey Number: </Label>
                    <Input
                        type='number'
                        name='jerseyNumber'
                        placeholder='jersey number'
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Button type='submit'>Save</Button>
            </Form>
        </div>
        )
    }
}