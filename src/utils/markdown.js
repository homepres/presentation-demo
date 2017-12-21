import MarkdownIt from 'markdown-it'

const markdown = new MarkdownIt()
const render = markdown.render.bind(markdown)

export { markdown as default, render }
