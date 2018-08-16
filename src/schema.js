import { makeExecutableSchema } from "graphql-tools"
import typeDefs from "./types.graphql"
import fs from "fs"
import path from "path"

let __dirname = path.join(__dirname + "/../data/shows")

const resolvers = {
  Query: {
    totalPodcast: () => {
      const files = fs.readdirSync(__dirname)
      return files.length
    },
    podcast: (_, args) => {
      const names = fs.readdirSync(__dirname)
      const text = fs.readFileSync(__dirname + "/" + names[args.id], "utf-8")
      let t = text.split("---")
      let p = t[1].split(": ")
      let q = t[1].split("url: ")
      return {
        id: args.id,
        name: names[args.id],
        resume: p,
        text: t[2],
        url: q[1],
      }
    },
    podcasts: () => {
      let result = []
      const files = fs.readdirSync(__dirname)
      files.forEach((x, i) => {
        const text = fs.readFileSync(__dirname + "/" + x, "utf-8")
        let t = text.split("---")
        let p = t[1].split("title: ")
        let name = p[1].split("date: ")
        let date = name[1].split("url: ")

        result.push({ name: name[0], date: date[0], id: i })
      })

      return result.reverse()
    },
  },
}
export default makeExecutableSchema({ typeDefs, resolvers })
