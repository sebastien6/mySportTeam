import React from 'react'
import { History } from 'history'
import { Form, Button, Input, Label, Grid, Loader, GridRow, GridColumn, Divider, Message } from 'semantic-ui-react'

import Auth from '../../auth/Auth'
import { PlayerRequest } from '../../types/PlayerRequest'
import { patchPlayer, getPlayer, createPlayer, deletePlayer } from '../../api/players'
import { UploadImage } from '../UploadImage'

interface EditPlayerProps {
    match: {
        params: {
            Id: string
        }
    }
    auth: Auth
    history: History
}

interface EditPlayerState {
    player: PlayerRequest
    teamId: string
    loading: boolean
    editMode: boolean
    errors: string[]
    showWarning: boolean
}

export class EditPlayer extends React.PureComponent<EditPlayerProps, EditPlayerState> {
    state: EditPlayerState = {
        player: {
            firstName: '',
            lastName: '',
            yearOfBirth: 1900,
            position: "none",
            jerseyNumber: 0
        },
        teamId: '',
        loading: true,
        editMode: false,
        errors: [],
        showWarning: false
    }

    async componentDidMount() {
        const id = this.props.match.params.Id

        if (id.startsWith('team')) {
            const player = { ...this.state.player }
            this.setState(() => ({ player, teamId: this.props.match.params.Id, loading: false }))
        } else if (id.startsWith('player')) {
            const fetchedPlayer = await getPlayer(this.props.auth.getIdToken(), this.props.match.params.Id)
            const player: PlayerRequest = {
                firstName: fetchedPlayer.firstName,
                lastName: fetchedPlayer.lastName,
                yearOfBirth: fetchedPlayer.yearOfBirth,
                jerseyNumber: fetchedPlayer.jerseyNumber,
                position: fetchedPlayer.position
            }

            this.setState(() => ({ player, teamId: fetchedPlayer.GSI1, loading: false, editMode: true }))
        } else {
            alert(`Invalid URI path`)
        }
    }

    handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        this.validateFields()

        if (this.state.errors.length > 0) {
            this.setState(() => ({ showWarning: true }))
        } else if (this.state.editMode) {
            await patchPlayer(this.props.auth.getIdToken(), this.props.match.params.Id, this.state.player)
            this.props.history.goBack()
        } else {
            await createPlayer(this.props.auth.getIdToken(), this.state.player)
            this.props.history.goBack()
        }
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

    validateFields() {
        if (this.state.player.firstName.length === 0) {
            this.state.errors.push('Add player first name')
        }

        if (this.state.player.lastName.length === 0) {
            this.state.errors.push('Add player last name')
        }

        if (isNaN(this.state.player.yearOfBirth)) {
            this.state.errors.push('Add player year of birth (YYYY)')
        }

        if (isNaN(this.state.player.lastName.length)) {
            this.state.errors.push('Add player position or none or N/A')
        }

        if (isNaN(this.state.player.yearOfBirth)) {
            this.state.errors.push('Add player jersey number or 0')
        }
        
    }

    async onDeleteClick() {
        await deletePlayer(this.props.auth.getIdToken(), this.props.match.params.Id)
        this.props.history.goBack()
    }

    renderLoading(): JSX.Element {
        return (
            <Grid.Row>
                <Loader indeterminate active inline="centered">
                    Loading
            </Loader>
            </Grid.Row>
        )
    }

    renderPlayer() {
        return (
            <div>
                {this.state.showWarning ? this.renderErrors() : null}
                {this.renderPlayerForm()}
                <Divider></Divider>
                {this.state.editMode
                    ? <UploadImage Id={this.props.match.params.Id} auth={this.props.auth}  history={this.props.history}/>
                    : null}
            </div>
        )
    }

    render(): JSX.Element {
        return (
            <div>
                <Grid>
                    <GridRow>
                        <GridColumn width={13}>
                            {this.state.editMode ? <h1>Update Player</h1> : <h1>Create New Player</h1>}

                        </GridColumn>
                        <GridColumn width={2}>
                            <Button color='grey' onClick={() => this.props.history.goBack()}>back</Button>
                        </GridColumn>
                    </GridRow>
                </Grid>

                {this.state.loading ? this.renderLoading() : this.renderPlayer()}
            </div>
        )
    }

    renderErrors(): JSX.Element {
        return (
            <Message warning>
                <Message.Header>Please add the following missing information and re-submit:</Message.Header>
                <Message.List>
                    {this.state.errors.map((element, pos): JSX.Element => {
                        return (

                            <Message.Item key={pos}>{element}</Message.Item>

                        )
                    })}
                </Message.List>
            </Message>
        )
    }

    renderPlayerForm(): JSX.Element {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <Label>First Name</Label>
                        <Input
                            type='text'
                            name='firstName'
                            placeholder='Add player first name'
                            value={this.state.player.firstName}
                            onChange={this.handleChange}
                        />
                    </Form.Field>

                    <Form.Field>
                        <Label>Last Name</Label>
                        <Input
                            type='text'
                            name='lastName'
                            placeholder='Add player last name'
                            value={this.state.player.lastName}
                            onChange={this.handleChange}
                        />
                    </Form.Field>

                    <Form.Field>
                        <Label>Born in</Label>
                        <Input
                            type='number'
                            name='yearOfBirth'
                            placeholder='Add player year of birth (yyyy)'
                            value={this.state.player.yearOfBirth}
                            onChange={this.handleChange}
                            min="1900"
                            max="2099"
                            start='1'
                            step="1"
                        />
                    </Form.Field>

                    <Form.Field>
                        <Label>Position </Label>
                        <Input
                            type='text'
                            name='position'
                            placeholder='Add player position or none or N/A'
                            value={this.state.player.position}
                            onChange={this.handleChange}
                        />
                    </Form.Field>

                    <Form.Field>
                        <Label>Jersey Number </Label>
                        <Input
                            type='number'
                            name='jerseyNumber'
                            placeholder='Add player jersey number or 0'
                            value={this.state.player.jerseyNumber}
                            onChange={this.handleChange}
                            min="0"
                            max="200"
                            step="1"
                        />
                    </Form.Field>
                    <Grid>
                        <GridRow>
                            <GridColumn width='2'>
                                <Button color='green' type='submit'>Save</Button>
                            </GridColumn>
                            <GridColumn width='11'>

                            </GridColumn>
                            <GridColumn width='2'>
                                {this.state.editMode
                                    ? <Button color='red' onClick={() => this.onDeleteClick()}>Delete</Button>
                                    : null}
                            </GridColumn>
                        </GridRow>
                    </Grid>

                </Form>
            </div>
        )
    }
}