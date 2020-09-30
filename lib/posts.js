import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  //postsの下のファイル名を取得
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // IDを取得するには、ファイル名から「.md」を削除
    const id = fileName.replace(/\.md$/, '')

    // マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // gray-matter使用して投稿メタデータセクションを解析
    const matterResult = matter(fileContents)

    // データをIDと組み合わせる
    return {
      id,
      ...matterResult.data
    }
  })
  // 投稿を日付で並べ替える
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map(fileName => {
    return {
      params: {
        // id: fileName.replace(/\.md$/, '')
        id: ["yakiniku", "osushi"]
      }
    }
  })
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // gray-matterを使用して投稿メタデータセクションを解析する
  const matterResult = matter(fileContents)

  // remarkを使用してマークダウンをHTML文字列に変換
  const processedContent = await remark()
  .use(html)
  .process(matterResult.content)
const contentHtml = processedContent.toString()

  // データをidおよびcontentHtmlと組み合わせる
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}