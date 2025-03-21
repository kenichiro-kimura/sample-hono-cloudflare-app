import { Hono } from 'hono'
import { renderer } from './renderer'

type SecretBindings = {
  LINE_CHANNEL_ACCESS_TOKEN: string;
};

const app = new Hono<{ Bindings: SecretBindings }>();

app.use(renderer)

app.get('/', (c) => {
  const LINE_CHANNEL_ACCESS_TOKEN = c.env.LINE_CHANNEL_ACCESS_TOKEN;
  return c.render(<h1>Hello!{LINE_CHANNEL_ACCESS_TOKEN}</h1>)
})

class User {
  constructor(public name: string) {}
}

app.post('/notify', async (c) => {
  const body = await c.req.json<User>();
  return c.render(body.name)
})

export default app
