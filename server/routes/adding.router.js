const express = require('express');
const pool = require('../modules/pool');
const router = express.Router(); 

/**
 * GET route template
 */
router.get('/', (req, res) => {
  const queryString =`SELECT * FROM INVENTORY JOIN category ON category.id = category_id JOIN location ON location.id = location_id JOIN status ON status.id = status_id JOIN packaging ON packaging.id = packaging_id JOIN user ON user_id = user_id;`;
  pool.query(queryString).then((results)=>{
    res.send (results.rows);
  }).catch ((err)=>{
    console.log (err);
    res.sendStatus(500);
  });
});

/**
 * POST route template
 */ // POST route code here
router.post('/', (req, res) => {
  const queryString = `INSERT INTO "inventory" (item, category_id, location_id, status_id, packaging_id, notes, reorder, donated) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
  values = [req.body.item, req.body.category_id, req.body.location_id, req.body.status_id, req.body.package_id, req.body.notes, req.body.reorder, req.body.donated]
pool.query (queryString.values).then ((results)=>{
  res.sendStatus (200); 
}).catch((err)=>{
  console.log (err);
  res.sendStatus(500);
});
});

router.put('/', (req,res)=> {
  const queryString = `UPDATE "inventory" SET item WHERE id=$2;`; 
  const values = [req.query.item, req.query.id]; 
  pool.query( queryString, values).then((results)=>{
    res.sendStatus(200); 
  }).catch((err)=>{
    console.log (err);
    res.sendStatus(500);
  });
});

router.delete ('/:id', (req,res)=>{
  const queryString = 'DELETE FROM inventory WHERE id=$1';
  values = [req.params.id];
  pool.query(queryString.value).then(( results)=>{
    res.sendStatus(200); 
  }).catch ((err)=>{
    console.log(err);
   res.sendStatus(500); 
  });
});


module.exports = router;