import Layout  from '../../components/layout'
import { getAllPostIds, getPostData} from '../../lib/posts'
import Head from 'next/head'

export default function Post({ postData }) {
  return (
  <Layout>
    <Head>
      <title>{postData.title}</title>
    </Head>
    <br />
    {postData.id}
    <br />
    {postData.date}
    <br />
    {/* 非推奨？ */}
    <div dangerouslySetInnerHTML={{__html: postData.contentHtml }} />
  </Layout>
  )
}

// getStaticPaths　idsファイルでどんなページを表示する可能性があるのか判断
export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

// buildする時にページのコンテンツは何なのか,そのデータはどこにあるのかをgetStaticProps を使い取得する
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}