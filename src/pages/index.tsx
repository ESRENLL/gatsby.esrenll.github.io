import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { Jumbotron } from 'react-bootstrap'

const ImasDef = () => (
  <Layout>
    <SEO title="Home" />
    <Jumbotron>
      <h1>esrenll.github.io/gatsby</h1>
      <p>
        Hosted by GitHub
        <br />
        Built by{' '}
        <a
          href="https://github.com/esrenll/gatsby.esrenll.github.io"
          target="_blank"
        >
          gatsby.esrenll.github.io
        </a>
      </p>
    </Jumbotron>
  </Layout>
)

export default ImasDef
