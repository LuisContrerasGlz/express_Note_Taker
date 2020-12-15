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
    let aux_id="";
    res.render('notes.ejs',{
        notes, aux_title, aux_text, aux_id
    });
  })

router.post('/notes', (req, res)=>{
    const {title, text}=req.body;
    let new_note = {
        id:uuidv4(),
        title,
        text
    }
    let aux_title="";
    let aux_text="";
    let aux_id="";
    notes.push(new_note);
    const json_notes=JSON.stringify(notes);
    fs.writeFileSync('./db/db.json',json_notes,'utf-8');
    res.render('notes.ejs',{
        notes, aux_title, aux_text, aux_id
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
    let aux_id="";
    res.render('notes.ejs',{
        notes,  aux_title, aux_text, aux_id
    });
    //res.send(req.params);
})

router.get('/edit/:id', (req,res)=>{
    //buscar en el vector notes para mostrar los datos 
    let aux_title="";
    let aux_text="";
    let aux_id="";
    notes.forEach(function (note){
        if (note.id==req.params.id){
            aux_id=note.id;
            aux_title=note.title;
            aux_text=note.text;
        }else{
            console.log(note.id);
        }
    })
    console.log(aux_title);
    res.render('notes.ejs',{
        notes,  aux_title, aux_text, aux_id
    });
    //res.send(req.params);
})

router.post('/modify/:id', (req, res)=>{
    let aux_title="";
    let aux_text="";
    let aux_id="";
    const {title, text}=req.body;
    let mod_note = {
        id:req.params.id,
        title:title,
        text:text
    }
    console.log(mod_note);
    let cont=0;
    let enc=-1;
    notes.forEach(function (note){
        if (note.id==req.params.id){
            enc=cont;
        }else{
            console.log(note.id);
            cont=cont+1;
        }
    })
    console.log(cont);
    console.log(enc);
    if (enc!=-1){
        notes.splice(enc,1,mod_note);
        const json_notes=JSON.stringify(notes);
        fs.writeFileSync('./db/db.json',json_notes,'utf-8');
    }else{
        console.log("no lo encntre");
    }
    
    res.render('notes.ejs',{
        notes,  aux_title, aux_text, aux_id
    });
  })  



module.exports = router;