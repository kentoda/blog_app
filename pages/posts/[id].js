import Layout  from '../../components/layout'
import { getAllPostIds, getPostData} from '../../lib/posts'

export default function Post({ postData }) {
  return (
  <Layout>
    {postData.title}
    <br />
    {postData.id}
    <br />
    {postData.data}
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
  const postData = getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}