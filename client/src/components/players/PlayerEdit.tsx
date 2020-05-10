import React from 'react'
import { History } from 'history'
import { Form, Button, Input, Label, Grid, Loader, GridRow, GridColumn } from 'semantic-ui-react'

import Auth from '../../auth/Auth'
import { UpdatePlayerRequest } from '../../types/PlayerRequest'
import { patchPlayer, getPlayer } from '../../api/players'
import { UploadImage } from '../UploadImage'

interface EditPlayerProps {
    match: {
        params: {
            playerId: string
        }
    }
    auth: Auth
    history: History
}

interface EditPlayerState {
    player: UpdatePlayerRequest
    loading: boolean
}

export class EditPlayer extends React.PureComponent<EditPlayerProps, EditPlayerState> {
    state: EditPlayerState = {
        player: {} as UpdatePlayerRequest,
        loading: true
    }

    async componentDidMount() {

        console.log('compMount call')

        const fetchedPlayer = await getPlayer(this.props.auth.getIdToken(), this.props.match.params.playerId)
        console.log(`p is ${JSON.stringify(fetchedPlayer)}`)

        const player: UpdatePlayerRequest = {
            teamId: fetchedPlayer.GSI1,
            firstName: fetchedPlayer.firstName,
            lastName: fetchedPlayer.lastName,
            yearOfBirth: fetchedPlayer.yearOfBirth,
            jerseyNumber: fetchedPlayer.jerseyNumber,
            position: fetchedPlayer.position
        }
        console.log(`player call result: ${JSON.stringify(player)}`)
        this.setState(() => ({ player, loading: false }))
        console.log(`new state: ${JSON.stringify(this.state)}`)

    }

    handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        await patchPlayer(this.props.auth.getIdToken(), this.props.match.params.playerId, this.state.player)
        this.props.history.push(`/team/${this.state.player.teamId}`)
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, value } = event.target
        if (type === 'text') {
            const player = { ...this.state.player, [name]: value }
            this.setState(() => ({ player }))
        }

        if (type === 'number') {
            const player = { ...this.state.player, [name]: parseInt(value) }
            this.setState(() => ({ player }))
        }
    }

    renderLoading(): JSX.Element {
        return (
            <Grid.Row>
                <Loader indeterminate active inline="centered">
                    Loading Teams
            </Loader>
            </Grid.Row>
        )
    }

    renderPlayer() {
        return (
            <div>
                {this.renderPlayerForm()}

                <UploadImage Id={this.props.match.params.playerId} auth={this.props.auth}/>
            </div>
        )
    }

    render(): JSX.Element {
        return (
            <div>
                <Grid>
                    <GridRow>
                        <GridColumn width={4}>
                            <h1>Update Player</h1>
                        </GridColumn>
                        <GridColumn>
                        <i>(* mandatory field)</i>
                        </GridColumn>
                    </GridRow>
                </Grid>

                {this.state.loading ? this.renderLoading() : this.renderPlayer()}
            </div>
        )
    }

    renderPlayerForm(): JSX.Element {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <Label>First Name</Label>
                        <Input
                            label={{ icon: 'asterisk' }}
                            labelPosition='right corner'
                            type='text'
                            name='firstName'
                            placeholder='first name'
                            value={this.state.player.firstName}
                            onChange={this.handleChange}
                        />
                    </Form.Field>

                    <Form.Field>
                        <Label>Last Name</Label>
                        <Input
                            label={{ icon: 'asterisk' }}
                            labelPosition='right corner'
                            type='text'
                            name='lastName'
                            placeholder='last name'
                            value={this.state.player.lastName}
                            onChange={this.handleChange}
                        />
                    </Form.Field>

                    <Form.Field>
                        <Label>Born in</Label>
                        <Input
                            label={{ icon: 'asterisk' }}
                            labelPosition='right corner'
                            type='number'
                            name='yearOfBirth'
                            placeholder='year of birth (yyyy)'
                            value={this.state.player.yearOfBirth}
                            onChange={this.handleChange}
                            min="1900"
                            max="2099"
                            step="1"
                        />
                    </Form.Field>

                    <Form.Field>
                        <Label>Position </Label>
                        <Input
                            type='text'
                            name='position'
                            placeholder='player position'
                            value={this.state.player.position}
                            onChange={this.handleChange}
                        />
                    </Form.Field>

                    <Form.Field>
                        <Label>Jersey Number </Label>
                        <Input
                            type='number'
                            name='jerseyNumber'
                            placeholder='jersey number'
                            value={this.state.player.jerseyNumber}
                            onChange={this.handleChange}
                            min="0"
                            max="200"
                            step="1"
                        />
                    </Form.Field>
                    <Button type='submit'>Save</Button>
                </Form>
            </div>
        )
    }
}