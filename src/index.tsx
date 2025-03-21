import { Hono } from 'hono'
import { renderer } from './renderer'

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use(renderer)

app.get('/', (c) => {
  return c.render(<h1>Hello!</h1>)
})

class User {
  constructor(public name: string) {}
}

app.post('/notify', async (c) => {
  const body = await c.req.json<User>();
  return c.render(body.name)
})

export default app
