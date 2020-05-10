import React from 'react'
import { History } from 'history'
import { Form, Button } from 'semantic-ui-react'

import { CreateTeamRequest } from '../../types/TeamRequest'
import Auth from '../../auth/Auth'
import { createTeam } from '../../api/teams'

interface CreateTeamProps {
    match: {
        params: {
            teamId: string
        }
    }
    auth: Auth
    history: History
}

interface CreateTeamState {
    team: CreateTeamRequest
}

export class CreateTeam extends React.PureComponent<CreateTeamProps, CreateTeamState> {
    state: CreateTeamState = {
        team: {} as CreateTeamRequest,
    }

    handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        await createTeam(this.props.auth.getIdToken(), this.state.team)
        this.props.history.push(`/`)
    }
    
    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const team = { ...this.state.team, [event.target.name]: event.target.value }
        this.setState(() => ({ team }))
    }

    render() {
        return (
        <div>
            <h1>Create new team</h1>

            <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                    <label>Team Name: </label>
                    <input
                        type="text"
                        name='name'
                        placeholder="team name"
                        onChange={this.handleChange}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Sport: </label>
                    <input
                        type="text"
                        name='sport'
                        placeholder="sport name"
                        onChange={this.handleChange}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Season: </label>
                    <input
                        type="text"
                        name='season'
                        placeholder="season year (2019-2020)"
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Button type='submit'>Save</Button>
            </Form>
        </div>
        )
    }
}