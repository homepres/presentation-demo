import React, { Component } from 'react'

import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'

import Slides from './utils/slides'
import Markdown from './components/Markdown'

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: '0px auto',
    width: '1300px'
  },
  slideContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  editorContainer: {},
  controlsContainer: {
    padding: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  button: {
    margin: theme.spacing.unit
  }
})

const Slide = ({ children }) => (
  <div
    style={{
      width: 640,
      height: 480,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    {children}
  </div>
)

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
    const { classes } = this.props
    const { slideIdx, slidesText } = this.state
    const slides = Slides.parseDeck(slidesText)

    return (
      <Grid container className={classes.root}>
        <Grid item xs={8}>
          <Paper className={classes.controlsContainer}>
            <Grid container>
              <Grid item xs={12} className={classes.slideContainer}>
                <Slide>
                  <Markdown body={slides[slideIdx].body} />
                </Slide>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Grid container>
            <Grid item xs={12}>
              <Paper className={classes.controlsContainer}>
                <Button
                  className={classes.button}
                  raised
                  color="primary"
                  disabled={slideIdx <= 0}
                  onClick={this.prevSlide}
                >
                  Previous
                </Button>
                <Typography type="title">{slideIdx + 1}</Typography>
                <Button
                  className={classes.button}
                  raised
                  color="primary"
                  disabled={slideIdx >= slides.length - 1}
                  onClick={this.nextSlide}
                >
                  Next
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Grid container>
                  <Grid item xs={12}>
                    <TextField
                      style={{ margin: 10, width: '95%' }}
                      multiline
                      name="slidesText"
                      value={slidesText}
                      onChange={this.handleInput}
                      rows={slidesText.split(/\r\n|\r|\n/).length}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(App)
