const express = require('express');
const { Pool } = require('pg');
const app = express();
const cors = require('cors'); // Add this line



app.use(express.json()); // for parsing application/json


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

//Birdedex GET
app.get('/birdedex', (req, res, next) => {
  pool.query(`
      with main as (
          select l.bird
              ,sighting_time
              ,row_number() over (partition by l.bird order by us.sighting_time asc) as row_num
          from log l
          left join user_sighting us on l.birdid = us.birdref
          left join user_list ul on us.listid = ul.listid
          order by l.family_rank
      ) 
      select main.bird, main.sighting_time 
      from main
      where main.row_num = 1
  `, (err, result) => {
      if (err) {
          console.error('Error executing query', err.stack);
          return next(err);
      }
      res.json(result.rows);
  });
});


  
  //UserLists GET
  app.get('/userlists', (req, res, next) => {
    pool.query(`
    select l.bird,cast(us.sighting_time as date) as sighting_time
    from log l
    join user_sighting us on l.birdid = us.birdref
    join user_list ul on us.listid = ul.listid
    order by l.family_rank
    `, (err, result) => {
      if (err) return next(err);
      res.json(result.rows);
    });
  });
  /*
  //Birdedex POST
  app.post('/add', (req, res, next) => {
    const { userid, bird, sighting_time } = req.body;
  
    pool.query(
      `INSERT INTO user_sightings (userid, bird, sighting_time) VALUES ($1, $2, $3)`,
      [userid, bird, sighting_time],
      (err, result) => {
        if (err) return next(err);
        res.status(200).json({ status: 'success', message: 'Record added' });
      }
    );
  });
  */
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });