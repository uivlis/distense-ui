import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

import { fetchTasks } from '../actions'
import { getAllTasks } from '../reducers/tasks'

import Head from '../components/common/Head'
import Layout from '../components/Layout'
import Tags from '../components/common/Tags'

const Task = ({ task }) => (
  <Table.Row key={task.title}>
  </Table.Row>
)

class Tasks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      column: null,
      tasks: this.props.tasks || [],
      direction: null
    }
    this.handleSort = this.handleSort.bind(this)
  }

  componentDidMount() {
    //  TODO total hack; not sure why tasks: this.props.tasks || [], above doesn't accomplish this
    setTimeout(() => {
      this.setState({
        tasks: this.props.tasks
      })
    }, 2200)
  }

  handleSort = clickedColumn => () => {
    const { column, tasks, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        tasks: _.sortBy(tasks, [clickedColumn]),
        direction: 'ascending'
      })
      return
    }

    this.setState({
      tasks: tasks.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending'
    })
  }

  componentWillMount() {
    this.props.fetchTasks()
  }

  render() {
    const { column, tasks, direction } = this.state

    return (
      <Layout>
        <Head title='Available Tasks'/>
        <Table
          selectable
          sortable
          striped
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === 'title' ? direction : null}
                onClick={this.handleSort('title')}
              >
                Title
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'Tags' ? direction : null}
                onClick={this.handleSort('tags')}
              >
                Tags
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'Reward' ? direction : null}
                onClick={this.handleSort('reward')}
              >
                Reward
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'Date' ? direction : null}
                onClick={this.handleSort('createdAt')}
              >
                Created
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tasks.length ?
              tasks.map(task => (
                <Table.Row key={task.title}>
                  <Table.Cell>
                    <Link to='/tasks/{task.title'>{task.title}</Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Tags tags={task.tags} />
                  </Table.Cell>
                  <Table.Cell>
                    {task.reward}
                  </Table.Cell>
                  <Table.Cell
                    collapsing
                    textAlign='right'>
                    {task.createdAt.toDateString()}
                    </Table.Cell>
                </Table.Row>
              )) : <Table.Cell>
                    Loading tasks...
                   </Table.Cell>
            }
          </Table.Body>
        </Table>
      </Layout>)
  }
}

const mapStateToProps = state => ({
  tasks: getAllTasks(state)
})

const mapDispatchToProps = dispatch => ({
  fetchTasks: () => dispatch(fetchTasks())
})

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)
