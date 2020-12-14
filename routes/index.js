const { Router }= require('express');
const router = Router();
const fs = require('fs');
//const uuid = require('uuid/v4');
const { v4: uuidv4 } = require('uuid');
const json_notes=fs.readFileSync('./db/db.json','utf-8');
let notes=JSON.parse(json_notes);




router.get('/', (req, res)=>{
  res.render('index.ejs');
})

router.get('/notes', (req, res)=>{
    let aux_title="";
    let aux_text="";
    res.render('notes.ejs',{
        notes, aux_title, aux_text
    });
  })

router.post('/notes', (req, res)=>{
    const {title, text}=req.body;
    let new_note = {
        id:uuidv4(),
        title,
        text
    }
    let aux_title="abc";
    let aux_text="def";
    notes.push(new_note);
    const json_notes=JSON.stringify(notes);
    fs.writeFileSync('./db/db.json',json_notes,'utf-8');
    res.render('notes.ejs',{
        notes, aux_title, aux_text
    });
    //console.log(req.body);
    //res.send(notes);
  })  

router.get('/delete/:id', (req,res)=>{
    notes = notes.filter(note=> note.id!=req.params.id);
    const json_notes=JSON.stringify(notes);
    fs.writeFileSync('./db/db.json',json_notes,'utf-8');
    let aux_title="";
    let aux_text="";
    res.render('notes.ejs',{
        notes,  aux_title, aux_text
    });
    //res.send(req.params);
})

router.get('/edit/:id', (req,res)=>{
    //buscar en el vector notes para mostrar los datos 
    let aux_title="sss";
    let aux_text="wwww";
    res.render('notes.ejs',{
        notes,  aux_title, aux_text
    });
    //res.send(req.params);
})

module.exports = router;