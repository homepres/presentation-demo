import React, { Component, Fragment } from 'react'
import Slides from './utils/slides'
import Markdown from './components/Markdown'

class App extends Component {
  state = {
    slideIdx: 0,
    slidesText: `---
super: awesome
front: matter
---
## Slide One Title
Slide Content

===

---
also: quite
cool: things
---
## Slide Two Title
Slide Content`
  }

  nextSlide = () =>
    this.setState(prevState => ({ slideIdx: prevState.slideIdx + 1 }))
  prevSlide = () =>
    this.setState(prevState => ({ slideIdx: prevState.slideIdx - 1 }))
  handleInput = event =>
    this.setState({ [event.target.name]: event.target.value })

  render () {
    const { slideIdx, slidesText } = this.state
    const slides = Slides.parseDeck(slidesText)

    return (
      <Fragment>
        <Markdown body={slides[slideIdx].body} />
        <div>
          <button disabled={slideIdx <= 0} onClick={this.prevSlide}>
            previous
          </button>
          <button
            disabled={slideIdx >= slides.length - 1}
            onClick={this.nextSlide}
          >
            next
          </button>
        </div>
        <textarea
          style={{ width: 300, height: 500 }}
          name="slidesText"
          value={slidesText}
          onChange={this.handleInput}
        />
      </Fragment>
    )
  }
}

export default App
