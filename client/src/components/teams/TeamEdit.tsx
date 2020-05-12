import React from 'react'
import { History } from 'history'
import { Form, Button, Input, Label, Grid, Loader, GridRow, GridColumn, Divider, Message } from 'semantic-ui-react'

import Auth from '../../auth/Auth'
import { TeamRequest } from '../../types/TeamRequest'
import { patchTeam, getTeam, createTeam, deleteTeam } from '../../api/teams'
import { UploadImage } from '../UploadImage'

interface EditTeamProps {
    match: {
        params: {
            Id: string
        }
    }
    auth: Auth
    history: History
}

interface EditTeamState {
    team: TeamRequest
    teamId: string
    loading: boolean
    editMode: boolean
    errors: string[]
    showWarning: boolean
}

export class EditTeam extends React.PureComponent<EditTeamProps, EditTeamState> {
    state: EditTeamState = {
        team: {
            name: '',
            sport: '',
            season: '',
            retired: false
        },
        teamId: '',
        loading: true,
        editMode: false,
        errors: [],
        showWarning: false
    }

    async componentDidMount() {
        const id = this.props.match.params.Id

        if (id === 'new') {
            this.setState(() => ({ teamId: this.props.match.params.Id, loading: false }))
        } else if (id.startsWith('team')) {
            const fetchedTeam = await getTeam(this.props.auth.getIdToken(), this.props.match.params.Id)
            const team: TeamRequest = {
                name: fetchedTeam.name,
                sport: fetchedTeam.sport,
                season: fetchedTeam.season,
                retired: fetchedTeam.retired
            }

            this.setState(() => ({ team, teamId: fetchedTeam.SK, loading: false, editMode: true }))
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
            await patchTeam(this.props.auth.getIdToken(), this.props.match.params.Id, this.state.team)
            this.props.history.goBack()
        } else {
            await createTeam(this.props.auth.getIdToken(), this.state.team)
            this.props.history.goBack()
        }
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, value } = event.target
        if (type === 'text') {
            const team = { ...this.state.team, [name]: value }
            this.setState(() => ({ team }))
        }
    }

    handleCheckClick = () => {
        console.log('click and do nothing :(')
        const team = this.state.team
        team.retired = !this.state.team.retired
        this.setState({ team: team });
        this.forceUpdate()
      }

    validateFields() {
        if (this.state.team.name.length === 0) {
            this.state.errors.push('Add a team name')
        }

        if (this.state.team.sport.length === 0) {
            this.state.errors.push('Add a sport (baseball, hockey, volleyball, football, ...)')
        }

        if (this.state.team.season.length === 0) {
            this.state.errors.push('Add a season (1999, 2003-2004)')
        }
    }

    async onDeleteClick() {
        await deleteTeam(this.props.auth.getIdToken(), this.props.match.params.Id)
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

    renderTeam() {
        return (
            <div>
                {this.state.showWarning ? this.renderErrors() : null}
                {this.renderTeamForm()}
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
                            {this.state.editMode ? <h1>Update Team</h1> : <h1>Create New Team</h1>}

                        </GridColumn>
                        <GridColumn width={2}>
                            <Button color='grey' onClick={() => this.props.history.goBack()}>back</Button>
                        </GridColumn>
                    </GridRow>
                </Grid>

                {this.state.loading ? this.renderLoading() : this.renderTeam()}
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

    renderTeamForm(): JSX.Element {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <Label>Team Name</Label>
                        <Input
                            type='text'
                            name='name'
                            placeholder='Add a team name'
                            value={this.state.team.name}
                            onChange={this.handleChange}
                        />
                    </Form.Field>

                    <Form.Field>
                        <Label>Sport</Label>
                        <Input
                            type='text'
                            name='sport'
                            placeholder='Add a sport (baseball, hockey, volleyball, football, ...)'
                            value={this.state.team.sport}
                            onChange={this.handleChange}
                        />
                    </Form.Field>

                    <Form.Field>
                        <Label>Season</Label>
                        <Input
                            type='text'
                            name='season'
                            placeholder='Add a season (1999, 2003-2004)'
                            value={this.state.team.season}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Label>
                        <Input
                            type='checkbox'
                            name='retired'
                            checked={this.state.team.retired ? true : false}
                            onChange={this.handleCheckClick}
                        /> Retired
                        </Label>
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