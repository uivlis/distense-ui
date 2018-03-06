import React from 'react'
import { shallow } from 'enzyme'
import { DefaultLayout, Routes } from '../src/routes'

import { Route } from 'react-router'

//  Pages
import Home from '../src/features/Home'
import AddTask from '../src/features/task-add/AddTask'
import Tasks from '../src/features/tasks/Tasks'
import Task from '../src/features/task/Task'
import AddPullRequest from '../src/features/pullRequests-add/AddPullRequest'
import PullRequests from '../src/features/pullRequests/PullRequests'
import Parameters from '../src/features/parameters/Parameters'
import PullRequest from '../src/features/pullRequest/PullRequest'
import FAQ from '../src/features/FAQ'
import Faucet from '../src/features/faucet/Faucet'
import ExchangeContainer from '../src/features/exchange/ExchangeContainer'
import GetStarted from '../src/features/GetStarted'
import HowItWorks from '../src/features/HowItWorks'
import Events from '../src/features/events/Events'
import FrontendEngineer from '../src/features/jobs/FrontendEngineer'
import SolidityEngineer from '../src/features/jobs/SolidityEngineer'

describe('Routes', () => {
  const wrapper = shallow(<Routes />)
  it('renders / as Home', () => {
    const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
      const routeProps = route.props()
      pathMap[routeProps.path] = routeProps.component
      return pathMap
    }, {})
    expect(pathMap['/']).toBe(Home)
  })

  it('renders correct DefaultLayout routes', () => {
    const pathMap = wrapper.find(DefaultLayout).reduce((pathMap, route) => {
      const routeProps = route.props()
      pathMap[routeProps.path] = routeProps.component
      return pathMap
    }, {})

    expect(pathMap['/tasks']).toBe(Tasks)
    expect(pathMap['/tasks/:title/:id']).toBe(Task)
    expect(pathMap['/tasks/add']).toBe(AddTask)
    expect(pathMap['/tasks']).toBe(Tasks)

    expect(pathMap['/pullrequests/add/:id?']).toBe(AddPullRequest)
    expect(pathMap['/pullrequests/add/:id']).toBe(undefined)
    expect(pathMap['/pullrequests']).toBe(PullRequests)
    expect(pathMap['/pullrequests/:id']).toBe(PullRequest)

    expect(pathMap['/howitworks']).toBe(HowItWorks)
    expect(pathMap['/events']).toBe(Events)
    expect(pathMap['/exchange']).toBe(ExchangeContainer)
    expect(pathMap['/FAQ']).toBe(FAQ)
    expect(pathMap['/faq']).toBe(FAQ)
    expect(pathMap['/ropsten/faucet']).toBe(Faucet)
    expect(pathMap['/getstarted']).toBe(GetStarted)
    expect(pathMap['/parameters']).toBe(Parameters)

    expect(pathMap['/jobs/engineer/frontend']).toBe(FrontendEngineer)
    expect(pathMap['/jobs/engineer/solidity']).toBe(SolidityEngineer)

    //  TODO change pathMap code above to handle 404
    expect(pathMap['/pwned']).toBe(undefined)
    expect(pathMap['/nonexistent/:id']).toBe(undefined)
    expect(pathMap['/tasks/:id']).toBe(undefined)
    expect(pathMap['/pullRequest/:id']).toBe(undefined)
  })
})
