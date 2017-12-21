import React from 'react'
import PropTypes from 'prop-types'
import { render } from '../utils/markdown'

function MarkdownComponent (props) {
  const { body, debug } = props
  const rendered = render(body)

  // eslint-disable-next-line no-console
  if (debug) console.log(rendered)

  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={{ __html: rendered }} />
}

MarkdownComponent.propTypes = {
  body: PropTypes.string.isRequired,
  debug: PropTypes.bool
}

MarkdownComponent.defaultProps = {
  debug: false
}

export default MarkdownComponent
