import React from 'react'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { configure, mount, shallow} from 'enzyme'
import { expect } from 'chai'
import App from './App.jsx'

configure({ adapter: new Adapter() })
const setUp = (props={}) => {
  const component = mount(<App {...props}/>)
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
  })
})