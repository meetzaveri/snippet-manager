var ObjectID = require('mongodb').ObjectID;
var showdown  = require('showdown'),
    converter = new showdown.Converter();
var axios = require('axios');

showdown.setFlavor('github');

module.exports = function(app, db) {
   
    app.post('/run-code',(req,res) => {
        var data = {
        cpu_extra_time:"0.5",
        cpu_time_limit:"2",
        enable_per_process_and_thread_memory_limit:true,
        enable_per_process_and_thread_time_limit:false,
        language_id:req.body.langId,
        max_file_size:"1024",
        max_processes_and_or_threads:"30",
        memory_limit:"128000",
        number_of_run:"19",
        source_code:req.body.sourcecode,
        stack_limit:"64000",
        stdin:"",
        wall_time_limit:"5"
}
console.log('Before axios');
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios({
        baseURL: 'https://api.judge0.com',
        method: 'post',
        url: '/submissions?wait=true',
        data: data,
    })
    .then(function (response) {
        console.log('Response axios',response.data.stdout);
        res.send(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
})

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
        console.log('Request Payload',req.body);
        showdown.setFlavor('github');
        var content = req.body.content;
        var finalContent = null;
        if(req.body.fileType === 'single'){
            finalContent = converter.makeHtml(content) ;
        }
        else if(req.body.fileType === 'multiple') {
            console.log('Into multiple')
            finalContent = content.map((item) => {
                item =  converter.makeHtml(item);
                return item;
             })
        }
        else{
            res.send('Error in sending')
        }
        const code= { name: req.body.name, content: finalContent, language:req.body.language};
        db.collection('codes').insert(code, (err,result) => {
            if (err){
                console.log('Error in if ');
                res.send({'error' : 'An error has occured'});
            } else {
                res.send(result.ops[0]);
            }
        });
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