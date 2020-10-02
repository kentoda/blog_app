export default (req, res) => {
  const {
    query: { pid },
  } = req

  // reqとresを受け取って、reqのpidのフィールドがurlのpidと同じになる
  res.end(`Post: ${pid}`)
}