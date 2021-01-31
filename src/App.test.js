import React from 'react'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { configure, mount, shallow} from 'enzyme'
import { expect } from 'chai'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './store/reducers/calcReducers'

const store = createStore(reducer)

configure({ adapter: new Adapter() })
const setUp = (props={}) => {
  const component = mount(<Provider store={store}><App {...props}/></Provider>)
  return component
}

describe('Calculator', () => {

  let component;
  beforeEach(() => {
    component = setUp()
  })

  it('Renders the calculator', () => {
    expect(component.find(".App")).to.have.lengthOf(1)
  })

  it('Check buttons', () => {
    expect(component.find('.btns')).to.have.lengthOf(20);
    expect(component.find('.btnSpecial')).to.have.lengthOf(6);
  })
})