const pg = require('pg');

const client = new pg.Client({
  user:'postgres',
  host: 'localhost',
  database: 'authdemo',
  port: 5432
});

let connected = false;
const clientConnected = (err) => {
  if (err) {
    console.error("Error");
    console.error(err);
  } else {
    connected = true;
  }
};

const resolvers = {
  Query: {
    async getUser (root, args, ctx, info) {
      if (!connected) {
        await client.connect(clientConnected);
      }
      const resp = await client.query(`select * from "user" where id = ${ctx.session_id}`);
      return resp.rows[0];
    },
    async getTask (root, args, ctx, info) {
      if (!connected) {
        await client.connect(clientConnected);
      }
      const resp = await client.query(`
        select t.* from task as t
        join project on t.project_id = project.id
        where t.id = ${args.id} and
        project.user_id = '${ctx.session_id}'
      `);
      return resp.rows[0];
    }
  },
  User: {
    async projects (user, args, ctx, info) {
      const resp = await client.query(`
         select p.* from project as p
         join "user" on "user".id = p.user_id
         where user_id = ${user.id} and
         p.user_id = ${ctx.session_id}
      `);
      return resp.rows;
    }
  },
  Task: {
    // returns all fields of project, but authorizing only project belonging to the given user's
    // session id
    async project(task, args, ctx, info) {
      const resp = await client.query(`
        select p.* from project as p
        join task on task.project_id = p.id
        where task.id = ${task.id} and
        p.user_id = '${ctx.session_id}'
        `);
      return resp.rows[0];
    }
  },
  Project: {
    async tasks(project, args, ctx, info) {
      const resp = await client.query(`
        select t.* from task as t
        join project on t.project_id = project.id
        where project_id = ${project.id} and
        project.user_id = ${ctx.session_id}
      `);
      return resp.rows;
    }
  }
};

module.exports = resolvers;
