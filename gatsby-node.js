const path = require('path')
const _ = require('lodash')
const { createWiki } = require('./createWiki')

const createPosts = (createPage, createRedirect, edges) => {
  edges.forEach(({ node }, i) => {
    const prev = i === 0 ? null : edges[i - 1].node
    const next = i === edges.length - 1 ? null : edges[i + 1].node
    const pagePath = node.fields.slug
    console.log(pagePath)
    if (node.fields.redirects) {
      node.fields.redirects.forEach(fromPath => {
        createRedirect({
          fromPath,
          toPath: pagePath,
          redirectInBrowser: true,
          isPermanent: true,
        })
      })
    }

    createPage({
      path: pagePath,
      component: path.resolve(`./src/templates/post.js`),
      context: {
        id: node.id,
        prev,
        next,
      },
    })
  })
}

exports.createPages = ({ actions, graphql }) =>
  graphql(`
    query {
      allMdx(
        filter: { frontmatter: { published: { ne: false } } }
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            id
            body
            excerpt(pruneLength: 250)
            parent {
              ... on File {
                relativePath
                name
                sourceInstanceName
                base
                relativePath
              }
            }
            fields {
              title
              slug
              date
            }
          }
        }
      }
    }
  `).then(({ data, errors }) => {
    if (errors) {
      return Promise.reject(errors)
    }

    if (_.isEmpty(data.allMdx)) {
      return Promise.reject('There are no posts!')
    }

    const { edges } = data.allMdx
    const { createRedirect, createPage } = actions
    const wikiNodes = edges.filter(
      ({ node }) => node.parent.sourceInstanceName === 'wiki'
    )
    createWiki(createPage, { wikiNodes })
    const blogPosts = edges.filter(
      ({ node }) => node.parent.sourceInstanceName === 'blog'
    )
    createPosts(createPage, createRedirect, blogPosts)
    createPage({
      path: '/blog',
      component: path.resolve(`src/templates/blog.js`),
    })
  })

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        $components: path.resolve(__dirname, 'src/components'),
      },
    },
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent)
    const titleSlugged = _.join(_.drop(parent.name.split('-'), 3), '-')

    const slug =
      parent.sourceInstanceName === 'legacy'
        ? `blog/${node.frontmatter.date
            .split('T')[0]
            .replace(/-/g, '/')}/${titleSlugged}`
        : node.frontmatter.slug || titleSlugged

    createNodeField({
      name: 'id',
      node,
      value: node.id,
    })

    createNodeField({
      name: 'published',
      node,
      value: node.frontmatter.published,
    })

    createNodeField({
      name: 'title',
      node,
      value: node.frontmatter.title,
    })

    createNodeField({
      name: 'description',
      node,
      value: node.frontmatter.description,
    })

    createNodeField({
      name: 'slug',
      node,
      value: slug,
    })

    createNodeField({
      name: 'date',
      node,
      value: node.frontmatter.date ? node.frontmatter.date.split(' ')[0] : '',
    })

    createNodeField({
      name: 'banner',
      node,
      value: node.frontmatter.banner,
    })

    createNodeField({
      name: 'categories',
      node,
      value: node.frontmatter.categories || [],
    })

    createNodeField({
      name: 'keywords',
      node,
      value: node.frontmatter.keywords || [],
    })

    createNodeField({
      name: 'author',
      node,
      value: node.frontmatter.author || 'Ian Jones',
    })

    createNodeField({
      name: 'bannerCredit',
      node,
      value: node.frontmatter.bannerCredit,
    })

    createNodeField({
      name: 'editLink',
      node,
      value: `https://github.com/theianjones/blog/edit/master${node.fileAbsolutePath.replace(
        __dirname,
        ''
      )}`,
    })

    createNodeField({
      name: 'redirects',
      node,
      value: node.frontmatter.redirects,
    })
  }
}
