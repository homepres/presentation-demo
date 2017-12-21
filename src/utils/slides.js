import {
  flip,
  addIndex,
  assoc,
  values,
  dissoc,
  split,
  trim,
  map,
  compose
} from 'ramda'
import frontMatter from 'front-matter'

// split at every ===
const splitDeck = split(/={3,}/m)

const parseSlide = compose(
  // we dont need the raw frontmatter, discard it
  dissoc('frontmatter'),
  // parse the frontmatter
  frontMatter,
  // remove unnecessary whitespace
  trim
)

const parseDeck = compose(
  // make sure its an array of slides
  values,
  // add the slideIdx property
  addIndex(map)(flip(assoc('slideIdx'))),
  map(parseSlide),
  splitDeck
)

export default {
  parseDeck
}
