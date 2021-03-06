/** @jsx jsx */
import React from 'react'
import { jsx, Styled, Flex } from 'theme-ui'
import { useStaticQuery, graphql } from 'gatsby'
import List from './list'

const EggheadCollections = () => {
  const { allCollectionsJson } = useStaticQuery(graphql`
    query {
      allCollectionsJson(sort: { fields: id, order: ASC }, limit: 3) {
        nodes {
          description
          duration
          http_url
          icon_url
          id
          image
          image_thumb_url
          path
          slug
          title
          type
          url
        }
      }
    }
  `)
  return (
    <>
      <Styled.h3 sx={{ color: 'primary' }}>egghead Video Lessons</Styled.h3>
      <List collections={allCollectionsJson.nodes} />
    </>
  )
}

export default EggheadCollections
