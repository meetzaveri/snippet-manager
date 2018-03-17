var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

    // Getting the individual codesnippets
    app.get('/codes/:id', (req, res) => {
        // find id on mLab documents
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('codes').findOne(details, (err, item) => {
            if (err) {
                res.send({'error' : 'An error occured after get request'});
            } else {
                res.send(item);
            }
        })
    });

    app.get('/codes',(req, res) => {
        
        db.collection('codes').find({}).toArray((err,doc) => {
            if(err){
                console.log(err);
            }
            else {
                console.log('Doc', doc);
                res.send(doc)
            }
        })
    })

    // Creating the codesnippet
    app.post('/codes', (req, res) => {
        // write parameters or json of the request here
        // create your codes here
        const code= { name: req.body.name, content: req.body.content};
        db.collection('codes').insert(code, (err,result) => {
            if (err){
                console.log('Error in if ');
                res.send({'error' : 'An error has occured'});
            } else {
                res.send(result.ops[0]);
            }
        });
        console.log('req.body ', req.body);
    });

    // Updating the codes
    app.put('/codes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const code = { name: req.body.name, content: req.body.content};
        db.collection('codes').update(details, code, (err, result) => {
          if (err) {
              res.send({'error':'An error has occurred'});
          } else {
              res.send(note);
          } 
        });
    });
    
    // Deleting the codes
    app.delete('/codes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('codes').remove(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send('Note ' + id + ' deleted!');
          } 
        });
    });
};