const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const { Pool } = require('pg');

const app = new Koa();
const router = new Router();

const pool = new Pool({
  user: 'wpuhuargucydbt',
  host: 'ec2-3-234-126-10.compute-1.amazonaws.com',
  database: 'd73l1lvoh2a6o',
  password: 'e8f85ea517fa5809ce3693691455d866fb90936294eea12d9479c6a262419477',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

// Birdedex GET
router.get('/birdedex', async (ctx, next) => {
  try {
    const result = await pool.query(`
        with main as (
          select l.birdid 
              ,l.bird
              ,sighting_time
              ,row_number() over (partition by l.bird order by us.sighting_time asc) as row_num
              ,row_number() over (order by l.family_rank,l.bird asc) as Bird_Position
          from log l
          left join user_sighting us on l.birdid = us.birdref
          left join user_list ul on us.listid = ul.listid
          order by l.family_rank
      ) 
      select row_number() over (order by main.Bird_Position asc) as birdid
      ,main.bird
      ,TO_CHAR(main.sighting_time, 'YYYY-MM-DD') as sighting_time 
      from main
      where main.row_num = 1
      order by birdid asc
    `);
    ctx.body = result.rows;
  } catch (err) {
    ctx.status = 500;
    ctx.body = err.message;
  }
});

// UserLists GET
router.get('/userlists', async (ctx, next) => {
  try {
    const result = await pool.query(`
    select 
    l.birdid
    ,l.bird
    ,TO_CHAR(us.sighting_time, 'YYYY-MM-DD') as sighting_time
      from log l
      join user_sighting us on l.birdid = us.birdref
      join user_list ul on us.listid = ul.listid
      order by l.family_rank
    `);
    ctx.body = result.rows;
  } catch (err) {
    ctx.status = 500;
    ctx.body = err.message;
  }
});

// Suggestions GET
router.get('/suggestions/:input', async (ctx, next) => {
  try {
    const { input } = ctx.params;
    const result = await pool.query(`
      SELECT l.bird FROM log l WHERE l.bird LIKE $1 LIMIT 10
    `, [`%${input}%`]);
    ctx.body = result.rows;
  } catch (err) {
    ctx.status = 500;
    ctx.body = err.message;
  }
});

// AddBird POST
router.post('/user_sighting', async (ctx, next) => {
  try {
    const { bird, sighting_time } = ctx.request.body;
    console.log('Request Body:', ctx.request.body); // Log the request body

    // Check if the bird exists in the log table
    const birdExists = await pool.query(`
      SELECT birdid FROM log WHERE bird = $1
    `, [bird]);

    if (birdExists.rowCount === 0) {
      throw new Error('Bird not found');
    }

    const birdId = birdExists.rows[0].birdid;

    let result;
    if (sighting_time) {
      result = await pool.query(`
        INSERT INTO user_sighting (birdref, sighting_time)
        VALUES ($1, $2)
      `, [birdId, sighting_time]);
    } else {
      result = await pool.query(`
        INSERT INTO user_sighting (birdref)
        VALUES ($1)
      `, [birdId]);
    }

    ctx.status = 201;
    ctx.body = 'Sighting added successfully';
  } catch (err) {
    console.error('Error:', err.message); // Log the error message
    ctx.status = 500;
    ctx.body = err.message;
  }
});

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});