import React from 'react'
import { History } from 'history'
import { Form, Button, Input, Label, Grid, Loader, GridRow, GridColumn, Divider, Message } from 'semantic-ui-react'

import Auth from '../../auth/Auth'
import { GameRequest } from '../../types/GameRequest'
import { patchGame, getGame, createGame, deleteGame } from '../../api/games'
import { UploadImage } from '../UploadImage'


interface EditGameProps {
    match: {
        params: {
            Id: string
        }
    }
    auth: Auth
    history: History
}

interface EditGameState {
    game: GameRequest
    teamId: string
    loading: boolean
    editMode: boolean
    errors: string[]
    showWarning: boolean
}

export class EditGame extends React.PureComponent<EditGameProps, EditGameState> {
    state: EditGameState = {
        game: {
            teamId: '',
            opponentTeam: '',
            opponentScore: 0,
            teamScore: 0,
            location: '',
            date: ''
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
            const game = { ...this.state.game }
            game.teamId = this.props.match.params.Id
            this.setState(() => ({ game, teamId: this.props.match.params.Id, loading: false }))
        } else if (id.startsWith('game')) {
            const fetchedGame = await getGame(this.props.auth.getIdToken(), this.props.match.params.Id)
            const game: GameRequest = {
                teamId: fetchedGame.GSI1,
                opponentTeam: fetchedGame.opponentTeam,
                teamScore: fetchedGame.teamScore,
                opponentScore: fetchedGame.opponentScore,
                location: fetchedGame.location,
                date: fetchedGame.date
            }

            this.setState(() => ({ game, teamId: fetchedGame.GSI1, loading: false, editMode: true }))
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
            await patchGame(this.props.auth.getIdToken(), this.props.match.params.Id, this.state.game)
            this.props.history.goBack()
        } else {
            await createGame(this.props.auth.getIdToken(), this.state.game)
            this.props.history.goBack()
        }
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, value } = event.target
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

    validateFields() {
        if (this.state.game.opponentTeam.length === 0) {
            this.state.errors.push('Add the name of the opponent team')
        }

        if (this.state.game.location.length === 0) {
            this.state.errors.push('Add the game location')
        }

        if (this.state.game.date.length === 0) {
            this.state.errors.push('Add a game date')
        }

        if (isNaN(this.state.game.teamScore)) {
            this.state.errors.push('Add team score or 0')
        }

        if (isNaN(this.state.game.opponentScore)) {
            this.state.errors.push('Add opponent score or 0')
        }
    }

    async onDeleteClick() {
        await deleteGame(this.props.auth.getIdToken(), this.props.match.params.Id)
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

    renderGame() {
        return (
            <div>
                {this.state.showWarning ? this.renderErrors() : null}
                {this.renderGameForm()}
                <Divider></Divider>
                {this.state.editMode
                    ? <UploadImage Id={this.props.match.params.Id} auth={this.props.auth} history={this.props.history}/>
                    : null}
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

    render(): JSX.Element {
        return (
            <div>
                <Grid>
                    <GridRow>
                        <GridColumn width={13}>
                            {this.state.editMode ? <h1>Update Game</h1> : <h1>Create New Game</h1>}

                        </GridColumn>
                        <GridColumn width={2}>
                            <Button color='grey' onClick={() => this.props.history.goBack()}>back</Button>
                        </GridColumn>
                    </GridRow>
                </Grid>

                {this.state.loading ? this.renderLoading() : this.renderGame()}
            </div>
        )
    }

    renderGameForm(): JSX.Element {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <Label>Opponent </Label>
                        <Input
                            type='text'
                            name='opponentTeam'
                            placeholder='opponent team name'
                            onChange={this.handleChange}
                            value={this.state.game.opponentTeam}
                        />
                    </Form.Field>

                    <Form.Field>
                        <Label>Location </Label>
                        <Input
                            type='text'
                            name='location'
                            placeholder='event address'
                            onChange={this.handleChange}
                            value={this.state.game.location}
                        />
                    </Form.Field>

                    <Form.Field>
                        <Label>Date </Label>
                        <Input
                            type='date'
                            name='date'
                            placeholder='event date'
                            onChange={this.handleChange}
                            value={this.state.game.date}
                        />
                    </Form.Field>

                    <Form.Field>
                        <Label>teamScore: </Label>
                        <Input
                            type='number'
                            name='teamScore'
                            placeholder='team score'
                            onChange={this.handleChange}
                            value={this.state.game.teamScore}
                            min="0"
                            max="200"
                            step="1"
                        />
                    </Form.Field>

                    <Form.Field>
                        <Label>opponentScore: </Label>
                        <Input
                            type='number'
                            name='opponentScore'
                            placeholder='opponent score'
                            onChange={this.handleChange}
                            value={this.state.game.opponentScore}
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